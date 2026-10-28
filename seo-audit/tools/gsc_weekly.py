"""Weekly Search Console report from a Performance export.

Usage:
    python seo-audit/tools/gsc_weekly.py <export.xlsx> [--config <config.json>]

Export: Search Console → Performance → Search results → (filters, e.g. Country) → Date: Last 7 days → Export → Excel.

The script contains no site data. Everything site-specific lives in an optional JSON config that you keep out of
version control:

    {
      "baseline": {"label": "28-day baseline", "days": 28, "clicks": 0, "impressions": 0, "ctr": 0.0, "position": 0.0},
      "expected_country": "Country name exactly as in the export's Filters sheet",
      "tracked": {"Label shown in the report": "regular expression matched against each query (lower case)"},
      "key_pages": ["/", "/some-category", "/products/"],
      "reminders": ["Free-text lines printed at the end of the report"]
    }

Without a config it prints totals, every query group is skipped, and all landing pages are listed.
"""
import argparse
import json
import re
import sys
import warnings

import openpyxl

warnings.filterwarnings("ignore")
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def sheet(wb, name):
    for ws in wb.worksheets:
        if ws.title.lower().startswith(name.lower()):
            return [r for r in ws.iter_rows(values_only=True) if r and r[0] is not None]
    return []


def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return 0.0


def summarise(rows):
    """Clicks, impressions, CTR and impression-weighted average position for rows of (key, clicks, impr, ctr, pos)."""
    clicks = sum(num(r[1]) for r in rows)
    impressions = sum(num(r[2]) for r in rows)
    position = sum(num(r[2]) * num(r[4]) for r in rows) / impressions if impressions else 0.0
    return clicks, impressions, (clicks / impressions if impressions else 0.0), position


def page_path(url):
    """https://www.example.com/a/b → /a/b, so www and non-www rows line up."""
    return re.sub(r"^https?://[^/]+", "", str(url)) or "/"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("export", help="Search Console Performance export (.xlsx)")
    parser.add_argument("--config", help="Private JSON config with baseline, tracked query groups and key pages")
    args = parser.parse_args()

    config = {}
    if args.config:
        with open(args.config, encoding="utf-8") as fh:
            config = json.load(fh)

    wb = openpyxl.load_workbook(args.export, read_only=True, data_only=True)
    filters = {r[0]: r[1] for r in sheet(wb, "Filters")[1:]}
    print(f"Filters: {filters}")
    expected = config.get("expected_country")
    if expected and expected not in str(filters.get("Country", "")):
        print(f"WARNING: this export is not filtered to {expected}. Re-export with that country filter.")

    chart = sheet(wb, "Chart")[1:]
    clicks, impressions, ctr, position = summarise(chart)
    print(f"\nTOTALS ({len(chart)} days: {chart[0][0] if chart else '?'} to {chart[-1][0] if chart else '?'})")
    print(f"  clicks {clicks:.0f} | impressions {impressions:.0f} | CTR {ctr * 100:.1f}% | avg position {position:.1f}")
    base = config.get("baseline")
    if base and chart:
        scale = base.get("days", 28) / len(chart)
        print(
            f"  scaled to {base.get('days', 28)} days: clicks {clicks * scale:.0f} vs {base['clicks']} | "
            f"impressions {impressions * scale:.0f} vs {base['impressions']} | CTR {ctr * 100:.1f}% vs "
            f"{base['ctr'] * 100:.1f}% | position {position:.1f} vs {base['position']}  ({base.get('label', 'baseline')})"
        )

    tracked = config.get("tracked", {})
    if tracked:
        queries = sheet(wb, "Queries")[1:]
        print("\nTRACKED QUERY GROUPS (clicks / impressions / CTR / position; top query in each group)")
        for label, pattern in tracked.items():
            matched = [r for r in queries if re.search(pattern, str(r[0]).lower())]
            c, i, rate, pos = summarise(matched)
            top = max(matched, key=lambda r: num(r[2]))[0] if matched else "-"
            print(f"  {label:32} {c:4.0f} {i:6.0f} {rate * 100:5.1f}% {pos:6.1f}   top: {top}")

    pages = sheet(wb, "Pages")[1:]
    print("\nLANDING PAGES")
    hosts = {re.match(r"^https?://[^/]+", str(r[0])).group(0) for r in pages if re.match(r"^https?://[^/]+", str(r[0]))}
    # The site's real address is the host that earns the clicks; old hosts can still collect impressions.
    main_host = max(
        hosts,
        key=lambda h: (sum(num(r[1]) for r in pages if str(r[0]).startswith(h)), sum(num(r[2]) for r in pages if str(r[0]).startswith(h))),
        default="",
    )
    for r in sorted(pages, key=lambda r: -num(r[2])):
        flag = "" if str(r[0]).startswith(main_host) else f"   <- different host: {re.match(r'^https?://[^/]+', str(r[0])).group(0)}"
        print(f"  {page_path(r[0]):45} clicks {num(r[1]):4.0f} impr {num(r[2]):5.0f} CTR {num(r[3]) * 100:5.1f}% pos {num(r[4]):5.1f}{flag}")
    seen = {page_path(r[0]) for r in pages}
    missing = [
        k for k in config.get("key_pages", [])
        if not any(s == k or (k.endswith("/") and k != "/" and s.startswith(k)) for s in seen)
    ]
    if missing:
        print(f"  Key pages with no impressions in this period: {', '.join(missing)}")

    for line in config.get("reminders", []):
        print(f"\n{line}")


if __name__ == "__main__":
    main()

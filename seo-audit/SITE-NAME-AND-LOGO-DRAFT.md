# "IKEA Used Furniture" as the Google site name and logo: draft and blockers

Prepared 22 Oct 2026. **Nothing in this document is live.** The draft lives only on the local branch `draft/site-name-ikea-used-furniture` and in `seo-audit/drafts/`.

> Not legal advice. The trademark analysis is in [REBRAND-RISK-AND-MIGRATION.md](REBRAND-RISK-AND-MIGRATION.md).

## 1. Short answer

| Question | Answer |
|---|---|
| Can we *technically* ask Google to show "IKEA Used Furniture"? | Yes. It takes WebSite structured data on the homepage plus a matching title, `og:site_name` and visible branding. That's all prepared on the draft branch |
| Will Google show it? | **Unlikely, and it can't be guaranteed.** Google describes the markup as a *preference*. It says a generic name "is unlikely to be selected", and that the name must not be misleading. "IKEA used furniture" is a description of the product and also the search query itself, and it suggests a link to IKEA. Google may show "SecondLife", your domain, or its own pick instead. Google can't change an automatically chosen site name by hand |
| Is it legally safe to publish now? | **No.** IKEA's terms require prior written permission to use the IKEA name, and UAE trademark law protects well-known marks (evidence in the rebrand document) |
| Would a more distinctive name be needed? | **Yes, for both reasons.** Even with IKEA's permission, a distinctive brand with a descriptor (e.g. "SecondLife · Used IKEA Furniture UAE") has a much better chance of being chosen as the site name than a generic phrase. Your rankings for IKEA searches come from page content, which is already IKEA-focused, not from the site name |

## 2. What Google uses (Search Central, site names)

From [developers.google.com/search/docs/appearance/site-names](https://developers.google.com/search/docs/appearance/site-names):

- **`WebSite` structured data on the home page** (`name`, `url`, optional `alternateName`) is the strongest signal. It must be the domain root: `https://www.ikeiausedfurniture.ae/`.
- Google also reads **`og:site_name`, the `<title>`, headings and other home-page text**. These should all use the same name.
- **The name should be unique, accurate, not misleading, and not generic.** If your preferred name isn't picked, Google suggests `alternateName`, then the lowercase domain as the last alternate, and as a last resort the domain as the `name`.
- Selection is automatic and also uses how other sites refer to you. **There are no manual changes and no guarantees.**

## 3. What the draft branch changes

Branch `draft/site-name-ikea-used-furniture`, commit `be16a5e`, built on top of the safe SEO branch:

| Signal | Safe branch (now) | Draft branch |
|---|---|---|
| `WebSite.name` | SecondLife | **IKEA Used Furniture** |
| `WebSite.alternateName` | `ikeiausedfurniture.ae` | `SecondLife`, `ikeiausedfurniture.ae` |
| `og:site_name` (all pages) | SecondLife | IKEA Used Furniture |
| Title suffix (all pages) | `… \| SecondLife` | `… \| IKEA Used Furniture` |
| Header/footer logo | SecondLife logo | Draft A logo (below) |
| Logo alt / aria-label | SecondLife | IKEA Used Furniture |
| `Organization.name`, copyright line | SecondLife | **SecondLife (unchanged: the legal business name)** |

Mechanically, `siteConfig.displayName` (the public name) is separated from `siteConfig.name` (the legal name) in `src/config/site.ts`. If you later get a cleared name, this is a one-line change.

## 4. Logo drafts

**22 Oct 2026: the owner chose draft A as the design.** It is still unpublished and stays on the draft branch until the name has trademark clearance (§5).

Open [drafts/preview.html](drafts/preview.html) in a browser to see both drafts at full size and at header size.

| Draft | File | Use |
|---|---|---|
| **A: "IKEA Used Furniture"** (as requested) | [drafts/logo-draft-A-ikea-used-furniture.svg](drafts/logo-draft-A-ikea-used-furniture.svg) | **Pending clearance. Don't publish.** Keeps your house-and-lamp symbol and brown colour. "IKEA" is set in the same rounded lettering and weight as the other words, with "Independent reseller · UAE / Not affiliated with IKEA" underneath |
| **B: SecondLife + descriptor** | [drafts/logo-draft-B-secondlife-descriptor.svg](drafts/logo-draft-B-secondlife-descriptor.svg) | Fits option B and could be used now: SECONDLIFE wordmark with "Used IKEA Furniture · UAE / Independent · not affiliated with IKEA" |

Design rules both drafts follow:
- No IKEA logo, no blue-and-yellow colour scheme, no IKEA typeface, and no oval or box shape around the wordmark.
- The existing symbol and brown palette are kept, so the site's look and navigation don't change.
- Fonts are system stand-ins. A designer should finalise the lettering as outlines before any use.

At 56 px header height the small lines are unreadable. If the name is approved, also make a horizontal version for the header.

## 5. What it would take to use "IKEA Used Furniture" publicly

1. **Written permission from the trademark owner** (Inter IKEA Systems B.V.) for the specific name, ideally also confirmed with IKEA's UAE operator. A draft request letter is in the rebrand document, §4A.
2. **A UAE IP lawyer's written opinion** covering the name, the logo and the domain `ikeiausedfurniture.ae`.
3. **Trade licence consistency.** The public name must match what your licensing authority (DED or free zone) has registered. Ask them whether a trade name that contains a registered mark needs the owner's consent; expect that it may.
4. **Platform rules.** Google Business Profile requires the business's real-world name; WhatsApp Business display names must follow Meta's naming rules, which exclude names that infringe others' rights. If your licence says SecondLife, these profiles must say SecondLife.
5. **Only then**, deploy the draft branch: merge it, replace the draft logo with the designer's final files, run the Rich Results Test on `/`, and request indexing of `/` in Search Console.

Without step 1 the realistic outcome is "risk without reward": a possible legal dispute, and a site name Google probably won't show anyway.

## 6. Recommended instead (works today, no clearance needed)

- Keep `WebSite.name = "SecondLife"` with `alternateName: ["ikeiausedfurniture.ae"]` (done on the safe branch).
- Make the descriptor visible next to the brand: logo draft B, plus the tagline "Used IKEA Furniture in the UAE" (done).
- Titles already lead with "Used IKEA …" and end with "| SecondLife". Searchers see IKEA first, and Google sees a distinctive brand.
- If you want a new public name, pick a distinctive one without IKEA (candidates in the rebrand document, §4C) and use the same `displayName` switch.

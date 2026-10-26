# UAE SEO growth: audit, changes and plan

26 Oct 2026. Branch `seo/uae-growth-improvements` (local, commit `fe74a5c`), based on **production** `origin/main` = `9e0b5f5` (PR #1, deployed 24 Oct).

Status labels: ✅ completed and validated · 🟡 implemented locally, unpublished · 🔵 needs owner confirmation · 🟣 needs access to external tools · ⚪ longer-term work.

## 0. Where things stand

| Item | Status |
|---|---|
| All SEO work from `seo/ikea-quick-wins`, `seo/used-ikea-conversion-improvements` and `seo/google-search-appearance` | ✅ **Live in production** since 24 Oct (Vercel production `9e0b5f5`) |
| Homepage title and H1 "IKEA Used Furniture" | ✅ Live (checked today) |
| Rebrand to "IKEA Used Furniture" (store name, logo, site name) | 🔵 Local only (`branding/ikea-used-furniture`), pending trademark clearance. Based on the pre-merge branch, so rebase it onto `seo/uae-growth-improvements` before using it |
| Improvements in this report | 🟡 `seo/uae-growth-improvements`, not pushed |
| Google's index | 🟣 **Still shows the old titles** ("SecondLife \| Pre-Owned Furniture UAE", checked today), so Google hasn't recrawled since the 24 Oct deployment |

## 1. Technical SEO audit (live production, 26 Oct)

Method: every sitemap URL fetched as Googlebot, plus Lighthouse 13.5.0 (local Chrome, mobile) on `/`, `/beds` and `/products/ikea-friheten-sofa-bed`. PageSpeed Insights wasn't available (its shared API quota was exhausted), and there's no CrUX field data yet (new site).

| # | Check | Result | Severity | Fix | Status |
|---|---|---|---|---|---|
| T1 | 7 catalog pages (`/shop`, `/beds`, `/daybeds`, `/sofa-beds`, `/storage-beds`, `/ikea-brimnes`, `/ikea-hemnes`) | Rendered on every request: `Cache-Control: private, no-cache, no-store`, `X-Vercel-Cache: MISS`, 0.9–3.3 s from this location. Lighthouse: back/forward cache blocked by `no-store`. **Root cause (verified):** the pages read `searchParams` on the server, which forces dynamic rendering | High (money pages) | Prerender them. Shared filter links (`?size=…`) are now applied in the browser; the static HTML still lists every product | 🟡 Build shows all 7 as Static; local response `s-maxage=31536000` |
| T2 | Heading order on catalog pages | Product cards `<h3>` directly under `<h1>` (Lighthouse accessibility 98) | Low | `<h2>` "Available items" (screen-reader only) before the grid | 🟡 Local Lighthouse accessibility 100 |
| T3 | LCP image priority | Lighthouse: "fetchpriority=high should be applied". The header logo was fetched at **High** priority and competed with the hero | Low–medium | `loading="eager"` + `fetchPriority="high"` instead of `preload` (Next 16 docs) | 🟡 Local: priority hinted ✓, logo now Low |
| T4 | Placeholder `hello@example.com` | Live in footer, Contact page and "Send by email" | Medium (trust) | Email links and button hidden while `email` is empty. No address invented | 🟡 / 🔵 real address needed |
| T5 | Crawl and index basics | 23/23 URLs return 200, self-referencing canonical, no `noindex`, robots allows everything, sitemap has 23 URLs plus 45 images, JSON-LD valid, 0 broken internal links, no orphan pages | — | — | ✅ |
| T6 | Core Web Vitals (lab) | Live: performance 98–99, LCP 2.2–2.3 s, CLS 0, TBT 10 ms; SEO 100; best practices 100 | — | — | ✅ (field data later) |
| T7 | Product structured data | Valid Schema.org, but **no `offers`** (no prices), so no Google product rich results or merchant listings | High (commercial) | Needs real prices | 🔵 |
| T8 | Product variant URLs | `?color=&size=` canonicalise to the base product ✓ | — | — | ✅ |
| T9 | Inbound links | FRIHETEN 6, ottoman bed 3, `/ikea-hemnes` and `/ikea-brimnes` 6 each (all others 7–22) | Low | Fine for 23 pages; add more as content grows | ⚪ |
| T10 | Thin or doubtful products | Ottoman bed: 0 photos, brand unverified. HEMNES bed: sold out, 0 photos | Medium | Owner data | 🔵 |
| T11 | Unused / legacy JavaScript | ~22–29 KiB unused, 14 KiB legacy (framework code) | Low | Not worth risk now | ⚪ |

## 2–3. UAE keyword priorities and keyword-to-URL map

Sources: the 3,381-keyword database (`used-ikea-keyword-master.xlsx`, 721 targetable), plus Google results checked today (`hl=en`, `gl=ae`, your browser). **No search volumes**: Keyword Planner, Ahrefs or Semrush aren't connected 🟣.

**Broad keywords checked today:**

| Keyword | Who ranks (observed) | Intent | Realistic role |
|---|---|---|---|
| IKEA used furniture | dubizzle, Facebook groups, wisemove, yahyausedfurniture, ikea.com; map pack: your brother's profile, "Ikea used Furniture store", "Ikea 2nd hand furniture hub" | Used purchase | **Homepage primary** (title/H1 already exact) |
| IKEA sofa bed | ikea.com (×6), dubizzle IKEA sofas, Facebook | Mostly new / official | `/sofa-beds` secondary; win the **used** variants |
| IKEA bed | ikea.com, Amazon, Pinterest, YouTube | New / official | `/beds` secondary only |
| IKEA furniture | ikea.com, review sites; map pack: IKEA's own stores | Official IKEA | Not a realistic target. Don't chase |
| IKEA used bed | Facebook group, dubizzle (Sharjah, Abu Dhabi, UAQ), ikea.com | Used purchase | `/beds` primary |

**Map (unchanged URLs):**

| Page | Primary | Secondary (examples from the database) |
|---|---|---|
| `/` | IKEA Used Furniture | used ikea furniture dubai / uae, second hand ikea furniture dubai, buy used ikea furniture uae, ikea used furniture near me |
| `/beds` | used IKEA beds / IKEA used bed | ikea bed with mattress used dubai, used ikea bed dubai / sharjah / ajman / abu dhabi, used ikea king / queen / single bed, *ikea bed* (secondary) |
| `/sofa-beds` | used IKEA sofa bed | ikea sofa bed used dubai, ikea sofa cum bed used dubai, second hand ikea sofa bed uae, *ikea sofa bed* (secondary) |
| `/daybeds` | used IKEA daybed | used ikea daybed dubai (price / for sale), ikea daybed second hand |
| `/products/ikea-malm-bed` | used IKEA MALM bed | used ikea malm bed dubai (price / for sale), ikea malm queen / single bed used |
| `/products/ikea-friheten-sofa-bed` | IKEA FRIHETEN sofa bed used | used ikea friheten sofa cum bed, second hand friheten, ikea friheten corner sofa bed used |
| `/products/ikea-hemnes-daybed`, `/products/ikea-brimnes-daybed` | used IKEA HEMNES / BRIMNES daybed | … second hand, … price |
| `/products/ikea-brimnes-bed`, `/ikea-brimnes`, `/ikea-hemnes` | used IKEA BRIMNES / HEMNES | range + used |
| `/storage-beds` | used storage / ottoman bed | used hydraulic bed dubai |
| `/delivery-areas` | used IKEA furniture Sharjah / Ajman / Abu Dhabi | … with delivery dubai, … price |
| Guides | supporting research | IKEA bed sizes, MALM vs BRIMNES vs HEMNES, daybed vs sofa bed, where to buy used IKEA |

The full map is in `KEYWORD-PAGE-MAP.md` and the *Keyword-to-page mapping* sheet.

**Visibility note:** the four bed and daybed queries where the site appeared at ~#6–10 on 23 Oct didn't show it in today's results. One observation isn't a trend; only Search Console data can show actual positions 🟣.

## 4. Competitor gaps (observed)

| Gap | Evidence | Action |
|---|---|---|
| Prices | dubizzle, ReadyMySpace and Yahya show AED prices; "price" and "cheap" appear in related searches for nearly every query | 🔵 Add real prices (biggest single commercial and rich-result unlock) |
| Volume of listings | dubizzle and Facebook groups show many fresh items | ⚪ Add real stock regularly; each item is new indexable content |
| Trust | Your 4.9★ map-pack profile belongs to your brother's business, not this site | ⚪ Build this site's own reviews (with your own profile if eligible) |
| Mentions and links | wisemove.ae "best places to buy second-hand furniture" lists Facebook groups only | ⚪ Polite outreach (needs your approval to send) |

## 5–6. Changes in this branch (🟡) and before/after

**21 files changed:**
- **Catalog pages (static rendering):** `CatalogPage.tsx`, `CatalogView.tsx`, and the 7 catalog page files (`shop`, `beds`, `daybeds`, `sofa-beds`, `storage-beds`, `ikea-brimnes`, `ikea-hemnes`).
- **Image priority:** `SmartImage.tsx`.
- **Placeholder email:** `config/site.ts`, `Footer.tsx`, `contact/page.tsx`, `ContactForm.tsx`.
- **Click tracking:** new `lib/analytics.ts` and `components/analytics/ContactClickTracker.tsx`; tracker mounted in `layout.tsx`; `data-cta` labels in `Hero.tsx`, `ProductDetail.tsx` and `WhatsAppFloatingButton.tsx`.
- **Homepage:** "How to order on WhatsApp" three-step section (`page.tsx`).

**Metadata:** titles, descriptions, H1s and canonicals are **unchanged** on all 23 pages. This round fixed rendering, speed, trust and measurement instead of rewording metadata.

| Before (production) | After (branch) |
|---|---|
| 7 catalog pages dynamic, `no-store`, MISS | Static, `s-maxage=31536000`, back/forward cache allowed |
| `/beds` Lighthouse accessibility 98 | 100 |
| LCP image not priority-hinted; logo High priority | Hero/first product `fetchpriority=high`; logo Low |
| `hello@example.com` visible (3 places) | Hidden until a real address is set |
| No conversion measurement | `whatsapp_click`, `phone_click`, `email_click` events ready |
| Buying process only in FAQ | Three steps on the homepage |

## 7–8. Homepage, product and category notes

- **Homepage:** exact title/H1 "IKEA Used Furniture" ✅. Intro says "Genuine used IKEA beds with mattress, daybeds and sofa cum beds…" ✅. Now adds the order steps 🟡. Featured products, category cards, FAQ and guide links are already in place ✅.
- **Categories:** each has a unique cluster, an H1, a size or range section, FAQs and related links ✅.
- **Products:** "Used" H1s, variant photos with descriptive alt text, colour/size variants, condition line, availability badges, WhatsApp message with the exact item ✅.
- **Gaps that need you** 🔵: prices, measured dimensions, per-item condition notes (`variantDescription`), photos for the ottoman bed and HEMNES bed.

## 9. Search Console 🟣

There's no access or export, so there are no query, position, CTR or indexing findings. Please provide **Performance** (Queries + Pages, last 3 months, compare the last 28 days) and **Indexing → Pages** (including "Crawled / Discovered – currently not indexed"). Don't treat `site:` counts as indexing data.

## 10. Local SEO

- One `/delivery-areas` page covers Dubai, Sharjah, Ajman, Abu Dhabi and the other emirates, with no delivery promises ✅. No city doorway pages.
- Once you confirm real delivery areas, fees and lead times 🔵, add them there and in Organization `areaServed`.
- Your brother's Business Profile is **not** linked or changed ✅. A Profile for *this* business needs eligibility: a real staffed location or service area under the licensed name 🔵.

## 11. Product structured data

- Product markup exists with `brand: IKEA` and real images ✅. It has **no `offers`**, so it's not eligible for product rich results or merchant listings.
- After prices are added: per-variant `Offer` with `price`, `priceCurrency: AED`, `itemCondition: UsedCondition`, `availability` from real stock, and shipping/returns only if those policies exist 🔵.
- No reviews or ratings, ever, unless they're real ✅.

## 12. Conversion recommendations

- **Done 🟡:** order steps on the homepage, click events, trust fix (no fake email).
- **Recommended:**
  - Show prices, or "from AED …".
  - A per-item "condition notes" line.
  - Photos of the mattress and of any wear.
  - A delivery and installation statement once confirmed 🔵.
  - Install GA4 (needs a measurement ID 🔵) and mark `whatsapp_click` as a key event.
  - A WhatsApp lead sheet to connect clicks to actual orders, since clicks aren't sales.

## 13. Needs owner confirmation 🔵

1. Prices.
2. Delivery and installation areas, fees and times.
3. A real email address.
4. Ottoman bed frame brand and photos; HEMNES bed plan.
5. A GA4 measurement ID.
6. Trademark clearance before the rebrand.
7. Search Console access.

## 14. Deployment checklist (after your approval)

1. Review the branch locally.
2. Push `seo/uae-growth-improvements` and open a PR into `main`.
3. On the Vercel **Preview**:
   - `/beds?size=160x200` filters to 3 items.
   - `/beds` response headers no longer contain `no-store`.
   - The footer shows no email.
   - The WhatsApp buttons still open the chat.
4. Merge. Vercel deploys to production.
5. After deploying: re-run the live checks (§1) and Lighthouse; rebase `branding/ikea-used-furniture` if you still plan to use it.

## 15. Google indexing (do this now, even before the next deploy)

Production has had the new titles since 24 Oct, but Google still shows the old ones:
1. Search Console → URL Inspection → `https://www.ikeiausedfurniture.ae/` → **Test live URL** (it should show "IKEA Used Furniture") → **Request indexing**.
2. Repeat for `/beds`, `/sofa-beds`, `/daybeds`, `/products/ikea-malm-bed`, `/products/ikea-friheten-sofa-bed`, `/products/ikea-hemnes-daybed`, `/delivery-areas`.
3. Indexing → Sitemaps → resubmit `https://www.ikeiausedfurniture.ae/sitemap.xml` (23 URLs).
4. Recheck in 1–3 weeks. Google decides the final title and snippet.

## 16. 30/60/90-day plan (measurable)

| Window | Actions | Measure (source) |
|---|---|---|
| Days 0–30 | Request indexing (§15); deploy this branch; add prices + Offers; real email; GA4 + key event; confirm delivery info | Indexed pages 23/23 (GSC Pages); Product rich results valid (GSC Enhancements); `whatsapp_click` per week (GA4) |
| Days 31–60 | Per-item condition notes and measured dimensions; photos for ottoman/HEMNES; refresh titles **only** for pages with GSC impressions but low CTR | GSC clicks, impressions and position for the used-IKEA clusters; CTR per page |
| Days 61–90 | Add genuinely stocked new models (each one a real product page); outreach to UAE "where to buy used furniture" lists; decide on the rebrand after clearance | Queries in positions 11–20 moving to 1–10; referring domains; WhatsApp enquiries vs orders (lead sheet) |

No ranking position or traffic level is guaranteed.

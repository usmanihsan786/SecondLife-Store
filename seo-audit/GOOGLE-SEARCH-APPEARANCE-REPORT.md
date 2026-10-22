# Google search appearance: why Google still shows "SecondLife", and the fix

23 Oct 2026 · Branch `seo/google-search-appearance` (local, commit `828dbba`), based on `seo/used-ikea-conversion-improvements`.

**Not pushed, merged or deployed. The Google Business Profile hasn't been touched.**

## 1. Why Google still shows "SecondLife | Pre-Owned Furniture UAE"

**Confirmed causes:**

| # | Finding | Evidence (23 Oct 2026) |
|---|---|---|
| 1 | **None of the SEO work is in production.** The live site is still the 1 Oct build | The GitHub deployments API shows the last **Production** deployment is `a3827be` ("Updating whats app button", 2026-10-01). Both SEO branches have only **Preview** deployments (`45d739c`, `a762c59`). Vercel returns `Age: 1842128` s (≈21 days) and the same `Etag` as on 22 Oct |
| 2 | **Production serves the old metadata** | Live `<title>`: "SecondLife \| Pre-Owned Furniture UAE"; meta description: "Quality preloved furniture in the UAE." (37 characters); og:title "SecondLife \| The Pre-Owned Furniture Store"; **H1 "Quality Preloved IKEA Furniture in the UAE"**; **no JSON-LD at all** (0 blocks) |
| 3 | **Google is showing exactly that live content** | A `site:ikeiausedfurniture.ae` search shows title "SecondLife \| Pre-Owned Furniture UAE" with snippet "Quality preloved furniture in the UAE.", and site name **"ikeiausedfurniture.ae"** (no WebSite markup in production). The beds and sofa-beds snippets come from the old **footer** text "Quality preloved IKEA beds, mattresses…" |

**Likely contributing factor:**
- The description you saw ("Quality Preloved IKEA Furniture in the UAE") is the **live H1**. Google often writes its own snippet from page text when the meta description is very short or doesn't fit the query.

**Ruled out:**
- **Next.js metadata bugs or conflicts:** the built HTML has exactly one title, one description and one canonical per page, matching the source.
- **Indexing blocks:** no `noindex`, robots allows everything, canonicals are correct.

**Once deployed:** Google has to recrawl before anything changes, and it may still rewrite titles or snippets for some searches. That's Google's choice; there's no setting to force it.

## 2. Homepage: final metadata (validated)

| Element | Your proposal | Final | Why |
|---|---|---|---|
| Title | IKEA Used Furniture Dubai & UAE \| Second-Hand IKEA Beds & Sofas | **IKEA Used Furniture Dubai & UAE – Second-Hand Beds & Sofa Beds \| SecondLife** (75 chars) | Same opening phrase, so "IKEA used furniture" leads. "Sofas" became **"Sofa Beds"** because you sell sofa beds, not plain sofas. The second "IKEA" was dropped to avoid repetition. **"\| SecondLife"** stays so the title, Open Graph site name and WebSite markup agree. That's what Google's site-name system looks for, and it makes clear the title describes the products rather than claiming "IKEA Used Furniture" as the business name |
| Description | Shop genuine used IKEA furniture in Dubai and the UAE. Explore second-hand IKEA beds, daybeds and sofa beds. Contact us for availability. | **Shop genuine used IKEA furniture in Dubai and the UAE: second-hand IKEA beds with mattress, daybeds and sofa beds. Real photos of our stock. Ask on WhatsApp.** (157 chars) | Your wording, plus two true selling points ("with mattress", "real photos") and the actual contact method |
| H1 | Used IKEA Furniture in Dubai & Across the UAE | **Used IKEA Furniture in Dubai & Across the UAE** | Accepted as proposed |
| Open Graph / X | — | Same title and description | Link previews match the search result |
| Home content | — | H2 "**IKEA used furniture in Dubai and the UAE**" | The exact cluster phrase appears once, naturally, in the visible content |

Google shows roughly the first 55–60 characters of a title on mobile. "IKEA Used Furniture Dubai & UAE – Second-Hand Beds & Sofa Beds" fits there; "| SecondLife" may be cut off.

## 3. Google site name: can "IKEA Used Furniture" be the site's own name?

- **Today:** production has no WebSite markup, so Google shows the domain. The branch adds `WebSite.name = "SecondLife"` with `alternateName = "ikeiausedfurniture.ae"`, and `og:site_name = "SecondLife"`.
- **Using "IKEA Used Furniture" as the brand isn't recommended without clearance.** IKEA's terms require written permission to use the name. Google asks for a name that is "unique, accurate and not misleading" and says generic names are unlikely to be chosen. Details are in `REBRAND-RISK-AND-MIGRATION.md` and `SITE-NAME-AND-LOGO-DRAFT.md`.
- **Using "IKEA used furniture" as a description of the products in titles and copy** is what this branch does, with the "not affiliated with IKEA" statement kept in the footer, FAQs and Organization description.

## 4. Other corrections in this branch (8 files)

| File | Change |
|---|---|
| `src/app/layout.tsx` | Homepage title and description (also used for Open Graph and X) |
| `src/app/page.tsx` | Home H2 "IKEA used furniture in Dubai and the UAE" |
| `src/app/shop/page.tsx` | Distinct title "Shop All Used IKEA Furniture – Dubai & UAE" and description |
| `src/components/home/Sections.tsx` | "preloved" → "second-hand" / "used IKEA furniture" in the condition section |
| `src/data/products.ts` | "A preloved genuine IKEA…" → "A used, genuine IKEA…" in the 7 product descriptions (shown on page and in Product structured data) |
| `src/lib/whatsapp.ts`, `src/components/ui/WhatsAppFloatingButton.tsx` | Prefilled WhatsApp text says "your used IKEA furniture" (number unchanged) |
| `src/config/site.ts` | **`googleReviewsUrl` emptied, which hides the "Read our customer reviews on Google" links.** You've said the Business Profile is your brother's. Presenting another business's reviews as "our customer reviews" would mislead customers, so the links stay off until this business has its own profile |

**Unchanged:**
- URLs, canonicals and navigation.
- Prices, availability and inventory.
- The +971 55 326 7566 number and WhatsApp flows.
- The store name, and the ottoman bed's name.
- Your brother's Business Profile.

## 5. Metadata for all 23 pages: live production vs this branch

All 23 titles and 23 descriptions are unique. The 9 new pages don't exist in production yet.

| Page | Live production title (`a3827be`) | Final title (this branch) | Final description | Final H1 |
|---|---|---|---|---|
| `/` | SecondLife \| Pre-Owned Furniture UAE | IKEA Used Furniture Dubai & UAE – Second-Hand Beds & Sofa Beds \| SecondLife | Shop genuine used IKEA furniture in Dubai and the UAE: second-hand IKEA beds with mattress, daybeds and sofa beds. Real photos of our stock. Ask on WhatsApp. | Used IKEA Furniture in Dubai & Across the UAE |
| `/shop` | Shop Preloved IKEA Furniture \| SecondLife | Shop All Used IKEA Furniture – Dubai & UAE \| SecondLife | Browse all our second-hand IKEA beds, daybeds, sofa beds and ottoman storage beds for Dubai and the UAE. Filter by IKEA range, colour, size and availability. | Shop all used IKEA furniture |
| `/beds` | Preloved IKEA Beds with Mattress \| SecondLife | Used IKEA Beds with Mattress – Dubai & UAE, Single to King \| SecondLife | Second-hand IKEA MALM, BRIMNES and HEMNES beds sold with an IKEA mattress, plus ottoman storage beds. Single 90 cm to king 180 cm, with real photos. | Used IKEA Beds with Mattress |
| `/daybeds` | Preloved IKEA Daybeds \| SecondLife | Used IKEA Daybeds with 2 Mattresses – Dubai & UAE \| SecondLife | Second-hand IKEA BRIMNES and HEMNES daybeds, each with two IKEA mattresses. A sofa by day and a bed at night, for Dubai and the UAE. Ask on WhatsApp. | Used IKEA Daybeds with Two Mattresses |
| `/sofa-beds` | Preloved IKEA Sofa Beds \| SecondLife | Used IKEA Sofa Beds & Sofa Cum Beds – FRIHETEN, UAE \| SecondLife | Second-hand IKEA FRIHETEN corner sofa cum bed with storage, in gray and beige. A sofa every day and a bed for guests, for Dubai and the UAE. Ask on WhatsApp. | Second-hand IKEA Sofa Beds |
| `/storage-beds` | — (new page, not live) | Used Hydraulic Ottoman Storage Beds with IKEA Mattress \| SecondLife | Second-hand hydraulic ottoman storage beds sold with an IKEA mattress, in Queen 160 and King 180 cm, white or black. The base lifts up for storage underneath. | Ottoman Storage Beds with Mattress |
| `/ikea-brimnes` | — (new page, not live) | Used IKEA BRIMNES Beds & Daybed – UAE \| SecondLife | Second-hand IKEA BRIMNES furniture in white: BRIMNES beds with an IKEA mattress in Double, Queen and King, and the BRIMNES daybed with two mattresses. | Used IKEA BRIMNES Beds & Daybed |
| `/ikea-hemnes` | — (new page, not live) | Used IKEA HEMNES Daybed & Bed – White and Gray, UAE \| SecondLife | Second-hand IKEA HEMNES furniture: the HEMNES daybed with two IKEA mattresses in white or gray, plus HEMNES beds with an IKEA mattress when in stock. | Used IKEA HEMNES Daybed & Bed |
| `/delivery-areas` | — (new page, not live) | Used IKEA Furniture in Dubai, Sharjah, Ajman & Abu Dhabi \| SecondLife | Looking for used IKEA furniture in Dubai, Sharjah, Ajman or Abu Dhabi? Browse genuine second-hand IKEA beds, daybeds and sofa beds and ask us about delivery to your area. | Used IKEA Furniture in the UAE: Ask About Your Area |
| `/guides` | — (new page, not live) | Used IKEA Furniture Buying Guides \| SecondLife | Practical guides to buying used IKEA furniture in the UAE: IKEA bed sizes in cm, MALM vs BRIMNES vs HEMNES, daybed or sofa bed, and what to check before you buy. | Used IKEA furniture buying guides |
| `/about` | About Us \| SecondLife | About Us – Independent Used IKEA Furniture Reseller \| SecondLife | We offer quality used IKEA furniture in the UAE, helping customers find well-kept IKEA beds, daybeds and sofa beds at more affordable prices. | Well-kept IKEA furniture, at a fairer price |
| `/contact` | Contact Us \| SecondLife | Contact Us – Used IKEA Furniture on WhatsApp \| SecondLife | Contact us on WhatsApp, by phone or by email about used IKEA beds, daybeds and sofa beds in the UAE. | We are happy to help |
| `/products/ikea-malm-bed` | IKEA MALM Bed with IKEA Mattress \| SecondLife | Used IKEA MALM Bed with Mattress, Dubai – 90 to 180 cm \| SecondLife | Used, genuine IKEA MALM bed frame with an IKEA mattress, in four colours and four sizes. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA MALM Bed with IKEA Mattress |
| `/products/ikea-brimnes-bed` | IKEA BRIMNES Bed with IKEA Mattress \| SecondLife | Used IKEA BRIMNES Bed with Mattress – Double, Queen, King, UAE \| SecondLife | Used white IKEA BRIMNES bed with an IKEA mattress, in Double, Queen and King. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA BRIMNES Bed with IKEA Mattress |
| `/products/ikea-brimnes-daybed` | IKEA BRIMNES Daybed \| SecondLife | Used IKEA BRIMNES Daybed with 2 Mattresses, UAE \| SecondLife | Used white IKEA BRIMNES daybed, including two IKEA mattresses. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA BRIMNES Daybed |
| `/products/ikea-hemnes-daybed` | IKEA HEMNES Daybed \| SecondLife | Used IKEA HEMNES Daybed with 2 Mattresses – White & Gray \| SecondLife | Used IKEA HEMNES daybed in white or gray, including two IKEA mattresses. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA HEMNES Daybed |
| `/products/ikea-hemnes-bed` | IKEA HEMNES Bed with IKEA Mattress \| SecondLife | Used IKEA HEMNES Bed with Mattress – Queen & King, UAE \| SecondLife | Used IKEA HEMNES bed with an IKEA mattress, in Queen and King, white or gray. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA HEMNES Bed with IKEA Mattress |
| `/products/ikea-friheten-sofa-bed` | IKEA FRIHETEN Sofa Bed with Storage \| SecondLife | Used IKEA FRIHETEN L-Shape Sofa Cum Bed with Storage \| SecondLife | Used IKEA FRIHETEN corner (L-shape) sofa cum bed with storage, in gray or beige. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA FRIHETEN Sofa Bed with Storage |
| `/products/ikea-hydraulic-ottoman-bed` | IKEA Hydraulic Ottoman Bed with IKEA Mattress \| SecondLife | IKEA Hydraulic Ottoman Bed with IKEA Mattress \| SecondLife | Used hydraulic ottoman storage bed with an IKEA mattress, in Queen and King. Excellent condition. Ask us on WhatsApp about availability in the UAE. | Used IKEA Hydraulic Ottoman Bed with IKEA Mattress |
| `/guides/ikea-bed-sizes-uae` | — (new page, not live) | IKEA Bed Sizes in UAE: Single, Double, Queen, King (cm) \| SecondLife | IKEA beds in the UAE use European sizes: 90, 140, 160 and 180 × 200 cm. See which size is single, double, queen and king, and which mattress fits which frame. | IKEA Bed Sizes Explained: Single, Double, Queen and King in cm |
| `/guides/buying-used-ikea-furniture-uae` | — (new page, not live) | Buying Used IKEA Furniture in the UAE – What to Check \| SecondLife | Is second-hand IKEA furniture worth it? What to check on a used IKEA bed, daybed or sofa bed, how to compare listings, and how buying from us works. | Buying Used IKEA Furniture in the UAE: A Practical Guide |
| `/guides/ikea-malm-vs-brimnes-vs-hemnes` | — (new page, not live) | IKEA MALM vs BRIMNES vs HEMNES: Used Bed Comparison \| SecondLife | MALM, BRIMNES and HEMNES are three of IKEA&#x27;s best-known bed ranges. Compare their style, sizes and storage to choose the right used IKEA bed for your room. | IKEA MALM vs BRIMNES vs HEMNES: Which Bed Should You Buy Used? |
| `/guides/ikea-daybed-vs-sofa-bed` | — (new page, not live) | IKEA Daybed vs Sofa Bed – Which Is Better for Your Home? \| SecondLife | Compare IKEA daybeds such as BRIMNES and HEMNES with the FRIHETEN sofa bed: seating, sleeping comfort, storage and space, for UAE apartments and guest rooms. | IKEA Daybed or Sofa Bed? Choosing for a Small Apartment or Guest Room |

## 6. Verification results (local production build of this branch)

- **`tsc`, `eslint`, `next build`:** pass.
- **All 23 sitemap URLs:** HTTP 200, self-referencing canonical, no `noindex`, exactly one H1. Titles are 44–75 characters (the homepage is 75; the audit script reports 83 only because it counts the escaped `&amp;`) and descriptions 100–170 characters. No duplicates.
- **Structured data:** JSON-LD parses on every page and required properties are present.
  - WebSite + Organization on all pages; BreadcrumbList on 20; Product on 7; Article on 4.
  - Organization `telephone` is `+971553267566`.
  - On 22 Oct the Schema Markup Validator showed 0 errors and 0 warnings for the same templates; this branch only changed text values.
  - Expected in Google's Rich Results Test: Product flagged for missing `offers` until prices exist (unchanged from production).
- **Links and sitemap:** 27 internal links, none broken; sitemap has 23 URLs plus 45 product images; robots allows everything.
- **Phone and WhatsApp:** only `tel:+971553267566` and `https://wa.me/971553267566` on every page.
- **Mobile:** no horizontal scroll at 375 px on the home, shop, contact and MALM pages; hero, buttons and menu are unchanged.
- **Favicon:** the original house-and-lamp icon (`/favicon.ico` 48×48, `/icon.png` 512×512, `/apple-icon.png` 180×180), all returning 200 to Googlebot-Image. It meets Google's square, multiple-of-48-px rule and contains no IKEA logo.

## 7. Search Console: indexing and recrawl (only after production deployment)

Do **not** request indexing for localhost, `*.vercel.app` previews or unmerged branches.
1. **Check production first:** open `view-source:https://www.ikeiausedfurniture.ae/` and confirm the new `<title>` and description.
2. **URL Inspection** → `https://www.ikeiausedfurniture.ae/`:
   - "View crawled page" shows the indexed version, which will still say SecondLife.
   - "Test live URL" should show the new title.
   - If it does, click **Request indexing**.
3. Repeat for `/beds`, `/daybeds`, `/sofa-beds`, `/products/ikea-malm-bed`, `/products/ikea-friheten-sofa-bed` and `/products/ikea-hemnes-daybed`. There's a daily request limit, so do the most important pages first.
4. **Sitemaps:** resubmit `https://www.ikeiausedfurniture.ae/sitemap.xml`. It should show 23 discovered URLs.
5. **Pages report:** after 1–2 weeks, check *Indexed* vs *Not indexed* and open each reason.
6. **Monitor:** search `site:ikeiausedfurniture.ae` every few days. Titles and snippets usually update after a recrawl, often within days to a few weeks, but there's no guarantee and Google may still rewrite them.

## 8. Production deployment checklist

1. Review this branch locally (§11).
2. Decide how to merge. `seo/google-search-appearance` contains **all** SEO work (`seo/ikea-quick-wins` → `seo/used-ikea-conversion-improvements` → this branch). Merging it alone deploys everything, so a single PR from this branch into `main` is simplest.
3. Push the branch, open the PR, and check the Vercel **Preview**: home head, `/sofa-beds`, a product page, `/sitemap.xml`.
4. Merge into `main`. Vercel deploys to production.
5. Run the post-deploy checks (§10), then Search Console (§7).
6. Afterwards, with separate approval: set the guides' `published` dates to the deploy date.

## 9. Risks to existing rankings

| Risk | Likelihood | Mitigation |
|---|---|---|
| Short-term movement on the queries where the site already ranks (~#6–10: used ikea daybed dubai, ikea bed with mattress used dubai, used ikea malm bed dubai, used ikea bed dubai) | Possible | URLs are unchanged, and the new titles keep those phrases. Watch weekly for 4 weeks |
| Google keeps showing an old or rewritten title | Likely for a while | Request indexing; wait for recrawls. Google controls the final display |
| 9 new pages at once on a young site | Low | All are unique, internally linked and in the sitemap; no doorway pages |
| Reviews link removal lowers trust signals | Low | It was never live. Add your own profile later |
| A bad deploy breaks WhatsApp or layout | Low | Verified locally; check the Vercel preview before merging; Vercel can instantly roll back to `a3827be` |

## 10. After deployment: verification

Run each command and compare with the expected result.

Homepage title (expect "IKEA Used Furniture Dubai & UAE – Second-Hand Beds & Sofa Beds | SecondLife"):
```bash
curl -s https://www.ikeiausedfurniture.ae/ | grep -o "<title>[^<]*"
```
Homepage description (expect it to start "Shop genuine used IKEA furniture in Dubai"):
```bash
curl -s https://www.ikeiausedfurniture.ae/ | grep -o '<meta name="description" content="[^"]*"'
```
Structured data present (expect 1 or more):
```bash
curl -s https://www.ikeiausedfurniture.ae/ | grep -c "application/ld+json"
```
Sitemap URL count (expect 23):
```bash
curl -s https://www.ikeiausedfurniture.ae/sitemap.xml | grep -c "<loc>"
```

Then on your phone: open `/products/ikea-malm-bed`, pick a colour and size, and tap WhatsApp. It should open a chat with +971 55 326 7566 with the item details. Finally, run Search Console URL Inspection for the homepage (§7).

## 11. Local preview

Run each command in the project folder.

Switch to the branch:
```bash
git checkout seo/google-search-appearance
```
Install packages:
```bash
npm install
```
Build the production version:
```bash
npm run build
```
Start it:
```bash
npm start
```
Open http://localhost:3000 and use "View page source" to check the `<title>` and description. To see only this branch's changes:
```bash
git diff seo/used-ikea-conversion-improvements..seo/google-search-appearance
```

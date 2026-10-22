# IKEA SEO implementation plan: status and next steps

Updated 22 Oct 2026. The strategy is option B: **SecondLife stays the business name; IKEA is used accurately to describe genuine IKEA products.** No domain, store-name or existing-URL changes.

| Branch | Contents | State |
|---|---|---|
| `seo/ikea-quick-wins` | All safe SEO work (commits `f99f5e7`, `a2281dc`) | Local, not pushed. **Ready to review and deploy** |
| `draft/site-name-ikea-used-furniture` | "IKEA Used Furniture" display name and logo (`be16a5e`) | Local, **do not merge**. Blocked on trademark clearance |

Related documents: [IKEA-SEO-AUDIT.md](IKEA-SEO-AUDIT.md) · [KEYWORD-PAGE-MAP.md](KEYWORD-PAGE-MAP.md) · [REBRAND-RISK-AND-MIGRATION.md](REBRAND-RISK-AND-MIGRATION.md) · [SITE-NAME-AND-LOGO-DRAFT.md](SITE-NAME-AND-LOGO-DRAFT.md) · [ikea-keyword-database.xlsx](ikea-keyword-database.xlsx)

---

## Done on `seo/ikea-quick-wins`

| # | Change | Pages | Target clusters |
|---|---|---|---|
| 1 | Homepage title, description, H1 and eyebrow lead with "Used IKEA Furniture in UAE" | `/` | used ikea furniture uae / dubai, second hand ikea furniture |
| 2 | Category and shop titles, descriptions and H1s rewritten around "used / second-hand IKEA" | `/beds`, `/daybeds`, `/sofa-beds`, `/shop` | used ikea beds, ikea daybed, ikea sofa bed |
| 3 | Per-product `seoTitle` with model, sizes and colours; "Used" in H1, short descriptions and image alt text | 6 product pages (the ottoman bed is untouched) | model + used / size / colour |
| 4 | **New indexable pages**, replacing filters that canonicalised to `/shop`: `/storage-beds`, `/ikea-brimnes`, `/ikea-hemnes` | 3 new | ottoman / hydraulic / storage bed; BRIMNES; HEMNES |
| 5 | **One location page** (not doorway city pages): `/delivery-areas`, with sections for Dubai, Sharjah and Ajman, Abu Dhabi, and other emirates. It invites buyers to ask about delivery and **makes no delivery promise** | 1 new | used ikea furniture sharjah / ajman / abu dhabi |
| 6 | **Buying guides**: `/guides` plus IKEA bed sizes, buying used IKEA in the UAE, MALM vs BRIMNES vs HEMNES, daybed vs sofa bed | 5 new | sizes, comparisons, questions |
| 7 | Category content under each product grid: size links, range links, "what's included", FAQs, related links | all catalog pages + home | long-tail + People Also Ask-style questions |
| 8 | Internal links: series cards and product series labels point at indexable pages; a "Helpful links" block on product pages; footer links to areas served and guides | sitewide | link equity to money pages |
| 9 | Structured data: Organization (`areaServed`: UAE only until you confirm cities), WebSite (+ `alternateName`), BreadcrumbList on every catalog/content/product page, Article on guides | sitewide | eligibility for breadcrumbs, site name |
| 10 | Sitemap lists all 23 URLs; guides include `lastModified` | `/sitemap.xml` | discovery |
| 11 | Consistent "not affiliated with IKEA" wording in the footer, FAQs and Organization description | sitewide | trust; avoiding any affiliation claim |

Verified: `tsc`, `eslint` and `next build` pass. **All 23 sitemap URLs** were audited one by one: HTTP 200, self canonical, no noindex, one H1, valid JSON-LD, title and description lengths, no duplicates. No broken internal links (27 checked). No horizontal scroll at 375 px on any page. The Schema Markup Validator reports 0 errors and 0 warnings for Product, BreadcrumbList, Article, Organization and WebSite.

**✏️ Check before deploying** (my copy is based on what the site already says; please correct anything that isn't true for your business):
- Delivery: the site now says only "message us with your area and we will tell you whether we can deliver". Once you confirm areas, fees or timings, update the `✏️ CONFIRM` spots in `src/data/faq.tsx`, `src/app/delivery-areas/page.tsx` and `src/app/layout.tsx`.
- The guides (`src/data/guides.tsx`) describe the IKEA ranges in general terms and ask buyers to confirm features such as drawers. Add your own photos and experience when you can.

---

## Next steps, in priority order

| P | Task | Page(s) | Cluster | What's needed | Success metric |
|---|---|---|---|---|---|
| 1 | **Deploy the safe branch** | all | all | Your review → push → Vercel deploy | Live titles and JSON-LD match the local build |
| 1 | Verify Search Console (Domain property), submit the sitemap, request indexing for `/`, the category pages and the new pages | all | — | GSC access | All 23 URLs "Indexed" within ~4 weeks |
| 1 | Replace `hello@example.com` | sitewide | trust | Real email | No placeholder data live |
| 1 | **Prices** → per-variant `Offer` (UsedCondition, availability) | product pages | model + price / for sale | Your prices | GSC Product snippets: valid items = number of products |
| 1 | Ottoman bed: confirm frame brand; rename/301 if it isn't IKEA; add photos | `/products/ikea-hydraulic-ottoman-bed` | storage beds | Your answer + photos | No brand claim in doubt; page has photos |
| 2 | HEMNES bed: photos and confirmed sizes, or a 301 to `/ikea-hemnes` if it won't return | `/products/ikea-hemnes-bed` | HEMNES bed | Your decision | No empty pages indexed |
| 2 | GA4 + WhatsApp click event (page, variant) | sitewide | conversions | GA4 property | Organic WhatsApp clicks measurable |
| 2 | Fix the 2-hop redirect (apex → www directly) | Vercel domains | — | Vercel access | 1 hop |
| 2 | Use logo B (SecondLife + "Used IKEA Furniture · UAE") once a designer finalises it | header | brand + descriptor | Designer files | Logo shows the descriptor |
| 2 | Add measured dimensions and condition notes per variant (`variantDescription`) | product pages | model + size / condition | Your measurements | Longer engaged time; fewer "size?" questions |
| 3 | Analyse GSC data (positions 4–20, low-CTR queries, cannibalisation) and adjust copy on the mapped page | per [KEYWORD-PAGE-MAP.md](KEYWORD-PAGE-MAP.md) | all | GSC exports (28 days and 3 months) | Queries moving from 11–20 into the top 10 |
| 3 | Google Business Profile, if eligible (real address or service area), named exactly as licensed | off-site | local pack (Sharjah/Ajman/Dubai) | Your eligibility | GBP views and calls |
| 3 | Pitch the size and buying guides to UAE relocation and home blogs | off-site | authority | Outreach | Referring domains |
| 4 | New product pages only when stock arrives (PAX, KALLAX, KIVIK…); keywords are already in the database as P4 | future | P4 clusters | Real inventory | — |
| 4 | Arabic pages (`/ar/`) with real translation + hreflang | future | 76 Arabic keywords | A translator | — |
| — | "IKEA Used Furniture" site name and logo | draft branch | brand | **Trademark clearance first** | — |

## Not done, deliberately

- **No city doorway pages** (`/used-ikea-furniture-sharjah`, etc.). One `/delivery-areas` page covers the location intent honestly. Add city-specific pages only if a city has something genuinely different (a showroom, different stock or different delivery terms).
- **No FAQPage schema.** Google now limits FAQ rich results to authoritative government and health sites; the visible FAQs still help users and long-tail matching.
- **No `aggregateRating`/`review` schema**: there are no genuine reviews on the site.
- **No pages for stock you don't have**, and no copied IKEA descriptions or photos.

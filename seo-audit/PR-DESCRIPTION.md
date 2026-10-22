## IKEA-focused SEO: on-page, new indexable pages, structured data

> **Draft PR. Do not merge or deploy to production until the owner approves.**
> The store name (SecondLife), the domain and every existing URL are unchanged. The "IKEA Used Furniture" branding is on a separate local branch (`draft/site-name-ikea-used-furniture`) and is **not** part of this PR.

**Commits:** `f99f5e7` quick wins · `a2281dc` new pages and content · `45d739c` remove unconfirmed claims and tidy metadata
**Files:** 30 changed (10 added, 20 modified), +1,307 / −62. All in `src/`; no config, dependency, domain or redirect changes.

### New pages: 9 (sitemap 14 → 23 URLs)
| URL | Purpose |
|---|---|
| `/storage-beds` | Ottoman / hydraulic storage beds. Replaces the `/shop?category=storage-beds` filter, which canonicalised to `/shop`. Does not call the frames IKEA |
| `/ikea-brimnes` | IKEA BRIMNES range (bed + daybed). Replaces `/shop?series=brimnes` |
| `/ikea-hemnes` | IKEA HEMNES range (daybed + sold-out bed). Replaces `/shop?series=hemnes` |
| `/delivery-areas` | One location page for Dubai, Sharjah, Ajman and Abu Dhabi searches (no city doorway pages). **Makes no delivery promise:** "message us with your area" |
| `/guides` | Guides index |
| `/guides/ikea-bed-sizes-uae` | IKEA bed and mattress sizes in cm |
| `/guides/buying-used-ikea-furniture-uae` | What to check when buying used IKEA |
| `/guides/ikea-malm-vs-brimnes-vs-hemnes` | Range comparison |
| `/guides/ikea-daybed-vs-sofa-bed` | Daybed vs sofa bed |

The old `/shop?series=…` and `/shop?category=…` links still work.

### Changes to existing pages
- **Homepage:** title "Used IKEA Furniture in UAE – Beds, Daybeds & Sofa Beds \| SecondLife", new description, H1 "Used IKEA Furniture in the UAE, in Excellent Condition", plus category links, an FAQ and guide links.
- **`/beds`, `/daybeds`, `/sofa-beds`, `/shop`:** "Used / Second-hand IKEA" titles, descriptions and H1s, plus size links, range links, what's included, FAQs and related links under the grid.
- **Product pages:** a new optional `seoTitle` is set for 6 products (the **ottoman bed is untouched**). "Used" is added to the H1, short descriptions and image alt text. A "Helpful links" block is added, and the series label links to the range page.
- **About / Contact:** descriptive titles. "Preloved" wording is replaced with "used / second-hand" (the term UAE searchers use).
- **Footer:** links to "Delivery & areas" and "Buying guides". The main navigation is unchanged.
- **Tagline:** now "Used IKEA Furniture in the UAE" (used in link-preview alt text).

### Structured data
- **Every page:** Organization (`areaServed`: UAE only, until delivery areas are confirmed) and WebSite (`name` SecondLife, `alternateName` the domain).
- **BreadcrumbList:** on catalog, content and product pages. **Article:** on guides.
- **Product:** unchanged, and still has no `offers` because no prices are set.

### Verification
- `tsc`, `eslint` and `next build` pass.
- All 23 sitemap URLs (local production build): HTTP 200, self-referencing canonical, no `noindex`, exactly one H1, JSON-LD parses, titles 30–75 characters, descriptions 70–175 characters, no duplicate titles or descriptions.
- 27 unique internal links: none broken.
- Schema Markup Validator: **0 errors, 0 warnings** (Product, BreadcrumbList, Article, WebSite/Organization). Google's Rich Results Test wasn't run because it requires sign-in. Expect it to flag Product as missing `offers` until prices are added; that was already the case before this PR.
- At 375 px, no page scrolls horizontally. Mobile menu, colour/size selection (the URL and WhatsApp message update), size filter and FAQ toggles all work.
- The Vercel deployment of this branch is **Preview** only (GitHub deployment environment "Preview"). Production is still `a3827be` (`main`).

### Not in this PR
- `seo-audit/` (audit, keyword database and plans): local files, uncommitted.
- The "IKEA Used Furniture" name and logo draft: a separate local branch, blocked on trademark clearance.

### Needs owner confirmation before production
1. Delivery areas, fees, timings and assembly (`✏️ CONFIRM` in `src/data/faq.tsx`, `src/app/delivery-areas/page.tsx`, `src/app/layout.tsx`).
2. Ottoman bed frame brand. It is still named "IKEA Hydraulic Ottoman Bed" with `brand: IKEA` in its markup (pre-existing), and it has 0 photos.
3. HEMNES bed: sold out, 0 photos, sizes unconfirmed.
4. Prices (none set).
5. Real email (`hello@example.com` placeholder, pre-existing).
6. Wording of the 4 guides and the category FAQs.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

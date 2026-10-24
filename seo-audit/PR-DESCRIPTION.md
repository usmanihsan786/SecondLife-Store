## SEO: homepage "IKEA Used Furniture", used-IKEA pages, structured data, one phone number

Brings all SEO work to production. Targets people buying **genuine used IKEA furniture in Dubai and the UAE**.

- **Unchanged:** domain and existing URLs, products and prices, store branding (logo, site name "SecondLife"), and the Google Business Profile.
- **Not included:** the "IKEA Used Furniture" store-name/logo draft. It stays separate, pending trademark clearance.

### Homepage

| | Before (production `a3827be`) | After |
|---|---|---|
| `<title>` | SecondLife \| Pre-Owned Furniture UAE | **IKEA Used Furniture** |
| H1 | Quality Preloved IKEA Furniture in the UAE | **IKEA Used Furniture** |
| og:title / twitter:title | SecondLife \| The Pre-Owned Furniture Store | **IKEA Used Furniture** |
| Description | Quality preloved furniture in the UAE. | IKEA Used Furniture. Shop genuine used IKEA beds, daybeds, sofa beds and more in Dubai and across the UAE. Contact us on WhatsApp for availability. |

The homepage title uses `title.absolute`, so the `%s | SecondLife` template is not appended. Homepage metadata lives in `app/page.tsx`; the layout keeps only site-wide defaults, so other pages no longer inherit the homepage's `og:title`, `og:description` or `og:url`.

### Rest of the site
- **9 new indexable pages** (sitemap 14 → 23 URLs):
  - `/storage-beds`, `/ikea-brimnes`, `/ikea-hemnes`, which replace `/shop?…` filters that canonicalised to `/shop`.
  - `/delivery-areas`: one location page, no delivery promise.
  - `/guides`, plus 4 buying guides.
- **Titles, descriptions and H1s** lead with "Used / Second-hand IKEA". The pages that already rank name Dubai and the UAE: daybeds, beds, the MALM page.
- **"Sofa cum bed"** on `/sofa-beds` and FRIHETEN (corner/L-shape with storage, matching the stock photos).
- **"Preloved" / "pre-owned" removed** from copy, product descriptions and WhatsApp prefilled messages.
- **Content:** FAQs, size and range links, internal links, footer links.
- **Structured data:**
  - Organization (areaServed UAE) and WebSite (name "SecondLife") on every page.
  - BreadcrumbList on catalog, content and product pages; Article on guides (`datePublished` and `image` only once real).
  - Image sitemap with 45 stock photos.
- **Phone:** `+971 55 326 7566` is set once (`PHONE` in `src/config/site.ts`). `tel:`, `wa.me` and the Organization `telephone` derive from it.
- **Reviews links:** hidden (`googleReviewsUrl: ""`). The linked profile belongs to another business.
- **Repo hygiene:** `seo-audit/drafts/` and `seo-audit/competitor-profiles/raw/` are ignored and absent from history. SEO reports, keyword databases and `.claude/skills` are committed.

### Verification (local production build)
- `tsc`, `eslint` and `next build` pass.
- **Homepage HTML:** exactly one `<title>IKEA Used Furniture</title>` and one H1 "IKEA Used Furniture"; og/twitter titles match; canonical `https://www.ikeiausedfurniture.ae`; no `noindex`.
- **All 23 sitemap URLs:** HTTP 200, self canonical, one H1, valid JSON-LD, unique titles and descriptions. 27 internal links, none broken.
- **Phone:** only `tel:+971553267566` and `https://wa.me/971553267566`, including the messages built when a WhatsApp button is tapped.
- **Mobile:** no horizontal scroll at 375 px.

### After merge
1. Verify the live `<title>`, H1 and canonical on https://www.ikeiausedfurniture.ae/.
2. Search Console:
   - URL Inspection → Test live URL → Request indexing (homepage, then categories and products).
   - Resubmit `/sitemap.xml`.
3. Google controls the displayed title and snippet, and updates only after recrawling.

### Needs owner confirmation (no claims published)
- Delivery and installation areas, fees and timings (`✏️ CONFIRM` spots).
- Prices; the ottoman bed frame brand; the HEMNES bed; a real email (placeholder already in production).
- A public Facebook URL; guide `published` dates at deploy.
- Trademark clearance before using "IKEA Used Furniture" as the store name, logo or site name.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

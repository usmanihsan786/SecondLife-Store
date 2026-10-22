## Used-IKEA SEO: on-page targeting, new indexable pages, structured data, one phone number

Targets searches from people buying **genuine used IKEA furniture in Dubai and the UAE**.

- **Unchanged:** store name (SecondLife), domain, existing URLs, prices, and the Google Business Profile.
- **Not included:** the "IKEA Used Furniture" branding draft. It stays on a separate local branch until trademark clearance.

### Commits
- `f99f5e7` Used-IKEA titles, homepage copy, Organization/WebSite and breadcrumb schema
- `a2281dc` New indexable range, storage-bed, area and guide pages; category content
- `45d739c` Removed unconfirmed delivery claims; copy matches current stock; metadata within length limits
- `c949ed0` Dubai wording on pages already ranking; "sofa cum bed"; Google reviews link; image sitemap; guide dates only when real
- `a762c59` Phone/WhatsApp number (+971 55 326 7566) typed once as `PHONE`, everything else derived from it

### What changes
- **9 new pages** (sitemap goes from 14 to 23 URLs):
  - `/storage-beds`, `/ikea-brimnes`, `/ikea-hemnes`. These replace `/shop?…` filters that canonicalised to `/shop`.
  - `/delivery-areas`: one location page with no delivery promise and no city doorway pages.
  - `/guides`, plus 4 buying guides.
- **Titles, descriptions and headings** lead with "Used / Second-hand IKEA". Dubai and the UAE are named on the pages already ranking for:
  - *used ikea daybed dubai* (observed ~#6)
  - *ikea bed with mattress used dubai* (~#7)
  - *used ikea malm bed dubai* (~#8)
  - *used ikea bed dubai* (~#10)
- **"Sofa cum bed"** (customers' own wording) on `/sofa-beds`, FRIHETEN and one guide. FRIHETEN is described as the corner (L-shape) version with storage, which matches the stock photos.
- **Content:** FAQs, size and range links, internal links, footer links, and a "Read our customer reviews on Google" link. There's no review markup.
- **Structured data:**
  - Organization (areaServed: UAE; `sameAs` only for profiles that are filled in) and WebSite on every page.
  - BreadcrumbList on catalog, content and product pages.
  - Article on guides, with `datePublished` and `image` only once real values exist.
- **Image sitemap:** 45 real product photos listed.
- **Phone:** `+971 55 326 7566` is set once in `src/config/site.ts`. The displayed number, `tel:` links, `wa.me` links and the Organization `telephone` all come from it. No number changed visibly.

### Verification (local production build)
- `tsc`, `eslint` and `next build` pass.
- **All 23 sitemap URLs:** HTTP 200, self-referencing canonical, no `noindex`, one H1, valid JSON-LD. Titles are 44–75 characters and descriptions 100–170 characters, with no duplicates.
- **Links:** 27 internal links, none broken.
- **Phone:** only `tel:+971553267566` and `wa.me/971553267566`, including the messages built when a WhatsApp button is tapped.
- **Mobile:** no horizontal scroll at 375 px. Menu, colour/size selection, filters and FAQs all work.
- **Schema Markup Validator:** 0 errors, 0 warnings. Google's Rich Results Test wasn't run (it needs sign-in). Product markup has no `offers` until prices are set; that was already the case before this PR.

### Needs owner confirmation (no claims published)
- Delivery and installation areas, fees and timings (`✏️ CONFIRM` in `src/data/faq.tsx`, `src/app/delivery-areas/page.tsx`, `src/app/layout.tsx`).
- Prices; the ottoman bed frame brand; the HEMNES bed (sold out, no photos); a real email (`hello@example.com` placeholder, already present before this PR).
- A public Facebook URL (`facebookUrl` left empty) and, optionally, a full Google Maps profile URL instead of the share link.
- Guide `published` dates, to set at deployment.

### After merging
- Submit the sitemap in Search Console.
- Request indexing for the home, category and product pages.
- Then, with separate approval, update the Business Profile website link and phone.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

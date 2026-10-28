# Premium redesign report

Branch `design/premium-furniture-storefront`, based on `main` at `437c853` (the current production version).
**Local only: not committed, pushed, merged or deployed.**

Design tokens and components are documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Screenshots are in
`seo-audit/drafts/redesign-screenshots/before/` and `/after/` (git-ignored).

> The redesign does not change the trademark position. "IKEA Used Furniture" as the business name is still not legally
> cleared; see `seo-audit/TRADEMARK-RISK-STATUS.md`.

---

## 1. The previous design: an honest review

The old site was technically sound: static pages, good metadata, accessible markup and working filters, with
Lighthouse at 100 everywhere except mobile performance (91–93). These were the real weaknesses:

| Area | Issue |
|---|---|
| Imagery | The hero (`hero.webp`) and condition (`condition.webp`) images are styled room scenes that do not look like the store's own stock (they appear staged or computer-generated; their origin could not be verified). The hero labelled one "Used IKEA bedroom furniture", which could mislead buyers. |
| Visual hierarchy | Beige page on beige bands with brown buttons: low separation, and the grey and white product photos clashed with the brown palette. |
| Cards | Three different boxed card styles (collections, products, text links), all with borders and shadows. It looked like a template. |
| Typography | Cormorant Garamond's hairlines were thin at section sizes, and Jost is a Futura-style geometric face (Futura was IKEA's historic typeface). |
| Homepage | 9,167 px tall on a 390 px phone. Featured products were one per row, and categories were plain text links. |
| Product page | Photos cropped to 4:3 (portrait photos lost the top and bottom of the bed), dots instead of a counter, no full-screen view, no "before you buy" guidance. |
| Motion | A looping shine on the WhatsApp button, and a staggered entrance animation on every product card. |
| Catalog | No way to hop between categories from the top of a listing. |
| Small issues | Breadcrumb links were 20 px tall; "Home" sat in the main nav next to the logo. |

## 2. Design direction

Scandinavian retail, product-first: white space, warm stone surfaces, photos without frames, an editorial serif for
titles and a clean sans for shopping information. One dark neutral for actions and a single oak accent taken from the
store's own house-and-lamp mark. It is original: no IKEA logo, typeface, blue/yellow colours or page layouts.

## 3. What changed

**Shared (all 23 pages)**
- New tokens: white canvas, `#f7f7f4` surfaces, `#202320` ink and actions, oak accent, neutral sold-out state.
- Fonts: Instrument Serif + Instrument Sans (2 font files; previously 4).
- Smaller radii (8 / 6 px); shadows removed from cards.
- One `PageHeader` used by every inner page: breadcrumbs, eyebrow, H1, intro.
- Footer: brand and contact column with WhatsApp button and phone, then Shop, Buying guides and Information. The
  independent-reseller disclaimer is kept.
- FAQ accordions with a plus/minus icon; link lists as clean rows; 32 px breadcrumb targets.

**Header and navigation**
- A dark utility strip with true facts only: genuine used IKEA, independent reseller in the UAE, the phone number, and a
  link to delivery enquiries. It scrolls away.
- Sticky header: Shop all, Beds, Daybeds, Sofa Beds, Storage Beds, Guides, About, and a WhatsApp button (icon below 1280 px).
- Phone menu: large serif shop links, then information links, the WhatsApp button and the phone number.

**Homepage**
- Hero: the exact H1 "IKEA Used Furniture", a short description, "Shop Furniture" and "WhatsApp Inquiry" buttons and three
  trust facts. A mosaic of **three real stock photos**, each linking to that exact item (MALM brown 160 × 200,
  FRIHETEN beige, HEMNES white daybed). Sold-out items drop out automatically.
- Photo category tiles (beds, daybeds, sofa beds, storage beds) with product counts from the data.
- Featured products: 2 per row on phones, 4 on desktop.
- "Shop by IKEA series": portrait collection cards with real counts; a swipeable row on phones.
- "How to order on WhatsApp": three numbered steps.
- Condition section now uses a real HEMNES photo, plus an "Ask for more photos" button.
- "Why shop with us": six verifiable points with line icons.
- Buying guides as photo cards (the existing 4 guides only).
- The Dubai/UAE text and the FAQs are kept, side by side on desktop.

**Shop and category pages**
- Category shortcut pills at the top of every listing (All, Beds, Daybeds, Sofa beds, Storage beds, BRIMNES, HEMNES).
- Toolbar with the item count; filter chips with "Clear all".
- Filters: checkbox rows, colour swatches, a 2-column size grid; the same component on desktop and in the phone drawer
  (with a grab handle and a "Show N items" button).
- Photo-first product cards: 1:1 photo, series, name, sizes, colours, price or "Ask for price", condition and availability.
- No sort menu: with no prices or dates in the data, every sort option would be fake. Search was not added either:
  with 7 products the category pills and filters find everything faster (recommended from about 40 products).

**Product pages**
- Gallery: square frame showing the **whole photo** (no cropping), counter ("1 / 3"), thumbnails on every screen size,
  arrows, swipe, and a full-screen viewer with keyboard support.
- Information: series link, the unchanged H1 ("Used …"), condition, "Used, genuine IKEA" and "Mattress included" chips,
  price or "Ask for price" with an honest note, colour and size selectors, availability, the WhatsApp button, a "call"
  link, and the delivery note.
- "About this item", a details table (series, category, condition, includes, colours, mattress sizes, measurements:
  "ask us") and a "Before you buy" panel (photos, measurements, delivery area).
- Up to 4 related items (same category or series).
- The phone sticky bar and floating button work as before; the floating button moves above the bar.

**Other pages**: About, Contact, Delivery & areas, Guides, guide articles and 404 use the new header and styles. Their
text is unchanged.

**Copy and data**
- `priceFallback` is "Ask for price" (was "Contact for price").
- Categories now have a title, blurb and photo (`src/data/options.ts`); guides have a short label and card photo.
- Navigation lists are in `src/config/site.ts` (`mainNav`, `shopNav`, `infoNav`).

## 4. What is working (verified)

Results from a local production build (`next build` + `next start`). Everything listed was run, not assumed.

| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Pass |
| ESLint | Pass |
| `next build` | Pass; all 30 routes static |
| SEO compared with production, all 23 sitemap URLs | **0 differences** in title, description, robots, canonical, Open Graph, Twitter, H1 and JSON-LD |
| Sitemap and robots.txt | Identical to production |
| Internal links | 30 checked, 0 broken, 0 orphan pages, no link removed from any page |
| Contact links | Only `wa.me/971553267566` and `tel:+971553267566` |
| Banned words (SecondLife, preloved, pre-owned) | None in customer-facing text |
| Images | Every image used on every page returns 200 |
| Responsive: 23 pages × 8 widths (320, 360, 375, 390, 430, 768, 1024, 1440) | 184 checks: no horizontal overflow, exactly one H1 per page |
| Phone menu | Opens, lists all 10 links, closes |
| FAQ accordion | Opens and closes |
| Filters (`/beds`) | Shared link `?size=160x200` shows 3 items; drawer filter plus colour gives "Show 1 item", updates the URL; "Clear all" resets to 4 |
| Variant selection (MALM) | Brown 180 × 200 updates the URL, the photo and the WhatsApp message (item, colour, size, link) |
| Sold-out variant | Shows "Currently sold out" and "Ask about similar items" |
| Photo viewer | Opens on tap with the correct photo, closes |
| Sticky bar | Appears after the main button scrolls away; the floating button sits above it |

Three H2s were reworded on the homepage ("Shop by series" became "Shop by IKEA series", "Quality furniture, carefully
selected" became "Used furniture, carefully selected"), and the footer's "Get in touch" heading became the
brand/contact column.

## 5. Performance and accessibility (Lighthouse 13.5.0, local, before vs after)

Measured on the same machine, the same way (local `next start`, Lighthouse's default simulated mobile throttling and
desktop preset). Field data from real visitors will differ.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | Page weight |
|---|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 93 → **93** | 100 → 100 | 100 → 100 | 100 → 100 | 3.3 → **3.2 s** | 0 → 0 | 10 → 10 ms | 442 → 467 KiB |
| Home | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 | 0.7 → 0.7 s | 0 → 0 | 0 → 0 ms | 499 → **460 KiB** |
| Shop | Mobile | 91 → **95** | 100 → 100 | 100 → 100 | 100 → 100 | 3.5 → **2.9 s** | 0 → 0 | 10 → 20 ms | 416 → **360 KiB** |
| Shop | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 | 0.8 → **0.6 s** | 0 → 0 | 0 → 0 ms | 452 → **387 KiB** |
| MALM product | Mobile | 92 → **93** | 100 → 100 | 100 → 100 | 100 → 100 | 3.3 → **3.2 s** | 0 → 0 | 30 → **10 ms** | 360 → **330 KiB** |
| MALM product | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 | 0.8 → 0.8 s | 0 → 0 | 0 → 0 ms | 380 → **359 KiB** |

What helped: 2 font files instead of 4; product images sized per grid (`sizes`) instead of one width for all;
no per-card entrance animation; no looping animation. The mobile homepage is 25 KiB heavier because the hero now loads
three real photos instead of one. Mobile LCP (about 3 s under simulated slow 4G) is held back mostly by the photo
sizes; better-compressed photos at 1600 px would help more than code changes.

Accessibility beyond Lighthouse: the menu, filter drawer and photo viewer are native `<dialog>`s (Escape closes them);
variant options and the gallery support arrow keys; there is a visible 2 px focus ring; contrast values are in
DESIGN-SYSTEM.md; reduced motion is respected. These were tested with scripted clicks in a real browser, **not** by
hand with a keyboard or a screen reader (NVDA/VoiceOver). Both are recommended before launch.

## 6. What still needs real business data

- **Prices**: every product shows "Ask for price". Add AED prices in `src/data/products.ts`; the cards, product pages
  and Product structured data use them automatically.
- **Frame measurements**: the site only knows mattress sizes, so pages say "ask us for the exact measurements".
- **Better photos** (most matter most): see the photo brief below.
- **Delivery facts**: areas, fees and timings. Until confirmed, the site only says "ask us".
- **Email, Instagram and your own Google Business Profile**: hidden until set in `src/config/site.ts`.
- **Ottoman bed**: confirm whether the frame is IKEA. The category tile already avoids claiming it is.

**Photo brief** (phone camera is fine):
1. Daylight, lights off, from a corner at bed height, the whole item in frame, landscape and portrait.
2. Clear the room behind the item; plain walls photograph best.
3. One close-up each of the headboard, a corner, drawers or storage, and the mattress label.
4. Any marks or wear, photographed honestly.
5. At least 1600 px on the long side. Most current photos are 650–900 px, which is soft on large screens.
6. A real room photo for the hero if you have one you own.

## 7. Future architecture (recommended, not built)

The current data model already separates presentation from inventory: products, variants, per-variant price and
availability, series and categories, with photos found from folders. To grow:

- **Up to about 100 products**: keep `products.ts`; add an optional `salePrice`, `dimensions` and `stock`
  per variant; add search once there are about 40 products.
- **Hundreds or more**: move the product data to a headless CMS or a small database (for example Sanity, or Supabase with
  an admin screen), keep the same `ResolvedProduct` shape so the components do not change, and use Next.js revalidation
  instead of rebuilds.
- **Images**: move to a CDN-backed store when the photo count grows.
- **Enquiries**: log WhatsApp click events (already sent to `dataLayer`) in GA4 and connect a WhatsApp Business inbox
  or CRM.
- **Checkout**: add payment only when prices and stock are reliable; WhatsApp remains the default.
- **Arabic**: Next.js i18n routing with `/ar` paths, `dir="rtl"`, and an Arabic-capable font pairing.

## 8. Files changed

45 modified files (1,123 insertions, 732 deletions) plus 3 new files: `src/components/ui/PageHeader.tsx`, `DESIGN-SYSTEM.md`
and this report. `seo-audit/TRADEMARK-RISK-STATUS.md` is also untracked; it was written earlier and is not part of the
redesign.

- Styles and layout: `globals.css`, `layout.tsx` (fonts, theme colour)
- Shared UI: `button.ts`, `Container`, `SectionHeading`, `PageHeader` (new), `EmptyState`, `WhatsAppButton`,
  `WhatsAppFloatingButton`, `ContentBlocks`, `ImagePlaceholder`, `ContactForm` (token names only)
- Layout: `Header`, `NavLinks`, `MobileMenu`, `Logo`, `Footer`
- Home: `Hero`, `Sections`, `CollectionCard`, `app/page.tsx`
- Catalog: `CatalogPage`, `CatalogView`, `FilterOptions`, `FilterSidebar`, `FilterDrawer`
- Product: `ProductCard`, `ProductGrid`, `ProductDetail`, `ProductGallery`, `OptionGroup`, `Badges`,
  `app/products/[slug]/page.tsx`
- Pages: about, contact, delivery-areas, guides, guide article, not-found
- Data/config: `site.ts`, `options.ts`, `guides.tsx`, `products.ts` (comment only), `types/product.ts` (comment only)
- Docs: `IMAGE-GUIDE.md`, `OWNER-GUIDE.md` (one example line)

## 9. Local preview

```bash
git switch design/premium-furniture-storefront
npm run build
npx next start -p 3000
```

Open http://localhost:3000. Check the homepage, `/shop`, `/beds`, a product page, and the phone view (browser dev tools,
375 px). Stop with Ctrl+C. Run `git switch main` to go back.

## 10. Deployment readiness

Ready for your review. Nothing has been committed, pushed or deployed. To publish after you approve:

1. Commit on `design/premium-furniture-storefront` and push the branch.
2. Open a pull request into `main`. Vercel builds a preview link.
3. On the preview: homepage hero photos, filters on `/beds`, a product's colour/size and WhatsApp message, and the phone menu.
4. Merge into `main`. Vercel deploys to Production.
5. Check the live homepage title and H1 are still "IKEA Used Furniture".

No Search Console action is needed: titles, descriptions, URLs and structured data did not change.

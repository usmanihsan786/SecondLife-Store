# IKEA SEO Audit & Strategy — ikeiausedfurniture.ae

Prepared 22 Oct 2026. Covers the live site at https://www.ikeiausedfurniture.ae and its source code in this repository (Next.js 16, deployed on Vercel).

**Companion file:** [ikea-keyword-database.xlsx](ikea-keyword-database.xlsx) (a CSV copy is alongside it). Tabs: Read me · Keyword database · Top 100 · Clusters · URL map.

---

## 0. What this is based on, and what's missing

| Source | Used for | Status |
|---|---|---|
| The site's source code (`src/`) | Every page, title, schema rule, product and variant | ✅ Read in full |
| The live site (curl, as a normal browser and as Googlebot) | Status codes, redirects, robots.txt, sitemap, rendered titles, meta, H1/H2, canonicals, JSON-LD, image alt text, TTFB | ✅ 10 URLs checked |
| Google autocomplete for the UAE (`gl=ae`, English and Arabic) | Keyword discovery: what UAE users actually type | ✅ about 600 seed queries → 4,186 unique suggestions plus 28 phrases from the brief → 3,991 collected → **3,045 relevant keywords** after filtering and a manual review |
| Web search plus direct fetches of competitor pages | Competitor and marketplace landscape | ✅ Partial: the search tool is US-centred, so UAE SERP positions could not be observed |
| Search volume / keyword difficulty | Columns 7–8 of the database | ❌ No Google Keyword Planner, Semrush or Ahrefs access. The columns are left empty and marked; nothing is invented |
| Google Search Console | Phase 4 and columns 9–12 and 17 | ❌ Not provided yet. See §11 for exactly what to export |
| PageSpeed Insights / CrUX | Core Web Vitals | ❌ The public PSI API quota was exhausted today. Lab proxies measured instead (§7) |

**What autocomplete does and doesn't tell you.** If a phrase appears in UAE autocomplete, people in the UAE search for it. It doesn't tell you how often. Treat the database's *Priority score* as a way to rank work, not as a traffic forecast. When you get Keyword Planner volumes, paste them into column G and re-sort.

---

## 1. Executive summary — the 10 things that matter most

1. **The homepage title and description don't mention IKEA.** Google sees `SecondLife | Pre-Owned Furniture UAE` and `Quality preloved furniture in the UAE.` (37 characters). This is the single biggest quick win (`src/app/layout.tsx:36-41`).
2. **The site uses "preloved", but UAE searchers type "used" and "second hand".** Autocomplete returns plenty of *used ikea…* and *second hand ikea…* phrases and very few *preloved ikea…* ones (see the database). Headings, titles and copy should lead with **Used IKEA** and **Second-hand IKEA**. "Preloved" can stay as a brand-voice word.
3. **No prices, so no Product rich results or merchant listings.** Every product is `price: null`, so the Product JSON-LD has no `offers`. Google requires `offers`, `review` or `aggregateRating` for Product snippets, and real `offers` for merchant listings. Search Console will report these as invalid items. Adding real AED prices unlocks the price and "Used" condition in search results.
4. **Series and storage-bed pages can't be indexed.** `/shop?series=malm`, `/shop?series=brimnes` and `/shop?category=storage-beds` all canonicalise to `/shop`, and all show the same title and H1. There is no indexable page for *IKEA BRIMNES*, *IKEA HEMNES* or *storage / ottoman bed*.
5. **Category H1s are one word.** `Beds`, `Daybeds`, `Sofa Beds` and `Shop all furniture` each have a one-sentence intro. There is no unique content and no size or FAQ copy, so they are thin category pages.
6. **The "IKEA Hydraulic Ottoman Bed" needs checking.** Its own description says it's a hydraulic ottoman bed *sold with an IKEA mattress*, yet the name and the schema (`brand: IKEA`) say the frame is IKEA. If the frame isn't IKEA, the page misleads users and Google. It also has **zero photos**. The HEMNES bed page also has zero photos and every variant is sold out.
7. **A placeholder email is live.** `hello@example.com` appears in the footer and on the Contact page of every page. That's a trust signal problem for users and for Google's quality raters.
8. **No Organization, WebSite or BreadcrumbList structured data.** A breadcrumb is shown on product pages but isn't marked up.
9. **The real service area isn't stated anywhere.** The site says "Customers across the UAE" and "ask about delivery". You asked for targeting in Dubai, Sharjah, Ajman and Abu Dhabi, but the site gives Google no evidence it serves those places. One honest *Delivery & areas we serve* page fixes this without creating doorway pages.
10. **The competition is winnable.** Most UAE "used IKEA" demand is captured by classifieds (dubizzle, OpenSooq, Facebook Marketplace) and generic "used furniture buyer" sites. No UAE competitor I found has clean, model-specific IKEA pages with real photos per size and colour. That's exactly what your catalogue structure already supports.

---

## 2. Phase 1 — Website investigation

### 2.1 Site inventory (all indexable URLs, from the live sitemap)

| URL | Title (live) | H1 (live) | Notes |
|---|---|---|---|
| `/` | SecondLife \| Pre-Owned Furniture UAE | Quality Preloved IKEA Furniture in the UAE | No IKEA in title or description; description is 37 characters |
| `/shop` | Shop Preloved IKEA Furniture \| SecondLife | Shop all furniture | Also serves every `?series=`/`?category=` filter |
| `/beds` | Preloved IKEA Beds with Mattress \| SecondLife | Beds | Includes the ottoman bed |
| `/daybeds` | Preloved IKEA Daybeds \| SecondLife | Daybeds | |
| `/sofa-beds` | Preloved IKEA Sofa Beds \| SecondLife | Sofa Beds | Only one product (FRIHETEN) |
| `/about` | About Us \| SecondLife | Well-kept IKEA furniture, at a fairer price | Has a good "not affiliated with IKEA" disclaimer ✅ |
| `/contact` | Contact Us \| SecondLife | We are happy to help | Placeholder email |
| `/products/ikea-malm-bed` | IKEA MALM Bed with IKEA Mattress \| SecondLife | same | 16 variants, 12 available, 41 photos |
| `/products/ikea-brimnes-bed` | IKEA BRIMNES Bed with IKEA Mattress \| SecondLife | same | 3 sizes, all available, 8 photos |
| `/products/ikea-brimnes-daybed` | IKEA BRIMNES Daybed \| SecondLife | same | Available, 2 photos |
| `/products/ikea-hemnes-daybed` | IKEA HEMNES Daybed \| SecondLife | same | White and gray, available, 4 photos |
| `/products/ikea-hemnes-bed` | IKEA HEMNES Bed with IKEA Mattress \| SecondLife | same | **All sold out, 0 photos, sizes unconfirmed** |
| `/products/ikea-friheten-sofa-bed` | IKEA FRIHETEN Sofa Bed with Storage \| SecondLife | same | Gray and beige, available, 6 photos |
| `/products/ikea-hydraulic-ottoman-bed` | IKEA Hydraulic Ottoman Bed with IKEA Mattress \| SecondLife | same | **0 photos; check the frame brand** |

### 2.2 Real inventory — what can be targeted *now*

| IKEA range | Product | Sizes / colours listed | Status |
|---|---|---|---|
| **MALM** | Bed + IKEA mattress | 90×200 (single), 140×200, 160×200, 180×200 · white, black(-brown), brown; gray sold out | ✅ In stock |
| **BRIMNES** | Bed + IKEA mattress | Double 140, Queen 160, King 180 · white | ✅ In stock |
| **BRIMNES** | Daybed + 2 IKEA mattresses | white | ✅ In stock |
| **HEMNES** | Daybed + 2 IKEA mattresses | white, gray | ✅ In stock |
| **HEMNES** | Bed + IKEA mattress | queen/king · white, gray | ⚠️ Sold out |
| **FRIHETEN** | Sofa bed with storage | gray, beige | ✅ In stock |
| (unbranded?) | Hydraulic ottoman bed + IKEA mattress | 160, 180 · white, black | ✅ In stock, brand unverified |

**Targetable now:** used IKEA beds (MALM, BRIMNES), beds with mattress, single/double/queen/king sizes, IKEA daybeds (BRIMNES, HEMNES), daybed with 2 mattresses, IKEA sofa bed (FRIHETEN, with storage, corner), storage/ottoman/hydraulic beds.
**Future, only once stocked (P4):** PAX/KLEPPSTAD wardrobes, KALLAX/BILLY shelving, BESTÅ, KIVIK/KLIPPAN/EKTORP/VIMLE sofas, SONGESAND/IDANÄS/NEIDEN/SLATTUM beds, kids' furniture (KURA, SMÅSTAD, SUNDVIK), desks (ALEX, MICKE), dining.
**Informational support (P3):** IKEA bed and mattress sizes (UAE/EU cm vs single/double/queen/king), MALM vs BRIMNES vs HEMNES, daybed vs sofa bed, how to check a used IKEA bed, is second-hand IKEA worth it.

### 2.3 How customers buy (from the code)

1. Choose a colour and size on the product page.
2. Tap WhatsApp. A prefilled message is sent to +971 55 326 7566, including the exact variant URL.
3. You confirm availability and delivery.

There is no cart and no online payment. This matters for merchant listings, which need a landing page with price and a way to buy or enquire. WhatsApp enquiry is acceptable for Product snippets, but merchant listings expect a purchasable price, so treat merchant-listing eligibility as a "maybe".

---

## 3. Phase 7 — Technical SEO audit

| # | Area | Finding | Severity | Exact fix (this codebase) |
|---|---|---|---|---|
| T1 | Homepage title / meta | No IKEA, no "used", 37-character description | 🔴 Critical | `src/app/layout.tsx` → `title.default` and `description`; give `src/app/page.tsx` its own `title`/`description` (copy in §5) |
| T2 | Product structured data | No `offers` because no price → Product snippet invalid, merchant listing ineligible | 🔴 Critical | Enter real AED prices in `src/data/products.ts`. Then, in `productJsonLd` (`src/app/products/[slug]/page.tsx:72`), emit one `Offer` per variant with `price`, `priceCurrency: "AED"`, `itemCondition: UsedCondition`, `availability`, `url` (variant URL) |
| T3 | Brand accuracy | Ottoman bed: schema `brand: IKEA` and "IKEA" in the name while the copy implies only the mattress is IKEA | 🔴 Critical (trust) | Check the frame. If it isn't IKEA, rename it "Hydraulic Ottoman Storage Bed with IKEA Mattress", change the slug to `/products/hydraulic-ottoman-storage-bed` with a 301, and set `brand` to the real maker or omit it |
| T4 | Indexable series / storage pages | `?series=` and `?category=storage-beds` canonicalise to `/shop` | 🟠 High | Add static routes `/storage-beds`, `/ikea-brimnes`, `/ikea-hemnes` (see §6) that reuse `CatalogPage` with a fixed filter and unique copy. Point `categories["storage-beds"].href` at `/storage-beds`. Update `ShopBySeries` links |
| T5 | Thin pages | HEMNES bed and ottoman bed have 0 photos; HEMNES bed is fully sold out with unconfirmed sizes | 🟠 High | Add real photos. Keep a sold-out page only if it will come back in stock; otherwise 301 it to `/beds` or keep it with a "notify me on WhatsApp" CTA. Never let an empty page sit in the index |
| T6 | Placeholder data | `hello@example.com` on every page | 🟠 High | `src/config/site.ts` → `email`; add `instagramUrl` if you have one |
| T7 | Organization / WebSite schema | None | 🟠 High | Add a JSON-LD script in `layout.tsx`: `Organization` (or `FurnitureStore` if you have premises) with name, url, logo, telephone, `areaServed` (only emirates you really serve), `sameAs` (Instagram/Google Business Profile) |
| T8 | BreadcrumbList schema | Visual breadcrumb only | 🟡 Medium | Emit `BreadcrumbList` next to the Product JSON-LD in the product page |
| T9 | Category H1s and copy | One-word H1, one-line intro | 🟠 High | Add `h1`/`intro`/`seoContent`/`faq` props to `CatalogPage` (copy in §6) |
| T10 | Product title pattern | `IKEA MALM Bed with IKEA Mattress \| SecondLife`: no "Used", no sizes for multi-size products, no UAE | 🟡 Medium | Add an explicit `seoTitle` field per product (see §7) |
| T11 | Redirect chain | `http://ikeiausedfurniture.ae` → `https://ikeiausedfurniture.ae` → `https://www…` (2 hops) | 🟡 Medium | In Vercel → Domains, set the apex to redirect straight to `https://www.ikeiausedfurniture.ae` (308). HSTS is already on ✅ |
| T12 | Link-preview image | Homepage OG image is the 1254×1254 logo PNG (490 KB) | 🟢 Low | Use a 1200×630 photo of real stock for `/`; product pages already use product photos ✅ |
| T13 | Sitemap | Valid, 14 URLs, no `lastmod` | 🟢 Low | Add `lastModified` (for example from a per-product `updatedAt`). Add new pages automatically |
| T14 | robots.txt | `Allow: /` plus sitemap ✅ | — | Optional: `Disallow: /*?color=` is **not** needed; variant URLs canonicalise correctly ✅ |
| T15 | Canonicals | Self-referencing and absolute on every page ✅ | — | Keep. The homepage canonical has no trailing slash; that's fine and consistent |
| T16 | 404 | Real 404 status ✅ | — | — |
| T17 | JavaScript rendering | Pages are prerendered (`x-nextjs-prerender: 1`); titles, H1s, copy, product links and JSON-LD are all in the initial HTML ✅ | — | Variant switching is client-side. That's fine, because the canonical is the base product |
| T18 | Image alt text | Product photos have descriptive alt (`IKEA MALM Bed…, White, 140 × 200 cm, photo 1 of 3`) ✅. Collection cards use `alt=""` (decorative, acceptable). Hero alt is generic | 🟢 Low | Add "used" to `variantImageAlt`: "Used IKEA MALM bed, white, 140×200 cm…" |
| T19 | Image file names | `01.webp`, `02.webp`… | 🟢 Low | Optional. Google mostly uses alt text and context, so renaming folders is not worth the risk |
| T20 | Internal links | Homepage → featured products and series filters (which canonicalise to /shop); footer → categories. Product pages → series filter (non-indexable) and related items | 🟡 Medium | Link series labels to the new indexable hubs; add contextual links from guides (see §9) |
| T21 | `lang` / Arabic | `lang="en"`, no Arabic version. Arabic autocomplete demand exists (اثاث ايكيا مستعمل, سرير ايكيا…) | 🟢 Future | Only add Arabic with real human translation, `/ar/` routes and `hreflang` |
| T22 | Google Business Profile | None found linked | 🟠 High (local) | If you have a pickup point or showroom, create a GBP (service-area business is allowed). It's the main way to appear in the map pack for "used furniture Sharjah"-type searches |

### Core Web Vitals and speed

- The PageSpeed Insights API quota was exhausted today, so **no Lighthouse or CrUX numbers are reported here.** The site is too new to have CrUX field data anyway. Run https://pagespeed.web.dev/ on `/` and `/products/ikea-malm-bed` and add the scores to §11.
- Measured proxies: TTFB on a warm cache is **0.34–0.37 s** (Vercel edge, `sin1`). The very first uncached request took **11 s**, so watch for cold-cache spikes. JS is **192 KB gzipped across 9 files**, moderate for Next.js. The hero source image is 2.5 MB, but it's served through `next/image` (AVIF/WebP, sized) with `priority`, so that's fine.
- **Mobile:** the layout is responsive, with a viewport meta, 44 px tap targets and a sticky WhatsApp bar. No mobile-usability problems are visible in the code. Confirm in Search Console's Core Web Vitals report once there is data.

---

## 4. Phase 3 — Competitor and gap analysis

Positions and traffic below are **not** measured (no UAE SERP access). This is a qualitative map of who shows up for these intents, from web search and direct page inspection.

| Competitor | Type | IKEA coverage observed | Strength | Weakness / your gap |
|---|---|---|---|---|
| **IKEA.com/ae** | Official brand | Owns every model name (MALM, BRIMNES…), store, size and instructions query | Overwhelming authority on model terms | Sells **new** only. No UAE buy-back or second-hand programme was found on the UAE site (IKEA runs these in AU, CH, BE, FI and others). **The "used/second-hand + model" intent is open** |
| **dubizzle (uae.dubizzle.com)** | Classifieds | Thousands of beds; individual IKEA ads (e.g. SONGESAND queen with HYLLESTAD mattress, AED 1,400; HEMNES king 180×200, AED 1,100 — cached snapshots, dates unverified) | Huge domain, fresh listings, location filters | Listings expire, there are no curated model pages, quality varies, and you must deal with strangers. You win on *trust + consistent stock + delivery* |
| **OpenSooq (ae.opensooq.com)** | Classifieds, strong in Arabic | e.g. "IKEA FRIHETEN Corner Sofa Bed with Storage Dark Grey Used" | Arabic SERPs | Same weaknesses as dubizzle |
| **Facebook Marketplace / groups** | Social classifieds | Strong IKEA-specific groups | Large audience | Not indexable in the same way. Mostly a social channel for you, not an SEO rival |
| **Yahya Used Furniture (yahyausedfurniture.ae)** | Independent used shop (WooCommerce) | Many IKEA items (KIVIK, KALLAX, PAX doors, BESTÅ, HEMNES bed, ALEX, MICKE, BUSUNGE…), delivery to Dubai, Sharjah, Ajman and UAQ | Broad IKEA range; product names carry model names | Very long, auto-generated slugs ("…resembling the IKEA SKOGABY model…", "similar to the IKEA ANEBODA"), with no IKEA category or model hubs. Its pages hedge on authenticity, while yours say "genuine IKEA" |
| **Bu Faisal (bufaisal.ae)** | 5 showrooms in Ajman, "UAE's largest second-hand market" | General; IKEA not featured | Physical presence, local reputation, delivery claims | No IKEA focus |
| **DUF / Marjan / Umair / furniturebuyers.ae / jawaherfurniture etc.** | "Used furniture buyers" SEO sites | Generic; city doorway pages (e.g. "used furniture Sharjah") | Many city pages, older domains | Mostly *buy-from-you* intent, thin content. **Don't copy their doorway-page approach** |

**Gaps you can own:**
1. **One page per IKEA model + condition + size**, with real photos for every size and colour. Your data model already does this, and nobody else in the UAE does it cleanly.
2. **A UAE IKEA bed-size guide**: single 90, double 140, queen 160, king 180 × 200 cm, and which IKEA mattress fits which frame. This catches high-volume size queries (`ikea malm bed 180x200`, `ikea bed sizes`) and leads people to your stock.
3. **A guide to buying used IKEA furniture in the UAE**: checking a frame, what's included, delivery and assembly, mattress hygiene. Classifieds can't offer this kind of trust content.
4. **Comparisons for second-hand buyers**: MALM vs BRIMNES vs HEMNES; BRIMNES daybed vs HEMNES daybed; daybed vs sofa bed. No UAE site covers these.
5. **Honest pricing.** Showing AED prices (classifieds do, you don't) helps CTR and is required for rich results.

---

## 5. Homepage SEO recommendations

Primary cluster: **Used IKEA furniture (UAE / Dubai)**. Secondary: second-hand IKEA furniture, used IKEA beds, IKEA furniture for sale UAE, used IKEA furniture near me.

| Element | Current | Recommended |
|---|---|---|
| `<title>` | SecondLife \| Pre-Owned Furniture UAE | **Used IKEA Furniture in UAE – Beds, Daybeds & Sofa Beds \| SecondLife** |
| Meta description | Quality preloved furniture in the UAE. | **Genuine second-hand IKEA beds with mattress, daybeds and sofa beds in excellent condition – MALM, BRIMNES, HEMNES, FRIHETEN. Real photos of every size. Message us on WhatsApp.** |
| H1 | Quality Preloved IKEA Furniture in the UAE | **Used IKEA Furniture in the UAE, in Excellent Condition** |
| Eyebrow | Preloved · Genuine IKEA · UAE | Second-hand · Genuine IKEA · UAE |
| H2s | Shop by series / Featured furniture / Good furniture, honestly presented / … | **Shop used IKEA by range** (MALM, BRIMNES, HEMNES, FRIHETEN, linking to the indexable hubs and product pages) · **Used IKEA beds, daybeds and sofa beds** · **Why buy second-hand IKEA from us** · **How buying works** (pick → WhatsApp → delivery) · **Areas we deliver to** (only real emirates, linking to `/delivery`) · **Questions about used IKEA furniture** (4–5 FAQs) |
| New copy | — | About 250–400 words of genuinely useful text: what's in stock, how you check condition, what's included (mattresses), delivery and assembly, the independence disclaimer |
| Schema | none | `Organization`/`FurnitureStore` + `WebSite` |
| CTA | Shop / WhatsApp | Keep. Add "Ask for today's stock on WhatsApp" next to the FAQ |

---

## 6. Phase 6 — Site architecture and page specs

```
/                                   Used IKEA furniture in UAE (hub)
├── /beds                           Used IKEA beds with mattress
│   ├── /products/ikea-malm-bed
│   ├── /products/ikea-brimnes-bed
│   ├── /products/ikea-hemnes-bed   (sold out – see T5)
│   └── /storage-beds  NEW          Ottoman / hydraulic storage beds
│       └── /products/…ottoman…     (rename if not IKEA – T3)
├── /daybeds                        Used IKEA daybeds (2 mattresses)
│   ├── /products/ikea-brimnes-daybed
│   └── /products/ikea-hemnes-daybed
├── /sofa-beds                      Second-hand IKEA sofa beds
│   └── /products/ikea-friheten-sofa-bed
├── /ikea-brimnes  NEW              BRIMNES range hub (bed + daybed)
├── /ikea-hemnes   NEW              HEMNES range hub (bed + daybed)
├── /guides  NEW
│   ├── /guides/buying-used-ikea-furniture-uae
│   ├── /guides/ikea-bed-sizes-uae
│   ├── /guides/ikea-malm-vs-brimnes-vs-hemnes
│   ├── /guides/ikea-daybed-vs-sofa-bed
│   └── /guides/how-to-check-a-used-ikea-bed
├── /delivery  NEW                  Areas served and how buying works
├── /about  /contact
```

**Not recommended:** per-city pages (`/used-ikea-furniture-sharjah`, etc.) unless you have a real presence or stock that differs by city. They would be doorway pages. Cover locations on `/delivery`, in Organization `areaServed`, in GBP, and naturally in copy. No MALM/FRIHETEN hub pages either: those ranges have one product each, so the product page *is* the model landing page.

### Page specs

**`/beds` — Used IKEA Beds with Mattress**
- Main keyword: *used ikea bed* / *used ikea beds dubai*. Secondary: second hand ikea bed, ikea bed with mattress, ikea double/queen/king bed, ikea bed frame used, ikea single bed.
- Title: **Used IKEA Beds with Mattress – Single to King \| UAE \| SecondLife**
- Meta: **Second-hand IKEA MALM and BRIMNES beds sold with an IKEA mattress. Single 90, double 140, queen 160 and king 180 cm. Real photos of each bed – ask on WhatsApp.**
- H1: **Used IKEA Beds with Mattress**
- H2/H3: Shop by size (Single 90×200 · Double 140×200 · Queen 160×200 · King 180×200, each linking to a filtered view) · Shop by range (MALM · BRIMNES · HEMNES · Storage beds) · What's included with every bed · How we check used beds · FAQ (Do the beds come with a mattress? Which sizes fit which IKEA mattress? Do you deliver and assemble? Are these genuine IKEA?)
- Schema: `ItemList` of products, plus `FAQPage`. FAQ rich results are now limited to government and health sites, but the markup is harmless and the content helps users.
- CTA: "Tell us your size on WhatsApp"

**`/daybeds` — Used IKEA Daybeds**
- Main: *ikea daybed* (+ used / dubai / with mattress). Secondary: brimnes daybed, hemnes daybed, ikea day bed with 2 mattresses, daybed dubai.
- Title: **Used IKEA Daybeds with 2 Mattresses – BRIMNES & HEMNES \| UAE**
- Meta: **Second-hand IKEA BRIMNES and HEMNES daybeds, each with two IKEA mattresses. A sofa by day, a single or double bed at night. Ask on WhatsApp.**
- H1: **Used IKEA Daybeds with Two Mattresses**
- H2: BRIMNES vs HEMNES daybed (short comparison, linking to the guide) · Who a daybed suits (guest rooms, kids, studios) · What's included · FAQ

**`/sofa-beds` — Second-hand IKEA Sofa Beds**
- Main: *ikea sofa bed* (+ used / dubai). Secondary: friheten sofa bed, ikea corner sofa bed with storage, sleeper sofa.
- Title: **Used IKEA Sofa Beds – FRIHETEN with Storage \| UAE \| SecondLife**
- H1: **Second-hand IKEA Sofa Beds**
- H2: FRIHETEN in gray and beige · Measurements · Bed mode and storage (your own photos) · Daybed or sofa bed? (link) · FAQ

**`/storage-beds` (NEW)**
- Main: *ottoman bed dubai*, *hydraulic bed dubai*, *storage bed*. If an IKEA storage bed such as MALM with storage boxes ever comes in, add it here.
- Title: **Used Hydraulic Ottoman Storage Beds with IKEA Mattress \| UAE**
- H1: **Ottoman Storage Beds with Mattress**. Don't put IKEA in it unless the frames are IKEA.

**`/ikea-brimnes` and `/ikea-hemnes` (NEW range hubs)**
- Main: *ikea brimnes* / *ikea hemnes* (+ used, dubai). They gather the bed and daybed. Content: range description in your own words, sizes you stock, condition, links to both products.
- Title: **Used IKEA BRIMNES Beds & Daybed \| UAE \| SecondLife** (HEMNES: same pattern)

**`/delivery` (NEW)**
- Main: *used ikea furniture delivery dubai/sharjah/ajman*. Content: emirates you really deliver to, rough timing and fees (only if true), assembly, how WhatsApp ordering works, payment methods.
- **I need you to confirm which emirates you serve.** Nothing about locations should be published until you do.

**Guides** — see §9.

---

## 7. Product-page SEO recommendations

Pattern (add a `seoTitle` field in `products.ts` so you control it):

| Product | Recommended title | H1 | Priority additions |
|---|---|---|---|
| MALM bed | **Used IKEA MALM Bed with Mattress – 90, 140, 160, 180 cm \| UAE** | Used IKEA MALM Bed with IKEA Mattress | Size table per variant (your measured cm, mattress model if known), colour names as IKEA uses them (white, black-brown, brown stained ash veneer – check your stock), "MALM low vs high frame" note if relevant, price |
| BRIMNES bed | **Used IKEA BRIMNES Bed with Mattress – Double, Queen, King \| UAE** | Used IKEA BRIMNES Bed with IKEA Mattress | Mention headboard and storage drawers *only if your units have them* |
| BRIMNES daybed | **Used IKEA BRIMNES Daybed with 2 Mattresses \| UAE** | Used IKEA BRIMNES Daybed with 2 Mattresses | Say whether drawers are included; give single and extended bed sizes from your own measurements |
| HEMNES daybed | **Used IKEA HEMNES Daybed with 2 Mattresses – White & Gray \| UAE** | Used IKEA HEMNES Daybed with 2 Mattresses | Same as BRIMNES |
| FRIHETEN | **Used IKEA FRIHETEN Corner Sofa Bed with Storage – Gray & Beige** | Used IKEA FRIHETEN Sofa Bed with Storage | Say *corner* or *3-seat* only if accurate. Add bed-mode dimensions and photos |
| HEMNES bed | **Used IKEA HEMNES Bed with Mattress – Queen & King \| UAE** | — | Fix photos and sizes first (T5) |
| Ottoman | see T3 | — | Fix brand claim and photos first |

Every product page should also have:
- A **price** (or a "from AED x" price).
- A **"Condition details"** block per variant (the code already supports `variantDescription`).
- **What's included**, **dimensions** (measured, not copied from IKEA), and **delivery and assembly** information.
- A short FAQ: genuine IKEA? mattress condition and cleaning? delivery areas?
- Breadcrumb schema.
- Variant-level Offers.
- Copy written from your own inspection. **Don't paste IKEA's product text.**

Suggested Product JSON-LD shape once prices exist (one Offer per available variant):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Used IKEA MALM Bed with IKEA Mattress",
  "brand": { "@type": "Brand", "name": "IKEA" },
  "image": ["…real photos…"],
  "offers": [{
    "@type": "Offer",
    "url": "https://www.ikeiausedfurniture.ae/products/ikea-malm-bed?color=white&size=160x200",
    "price": "<real AED price>",
    "priceCurrency": "AED",
    "itemCondition": "https://schema.org/UsedCondition",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "SecondLife" }
  }]
}
```

Never add `aggregateRating` or `review` unless the reviews are real and collected on your site.

---

## 8. Phase 2 and 5 — Keyword research results

**Database:** 3,045 relevant keywords: **P1 192 · P2 1,209 · P3 376 · P4 1,268**. The workbook's *Excluded* tab lists 875 more (official IKEA store and support intent, foreign markets, irrelevant). There are 177 clusters. Open `ikea-keyword-database.xlsx` → *Clusters* and *URL map*.

### What the autocomplete data shows (UAE)

- **Used vs preloved:** among the UAE suggestions, 341 contain *used*, 291 contain *second hand / secondhand / 2nd hand*, 15 contain *pre-owned* and only 10 contain *preloved*. Lead with **used** and **second hand**.
- **UAE location modifiers** in relevant keywords: Dubai 184, UAE 54, Sharjah 40, Near me 38, Abu Dhabi 30, Ajman 14, Al Ain 10. Dubai dominates. Sharjah, Abu Dhabi and Ajman exist as "ikea used furniture sharjah / abu dhabi / ajman (price / online / dubizzle)" patterns. This is evidence for a `/delivery` page and location mentions in copy, **not** for city pages.
- **Model suggestion depth** (suggestions mentioning each range): MALM 311, BRIMNES 356, HEMNES 334, FRIHETEN 278, PAX 47, KALLAX 47, KIVIK 42, BESTA 41, SONGESAND 33, BILLY 48. The four ranges you stock got extra A–Z seed expansions, so their counts are inflated and shouldn't be read as relative demand. What the data does show is the *shape* of each: MALM queries are mostly sizes (`ikea malm bed 180x200`, `160x200`, `size`), storage and drawers; BRIMNES and HEMNES split between bed and daybed; FRIHETEN centres on corner, storage, covers and dimensions.
- **Marketplace-intent queries exist** ("ikea used furniture abu dhabi dubizzle", "dubizzle ikea bed", "second hand bed for sale in dubai dubizzle"). These users want to browse used IKEA stock. Your category pages can compete if they show prices and real photos.
- **Seller-side demand:** "sell ikea furniture dubai", "ikea buy back uae", "does ikea buy back bed frames". Worth a page only if you buy from the public (§9 #7).
- **Arabic:** 76 relevant Arabic keywords (e.g. اثاث ايكيا مستعمل, سرير ايكيا). This is a future opportunity and needs proper Arabic pages.
- **Excluded:** official IKEA store intent (timings, Festival City, Yas, careers, customer service), assembly instructions and manuals, and foreign markets (Kuwait, KSA, UK, US and others were common in raw autocomplete).
- **Not stocked (P4: 1386 keywords):** PAX/KLEPPSTAD wardrobes, KALLAX/BILLY, BESTÅ, KIVIK/VIMLE/EKTORP/KLIPPAN sofas, SONGESAND/IDANÄS/NEIDEN/SLATTUM beds, kids' and office furniture. Build pages for these only when you have the stock.

### Top 100 keyword opportunities

The full table, with landing page and action for each, is in the **Top 100** sheet. The top 30:

| # | Keyword | Tier | Score | Landing page |
|---|---|---|---|---|
| 1 | used ikea malm bed delivery dubai | P1 | 100 | `/products/ikea-malm-bed` |
| 2 | used ikea malm bed dubai | P1 | 100 | `/products/ikea-malm-bed` |
| 3 | ikea used beds dubai | P1 | 98 | `/beds` |
| 4 | used ikea bed abu dhabi | P1 | 98 | `/beds` |
| 5 | used ikea bed ajman | P1 | 98 | `/beds` |
| 6 | used ikea bed sharjah | P1 | 98 | `/beds` |
| 7 | used ikea daybed abu dhabi | P1 | 98 | `/daybeds` |
| 8 | used ikea daybed sharjah | P1 | 98 | `/daybeds` |
| 9 | used ikea sofa bed abu dhabi | P1 | 98 | `/sofa-beds` |
| 10 | used ikea sofa bed dubai | P1 | 98 | `/sofa-beds` |
| 11 | سرير ايكيا مستعمل دبي | P1 | 98 | `/beds` |
| 12 | ikea brimnes bed frame used | P1 | 94 | `/products/ikea-brimnes-bed` |
| 13 | ikea brimnes bed used | P1 | 94 | `/products/ikea-brimnes-bed` |
| 14 | ikea brimnes daybed used | P1 | 94 | `/products/ikea-brimnes-daybed` |
| 15 | ikea brimnes used | P1 | 94 | `/ikea-brimnes` |
| 16 | ikea friheten sofa bed used | P1 | 94 | `/products/ikea-friheten-sofa-bed` |
| 17 | ikea friheten used | P1 | 94 | `/products/ikea-friheten-sofa-bed` |
| 18 | ikea friheten used sofa | P1 | 94 | `/products/ikea-friheten-sofa-bed` |
| 19 | ikea hemnes daybed for sale used | P1 | 94 | `/products/ikea-hemnes-daybed` |
| 20 | ikea hemnes daybed second hand | P1 | 94 | `/products/ikea-hemnes-daybed` |
| 21 | ikea hemnes daybed used | P1 | 94 | `/products/ikea-hemnes-daybed` |
| 22 | ikea malm bed 160x200 used | P1 | 94 | `/products/ikea-malm-bed` |
| 23 | ikea malm bed used | P1 | 94 | `/products/ikea-malm-bed` |
| 24 | ikea malm bed white used | P1 | 94 | `/products/ikea-malm-bed` |
| 25 | ikea malm queen bed used | P1 | 94 | `/products/ikea-malm-bed` |
| 26 | ikea malm single bed used | P1 | 94 | `/products/ikea-malm-bed` |
| 27 | second hand friheten | P1 | 94 | `/products/ikea-friheten-sofa-bed` |
| 28 | second hand ikea brimnes | P1 | 94 | `/ikea-brimnes` |
| 29 | second hand ikea brimnes bed | P1 | 94 | `/products/ikea-brimnes-bed` |
| 30 | second hand ikea friheten sofa | P1 | 94 | `/products/ikea-friheten-sofa-bed` |

---

## 9. Phase 8 — Topical authority and content strategy

Each guide must be written from your own experience: real photos from your stock, your measurements, your inspection checklist. Each one links to the matching category and product pages. Aim for 5 strong guides, not 50 thin ones.

| # | Cluster | Page | Main keyword(s) | Why it helps sales |
|---|---|---|---|---|
| 1 | Buying used IKEA in the UAE | `/guides/buying-used-ikea-furniture-uae` | where to buy used ikea furniture in dubai; is second hand ikea worth it; used ikea furniture uae | Captures top-of-funnel demand and builds trust (what's genuine, condition grades, delivery, mattresses) |
| 2 | IKEA bed and mattress sizes | `/guides/ikea-bed-sizes-uae` | ikea bed sizes; ikea mattress sizes; malm bed 180x200 size; queen vs king cm | Size queries are the biggest MALM autocomplete family. Link each size to the filtered stock |
| 3 | Model comparisons | `/guides/ikea-malm-vs-brimnes-vs-hemnes` | malm vs brimnes; malm vs hemnes; brimnes vs hemnes | Turns "which one?" research into a pick from your stock |
| 4 | Daybeds vs sofa beds | `/guides/ikea-daybed-vs-sofa-bed` | ikea daybed vs sofa bed; brimnes vs hemnes daybed; best ikea sofa bed | Helps buyers with small UAE apartments and guest rooms |
| 5 | Condition and inspection | `/guides/how-to-check-a-used-ikea-bed` | how to inspect used ikea bed; used mattress hygiene | Answers the main objection to second-hand. Explain your own check process |
| 6 (later) | Small UAE apartments | `/guides/ikea-furniture-for-small-apartments` | best ikea beds for small apartments; studio furniture dubai | Only after 1–5 perform |
| 7 (later) | Selling your IKEA furniture | `/sell-your-ikea-furniture` | sell used ikea furniture dubai; ikea buy back uae | **Only if you buy stock from the public.** Strong demand, and it's a supply channel |

**Don't:** mass-produce AI articles, copy IKEA's text, create a page per spelling (`ikia`, `ikeia`), buy links, or call yourself IKEA's official or authorised seller.

**Links (ethical):** UAE expat and home blogs that run "where to buy furniture" round-ups (for example The National's lifestyle round-ups), relocation companies, property-portal blogs (Property Finder, Bayut), sustainability and circular-economy writers in the UAE, and your own Instagram and GBP profiles. Pitch your sizing or buying guide as a resource.

---

## 10. Internal linking strategy

1. **Homepage →** each category, each range hub, the top 3 products, the guides hub, and `/delivery`.
2. **Category →** every product in it, the relevant range hub, the size guide, and the comparison guide.
3. **Range hub (BRIMNES/HEMNES) →** both products, the comparison guide, the parent category.
4. **Product →** its category (indexable), its range hub (replace the current `/shop?series=` link), the size guide, the delivery page, and 3 related products (already there).
5. **Guide →** the 2–4 most relevant products and categories, using descriptive anchors ("used IKEA MALM bed 160×200", not "click here").
6. **Footer →** add Storage Beds (indexable), Guides and Delivery.
7. **Breadcrumbs:** Home › Used IKEA Beds › IKEA MALM Bed. Use descriptive labels, not just "Beds".

---

## 11. Phase 4 and 10 — Search Console analysis and IKEA visibility dashboard

**Send me these exports** (Search Console → Performance → Search results → last 16 months → Export):
- Queries, Pages, Countries, Devices and Dates tabs.
- Also Indexing → Pages (the "Why pages aren't indexed" list) and Enhancements → Product snippets / Merchant listings (if shown).

I'll then fill columns 9–12 and 17 of the database and produce the 4–10 / 11–20 / 20+ position buckets, the high-impression low-CTR list, and an underperforming-pages list.

**Dashboard** (Looker Studio, free, connected to Search Console):

| Metric | How |
|---|---|
| IKEA-related clicks, impressions, CTR, avg position | GSC query filter, **custom regex**: `ikea\|ikia\|ikeia\|ikae\|malm\|brimnes\|hemnes\|friheten\|ايكيا` |
| Exclude own-brand searches | Separate series with regex `secondlife\|second life store\|ikeiaused` (keep "second hand" out of it) |
| Model visibility | One series per model: `malm`, `brimnes`, `hemnes`, `friheten` |
| Category visibility | `bed` (not `day ?bed\|sofa ?bed`), `day ?bed`, `sofa ?bed\|sleeper`, `ottoman\|hydraulic\|storage bed` |
| Location | `dubai`, `sharjah`, `ajman`, `abu dhabi`, `near me` |
| Long-tail coverage | Number of distinct IKEA-regex queries with ≥1 impression per month |
| Landing pages | Page report filtered to `/products/`, `/beds`, `/daybeds`, `/sofa-beds`, new hubs, `/guides/` |
| Indexed product pages | GSC Indexing report count vs sitemap (target: 100% of in-stock products) |
| Organic WhatsApp enquiries | Add GA4 (or Vercel Analytics custom events) and fire an event on WhatsApp button click with `page` and `variant`. Segment by `session source = google / organic`. **Right now no analytics are installed, so organic conversions can't be measured.** |
| Rich results | GSC → Product snippets valid items (target: all products once priced) |

---

## 12. Phase 9 — 90-day roadmap

| When | Page | Cluster | Issue | Fix | Priority | Success metric |
|---|---|---|---|---|---|---|
| **Days 1–7** | all | — | Placeholder email; no analytics | Real email in `site.ts`; GA4 + WhatsApp click event; verify GSC (Domain property) and submit the sitemap | P1 | GSC verified; WhatsApp events recorded |
| Days 1–7 | `/` | Used IKEA furniture UAE | Title/meta/H1 lack IKEA and "used" | Apply §5 title, meta, H1 and eyebrow | P1 | Homepage impressions for IKEA-regex queries ↑ within 4 weeks |
| Days 1–7 | Ottoman bed | Storage beds | Brand claim, 0 photos | Verify brand → rename and 301 if needed; add photos | P1 | No misleading brand claim; page has photos |
| Days 1–14 | all products | All P1 model clusters | No prices → invalid Product schema | Enter AED prices; per-variant Offers with UsedCondition | P1 | GSC Product snippets: valid items = number of products |
| Days 7–14 | all products | Model + used | Titles lack "Used" and sizes | `seoTitle` per §7; "Used" in H1 and alt text | P1 | CTR on product pages ↑ vs baseline |
| Days 7–21 | `/beds`, `/daybeds`, `/sofa-beds` | Category clusters | Thin, one-word H1 | §6 titles, H1s, 300–500 words, size links, FAQ | P1 | Category pages appear for "used ikea bed(s)" / "ikea daybed" queries |
| Days 14–30 | layout, products | — | No Organization/Breadcrumb schema; redirect chain | Add JSON-LD; fix the Vercel apex redirect | P2 | Rich Results Test passes; single-hop redirect |
| Days 14–30 | HEMNES bed | HEMNES | 0 photos, all sold out | Photograph it, or 301 to `/beds` if gone for good | P2 | No empty product pages in the index |
| **Days 31–45** | `/storage-beds` (new) | Ottoman/hydraulic | Not indexable | Static route + copy; update nav and footer | P2 | Indexed; impressions for ottoman/hydraulic/storage-bed queries |
| Days 31–45 | `/ikea-brimnes`, `/ikea-hemnes` (new) | BRIMNES, HEMNES | No range pages | Static hubs reusing CatalogPage | P2 | Indexed; range queries map here, not to /shop |
| Days 31–50 | `/delivery` (new) | Location intent | Service area not stated | Real emirates, process, payment | P2 | Impressions for "+ dubai/sharjah/ajman" modifiers |
| Days 40–60 | `/guides/ikea-bed-sizes-uae`, `/guides/ikea-malm-vs-brimnes-vs-hemnes` | Sizes, comparisons | No informational coverage | Write from your own measurements; link to stock | P3 | Guide impressions; clicks from guides to products (GA4) |
| Days 40–60 | products | — | Weak photos / descriptions | Bed-mode photos (FRIHETEN, daybeds), close-ups of condition, measured dimensions | P2 | Product-page engaged time and WhatsApp click rate ↑ |
| **Days 61–75** | Pages ranking 8–20 | from GSC | Page-two rankings | Expand content and internal links for those queries | P2 | Queries moving from 11–20 into the top 10 |
| Days 61–90 | High-impression, low-CTR pages | from GSC | Weak snippets | Rewrite titles and metas; show price and "Used" in title | P2 | CTR ↑ at the same position |
| Days 61–90 | guides 1, 4, 5 | Buying, daybed vs sofa bed, inspection | Remaining support content | Publish if guides 2–3 show traction | P3 | Long-tail IKEA query count ↑ |
| Days 61–90 | off-site | — | No links, no GBP | GBP (if eligible), Instagram linked via `sameAs`, 3–5 editorial pitches | P2 | Referring domains; GBP views and calls |
| Day 90 | all | — | — | Review the dashboard; add P4 categories only where inventory now exists | — | Decision log |

---

## 13. Open questions for you (they block some recommendations)

1. Which emirates do you really deliver to, and do you have a showroom or pickup location?
2. Is the hydraulic ottoman bed frame made by IKEA?
3. Can you publish prices (exact, or "from AED…")?
4. Do you buy used IKEA furniture from the public? If so, the "sell" cluster is worth a page.
5. Real email address and Instagram, plus any Google Business Profile.
6. Search Console access or exports (§11).

## 14. What I did *not* change

Nothing on the live site or in the source code has been modified. This folder (`seo-audit/`) is new and uncommitted. All code fixes above are proposals waiting for your approval.

---

### Sources consulted
- Live site and source code: https://www.ikeiausedfurniture.ae
- Google autocomplete (UAE) via `suggestqueries.google.com` (`gl=ae`, `hl=en` / `hl=ar`), 22 Oct 2026
- IKEA UAE: https://www.ikea.com/ae/en/ · IKEA buy-back in other markets, e.g. https://www.ikea.com/be/en/circular/buy-back/ and https://www.ikea.com/au/en/second-hand/
- dubizzle: https://uae.dubizzle.com/classified/furniture-home-garden/furniture/beds-bed-sets/ · https://dubai.dubizzle.com/classified/furniture-home-garden/furniture/beds-bed-sets/
- OpenSooq: https://ae.opensooq.com/ar/search/284877908
- Yahya Used Furniture: https://yahyausedfurniture.ae/ · Bu Faisal: https://bufaisal.ae/ · Dubai Used Furniture: https://dubaiusedfurniture.ae/en · furniturebuyers.ae: https://www.furniturebuyers.ae/used-furniture-in-sharjah.html
- The National, furnishing round-up: https://www.thenationalnews.com/lifestyle/home-garden/2023/08/02/buy-furniture-uae-shopping/
- Google Search Central: Product structured data, merchant listings, doorway pages, helpful content (developers.google.com/search)

# Used-IKEA SEO strategy: Business Profile, search research and audit of the SEO branch

Prepared 23 Oct 2026. Scope: buyers of **genuine used IKEA furniture in the UAE**. Nothing has been pushed, merged or deployed. No changes were made to the Business Profile.

Files: [used-ikea-keyword-master.xlsx](used-ikea-keyword-master.xlsx) (CSV alongside it) · competitor raw data in `competitor-profiles/` · earlier work in [IKEA-SEO-AUDIT.md](IKEA-SEO-AUDIT.md), [KEYWORD-PAGE-MAP.md](KEYWORD-PAGE-MAP.md) and [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md).

---

## 1. Skills used, and the tools I didn't have

| Skill (all from `coreyhaines31/marketingskills`, per `skills-lock.json`) | Version | Status | Used for |
|---|---|---|---|
| seo-audit (+ local-seo, profile-and-citations, pages-and-measurement references) | 2.2.2 | **Loaded and used** | Business Profile audit, map pack vs organic split, the 23-page audit, the no-doorway-pages decision |
| competitor-profiling | 2.1.4 | **Loaded and used** (alternative stack: no Firecrawl or DataForSEO) | Competitor quick scans; raw data saved; SEO metrics marked unavailable |
| analytics | 2.2.1 | **Loaded and used** | Tracking plan (§9): event names, UTMs, avoiding double counting |
| schema | 2.0.2 | **Loaded and used** | Product/Offer, Article and LocalBusiness guidance; FAQ rich results retired (May 2026) |
| programmatic-seo | 2.1.0 | **Loaded and used** | Decision **not** to build city pages or pages for models you don't stock |
| content-strategy, site-architecture, cro, copywriting, ai-seo | 2.1.4 / 2.1.0 / 2.0.3 / 2.3.1 / 2.10.1 | Installed and verified, **not loaded this round** | Will be used when the page copy, navigation and conversion work starts |

I checked the skill files for risky commands and found nothing suspicious.

**What I didn't have:**
- Keyword Planner, Ahrefs or Semrush, so there are **no search volumes or difficulty scores**.
- Search Console, so **no clicks, impressions or average positions**.
- Owner access to the Business Profile, so **none of the private search terms, calls or website clicks**.
- Firecrawl or DataForSEO, so **no competitor traffic or backlink figures**.

Everything below is labelled as either *observed* (a dated manual check) or *hypothesis*.

---

## 2. Google Business Profile audit

**Profile:** https://share.google/gXVPryfmEhJFmsG8R resolves to a Google entity (`kgmid /g/11kk441sjx`), checked 23 Oct 2026 from your browser with `hl=en, gl=ae`.

### 2.1 Public facts observed

| Field | Observed value | Website value | Match? |
|---|---|---|---|
| Name | **IKEA Used Furniture** | SecondLife | ❌ different |
| Primary category | Furniture store | — | — |
| Address | "6 – Dubai", map pin in **Al Quoz** (magicpin lists Al Quoz Industrial 1) | Not stated ("based in the UAE") | ❌ the site has no location |
| Phone | **052 190 2781** | +971 55 326 7566 | ❌ different |
| Website button | **Facebook page** `facebook.com/ikeausedfurniturebedsofa`, not ikeiausedfurniture.ae | — | ❌ **the profile doesn't link to the website** |
| Hours | Open 24 hours | — | ⚠️ see 2.3 |
| Attributes | "Available: Delivery" | "ask us about delivery" | ⚠️ the site is more cautious than the profile |
| Rating | **4.9★ from 92 reviews** (newest about a week old) | — | — |
| Photos | Cover image shows a stylised **"IKEA" wordmark** with "IKEA Used Furniture Dubai" | Site uses the SecondLife logo | ⚠️ trademark risk (2.4) |

**Is it the same business as the website?** I can't confirm this from public data. The name, phone and website link all differ, and the profile links to Facebook. You've said it's yours, and the Vercel team name (`ikeausedfurnitureae`) matches the Facebook handle style, but **Google has no public signal that connects the profile to ikeiausedfurniture.ae.** That missing connection is the single biggest finding of this round.

### 2.2 Why the profile probably brings orders (evidence and hypotheses)

| Signal | Evidence (23 Oct 2026) | Confidence |
|---|---|---|
| **Relevance: the name matches the query** | The profile is literally called "IKEA Used Furniture". It appeared in the map pack for **14 of 20** used-IKEA queries I ran, usually first: *used ikea furniture dubai / sharjah / ajman / abu dhabi / near me, second hand ikea furniture dubai, used ikea bed dubai, used ikea daybed dubai, ikea sofa bed used dubai, buy used ikea furniture uae, ikea bed with mattress used dubai, second hand ikea bed sharjah, used ikea wardrobe dubai, used ikea furniture with delivery dubai*. Google lets a business name influence local relevance, but keywords in a name are only allowed when they *are* the real-world name (see 2.4) | Observed. The cause is a hypothesis |
| **Prominence: reviews** | 4.9★ from 92 reviews, still arriving. The nearest IKEA-named rivals: "Ikea used Furniture store" 4.5★ (26), "Ikea 2nd hand furniture hub" 5.0★ (3). The biggest generic rival, "Used Furniture Buyer In Dubai", has 4.7★ (315) | Observed |
| **Distance** | Al Quoz pin, close to central and new Dubai | Observed. Its effect on other emirates is unknown, since ranking depends on where the searcher is |
| **Conversion path** | Call button, 24-hour hours, Delivery attribute, Facebook link | Observed |
| **What customers praise** (review text) | Delivery **plus installation** (most frequent), "excellent / like new" condition, speed ("4-hour turnaround"), named staff (Ejaz, Hassan, Najeeb), negotiable prices, Dubai→Abu Dhabi delivery | Observed (public reviews) |
| **What customers buy** (review text) | Beds (single, queen, **MALM queen with mattress**), **"sofa cum bed"** (FRIHETEN L-shape; also a review topic chip), sofas, a MALM side table | Observed |
| **Customer confusion** | Recent review: *"There is NO ikea shop at the location. Wasting time and money for taxi"* | Observed. Hours, pin and name together may suggest a walk-in IKEA shop |

What I **couldn't** see: the private **Performance** report (search terms, calls, website clicks, direction requests, messages). Please export these (Business Profile → Performance, last 6 months, plus screenshots of the search-terms list):
1. **Searches → "Searches breakdown"**: the exact search terms that showed your profile. This is the most valuable dataset for the website keyword map.
2. **Interactions**: calls, website clicks, directions, messages, bookings, by month.
3. **Views** by Search vs Maps and mobile vs desktop.

### 2.3 Profile issues to fix (recommendations only; nothing changed)

| # | Issue | Evidence | Recommendation | Needs your approval |
|---|---|---|---|---|
| G1 | The website field points to Facebook | Website button URL | Point it to `https://www.ikeiausedfurniture.ae/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing`. Keep Facebook in "Social profiles" | Yes |
| G2 | Phone differs from the website | 052 190 2781 vs 055 326 7566 | Pick **one** customer number and use it on both. If you need two, list both on the site's Contact page | Yes |
| G3 | "Open 24 hours" plus an Al Quoz pin, and a review complaining nobody was there | Review text | If customers **can** visit a staffed location, set real staffed hours and say "visits by appointment". If they **can't**, use the service-area setup and hide the address (Google's service-area guidance). Don't keep a walk-in look that sends people to an empty address | Yes |
| G4 | Primary category is the generic "Furniture store" | Panel | The competitors use **"Used furniture store"**, which describes the business more specifically. Consider it as the primary category, keeping "Furniture store" as secondary. Changing categories can affect rankings, so test cautiously and note the date | **Yes, change with care** |
| G5 | Products and services are empty or not visible | Panel | Add real products (MALM bed with mattress, BRIMNES daybed, HEMNES daybed, FRIHETEN sofa bed) with real photos and prices where possible, each linking to its site page with UTMs | Yes |
| G6 | Description not seen | Panel | Factual description: what you sell (genuine used IKEA beds, daybeds, sofa beds), delivery and installation (only if true), areas served, "independent, not affiliated with IKEA" | Yes |
| G7 | Review replies not observed | Review list | Reply to every review in your own words. Ask every real customer for a review with the plain review link. **No incentives, no filtering to happy customers only** | Yes (for sending) |
| G8 | Cover photo uses an IKEA-style wordmark | Photo | Replace it with real photos of your stock, team or van. Using IKEA's logo or lettering is the riskiest trademark use and could also be reported to Google | Yes |

### 2.4 The profile name "IKEA Used Furniture": compliance blockers
- **Google's rules** say the name must match the business's real-world name (signage, trade licence, stationery). If the trade licence says something else, Google can edit or suspend the profile, and competitors can "suggest an edit". **Don't change the name without approval.** Know that it's the most fragile part of your visibility.
- **Trademark:** the analysis in [REBRAND-RISK-AND-MIGRATION.md](REBRAND-RISK-AND-MIGRATION.md) applies even more here, because the profile combines the IKEA name with an IKEA-style logo image. **Consider getting legal advice soon,** because this profile is your main source of orders and losing it would hurt most.
- **Preserve what works:** I don't recommend renaming the profile. I recommend (a) legal advice, (b) removing IKEA logo imagery, and (c) making the website strong enough to stand on its own if the profile is ever renamed or suspended.

---

## 3. Live Google research (observed 23 Oct 2026)

I ran 20 used-IKEA queries plus 3 `site:` checks on google.com (`hl=en, gl=ae`) from your own browser, so they reflect your location. Rankings change with searcher location and time. Treat these as one dated snapshot, not averages.

**What Google shows for used-IKEA buying searches:**
1. **The map pack decides who gets contacted.** Your profile appeared in the pack for 14 of 20 queries, usually first. The other pack regulars are "Ikea used Furniture store" (4.5★, 26 reviews, *Used furniture store*, 055 706 8371), "Used Furniture Buyer In Dubai" (4.7★, 315 reviews), and in Abu Dhabi "Welcome Used Furniture" and "Al Thahani". Sharjah shows "Used furniture buying and selling sharjah".
2. **Organic results are dominated by marketplaces and social media:** Facebook groups ("IKEA Furniture 2nd Hand Market Dubai", 33.6K followers; "IKEA Second hand market", 10.3K), dubizzle IKEA brand filter pages, ikea.com (Last Chance / offers pages), plus a few resellers: usedfurnitureselluae.com, readymyspace.com, yahyausedfurniture.ae, and the wisemove.ae listicle.
3. **Where your website already shows organically** (approximate position in the top 10): *used ikea daybed dubai* (~6), *ikea bed with mattress used dubai* (~7), *used ikea malm bed dubai* (~8), *used ikea bed dubai* (~10). These are the **quick wins**: product-specific used queries where the site already ranks with old titles.
4. **The site is absent** for the head terms (*used ikea furniture dubai / uae / sharjah / ajman / abu dhabi, second hand ikea furniture dubai, near me*) and for *ikea friheten used* and *ikea sofa cum bed used dubai*.
5. **Indexing:** `site:ikeiausedfurniture.ae` returns only 5 URLs (home, beds, about, sofa-beds, shop), all with the old "Preloved … SecondLife" titles. **No product pages or `/daybeds` appear.** This is approximate; confirm with Search Console URL Inspection. It's the most important technical issue to verify.
6. **What searchers add to queries** (Google related searches, on nearly every SERP): **price**, **cheap**, **near me**, **dubizzle**, **online**, **for sale**, **with delivery**, plus emirate combinations. Price and delivery are the dominant extra intents.
7. **People Also Ask:** *Where can I buy second-hand IKEA furniture? · Does IKEA sell second-hand furniture? · Where to buy second hand furniture in Dubai / Abu Dhabi? · Where can I find used beds for sale in Sharjah? · Where can I buy discontinued IKEA furniture?*
8. **Arabic** (*اثاث ايكيا مستعمل دبي*): no map pack. Results are Instagram, dubizzle (Arabic), OpenSooq, and an Arabic Facebook group (8.1K). That's a real but separate opportunity that needs real Arabic pages.

---

## 4. Competitors and keyword gaps (competitor-profiling skill, quick scan)

No traffic or backlink data was available, so this table contains only observed facts.

| Competitor | Type | Used-IKEA coverage observed | Strength | Gap you can exploit |
|---|---|---|---|---|
| Facebook groups (33.6K, 10.3K, 8.1K Arabic) | Community marketplace | Rank #1–3 organically for head terms | Huge supply and freshness | No trust, delivery or condition guarantees. Your 92 reviews and delivery-plus-installation story beat them |
| dubizzle (IKEA brand filters per category) | Classifieds | Ranks for bed, sofa, wardrobe and dresser + "used" + city | Authority, volume, prices | Strangers, no delivery or installation. Compete with prices and service |
| **readymyspace.com** | "Logistics-enabled resale platform" | **Individual product pages for used IKEA items with AED prices**: MALM with 4 drawers from AED 425, HEMNES bed + mattress 795, BRIMNES bed + mattress 895, HEMNES daybed frame 495, FRIHETEN L-shape 495 | The closest organic match to your model; prices visible | No location or delivery info observed. Your edge: delivery plus installation, reviews, local presence |
| usedfurnitureselluae.com | Used-furniture seller | Title "Ikea Used Furniture Seller in Dubai, UAE"; ranks on most head terms | Exact-match title | **The site was unreachable on 23 Oct 2026** (connection refused), so its rankings may fade |
| yahyausedfurniture.ae | WooCommerce used shop | Many IKEA items with long auto-generated names | Breadth | Weak trust copy. Site also unreachable from this network today |
| wisemove.ae | Blog listicle "Best places to buy second hand furniture in Dubai" | Recommends FB groups, no IKEA shop | Ranks for head terms | **Link and mention opportunity:** ask to be added as an IKEA-specialist seller |
| ikea.com/ae | Official | Last Chance / offers pages rank for "used ikea …" | Authority | Sells new. Don't compete for generic IKEA terms |
| Rival profiles "Ikea used Furniture store", "Ikea 2nd hand furniture hub" | Map pack | Same naming tactic | — | You lead on reviews (92 vs 26 vs 3) |

Raw notes are in `seo-audit/competitor-profiles/`.

**Gap matrix (what to build, by evidence):**

| Gap | Evidence | Action | Priority |
|---|---|---|---|
| Prices on listings | Competitors show AED prices; "price" and "cheap" appear in related searches for nearly every query | Publish real prices or "from AED x". This unlocks Product rich results | P1 |
| Delivery plus installation as a stated service | #1 review theme; profile attribute "Delivery"; "with delivery" related searches | Once you confirm, state it on home, categories, products and `/delivery-areas` | P1 |
| "Sofa cum bed" wording | Review topic chip, customer wording, SERP | Add to `/sofa-beds` and the FRIHETEN title/H2/FAQ | P1 |
| Profile ↔ website connection | Profile links to Facebook; phone differs | G1 + G2 (§2.3) | P1 |
| Breadth (wardrobes, PAX, KALLAX, dressers) | 1,483 deferred keywords; profile in the pack for "used ikea wardrobe dubai" | Only when you have stock | P4 |
| Arabic | Arabic SERPs: no specialist seller | Later: real Arabic pages for the 4 stocked ranges | P4 |

---

## 5. Keyword database re-audit (3,045 → used-IKEA master)

File: [used-ikea-keyword-master.xlsx](used-ikea-keyword-master.xlsx), with 22 columns and the sheets you asked for: All researched · Priority purchase intent · GBP opportunities · Search Console quick wins · Product-model · Local UAE · Supporting content · Excluded or deferred · Keyword-to-page mapping · Top 100. Every row carries its source and date. Volume, difficulty and GSC columns explicitly say the data isn't available.

**Inputs (3,381 unique keywords):**
- The previous 3,045.
- A new UAE autocomplete harvest on 23 Oct: 344 used-IKEA seeds, about 700 suggestions.
- 76 Google related searches and People Also Ask questions.
- 20 observed SERPs.
- 8 phrases taken from customer reviews.

**Re-classification** against "Can this bring a buyer of genuine used IKEA furniture?":

| Class | Keywords | Treatment |
|---|---|---|
| Direct used-IKEA purchase intent | 648 | Main targets where stocked |
| Strong inferred used-IKEA intent (IKEA + for sale / dubizzle / للبيع) | 25 | Targets |
| Supporting used-IKEA buyer research (where to buy, sizes of stocked ranges, comparisons) | 318 | Guides and FAQs only |
| Adjacent used furniture, no IKEA (e.g. *used sofa bed dubai*) | 122 | Secondary only |
| **Ambiguous generic IKEA** (*ikea malm bed 180x200*, *ikea friheten*, …) | 2,113 | **Excluded from the roadmap.** These are mostly people shopping for new IKEA items |
| Official IKEA / new product (As-Is, Last Chance, store, returns, IKEA buy-back) | 63 | Excluded |
| Seller-side (*sell my IKEA furniture*) | 48 | Deferred: only if you buy from the public |
| Competitor brands | 6 | Excluded |
| Support tasks / unrelated | 38 | Excluded |

**Result: 721 keywords to target (P1 210 · P2 130 · P3 381).** 1,483 are deferred (mostly used-IKEA intent for items you don't stock, such as PAX, KALLAX, wardrobes, desks and kids' furniture) and 1,177 are excluded. **Most of the earlier 3,045 were generic IKEA searches.** The real used-IKEA buying market is a few hundred phrases, concentrated on: used/second hand + IKEA + {furniture, bed, sofa bed, daybed, MALM, HEMNES, BRIMNES, FRIHETEN} + {Dubai, Sharjah, Ajman, Abu Dhabi, near me} + {price, cheap, for sale, with delivery}.

**Scoring (transparent):**
- Priority = 0.40 × purchase intent + 0.25 × inventory match + 0.15 × evidence strength + 0.10 × visibility opportunity + 0.10 × UAE location.
- P1 ≥ 80, P2 ≥ 62. The formula is in the *Read me* sheet.
- There are no volumes in it. When you get Keyword Planner or Search Console data, add it as a column and re-rank.

**Classification limits:** this is rule-based, with all P1/P2 rows reviewed by hand. Some foreign-place or odd rows may remain in P3 and the deferred list.

### Top 30 (from the *Top 100* sheet)

| # | Keyword | Priority | Score | Target page | Evidence |
|---|---|---|---|---|---|
| 1 | used ikea malm bed dubai | P1 | 100 | `/products/ikea-malm-bed` | site ~#8 observed |
| 2 | second hand ikea furniture dubai | P1 | 97 | `/` | map pack ✓ · autocomplete |
| 3 | used ikea furniture abu dhabi | P1 | 97 | `/delivery-areas` | map pack ✓ · autocomplete |
| 4 | used ikea furniture ajman | P1 | 97 | `/delivery-areas` | map pack ✓ |
| 5 | used ikea furniture dubai | P1 | 97 | `/` | map pack ✓ · autocomplete |
| 6 | ikea bed with mattress used dubai | P1 | 95 | `/beds` | map pack ✓ · site ~#7 |
| 7 | ikea used furniture sharjah | P1 | 95 | `/delivery-areas` | autocomplete · related |
| 8 | used ikea bed dubai | P1 | 95 | `/beds` | map pack ✓ · site ~#10 |
| 9 | used ikea daybed dubai | P1 | 95 | `/daybeds` | map pack ✓ · site ~#6 |
| 10 | used ikea furniture uae | P1 | 95 | `/` | SERP |
| 11 | used ikea furniture near me | P1 | 93 | `/` | map pack ✓ |
| 12 | buy used ikea furniture uae | P1 | 92 | `/` | map pack ✓ |
| 13 | ikea sofa bed used dubai | P1 | 92 | `/sofa-beds` | map pack ✓ |
| 14 | second hand ikea bed sharjah | P1 | 92 | `/beds` | map pack ✓ |
| 15 | used ikea furniture sharjah | P1 | 92 | `/delivery-areas` | map pack ✓ |
| 16 | used ikea furniture with delivery dubai | P1 | 92 | `/delivery-areas` | map pack ✓ (Delivery attribute) |
| 17 | ikea second hand dubai | P1 | 90 | `/` | autocomplete (2 harvests) |
| 18 | ikea second hand furniture abu dhabi | P1 | 90 | `/delivery-areas` | autocomplete |
| 19 | ikea second hand furniture dubai | P1 | 90 | `/` | autocomplete |
| 20 | ikea second hand uae | P1 | 90 | `/` | autocomplete · related |
| 21 | ikea sofa cum bed used dubai | P1 | 90 | `/sofa-beds` | SERP · review language |
| 22 | ikea used furniture abu dhabi | P1 | 90 | `/delivery-areas` | autocomplete |
| 23 | ikea used furniture abu dhabi dubizzle | P1 | 90 | `/delivery-areas` | autocomplete |
| 24 | ikea used furniture abu dhabi price | P1 | 90 | `/delivery-areas` | autocomplete |
| 25 | ikea used furniture ajman | P1 | 90 | `/delivery-areas` | autocomplete |
| 26 | ikea used furniture al quoz | P1 | 90 | `/` | autocomplete (your profile's area) |
| 27 | ikea used furniture dubai | P1 | 90 | `/` | autocomplete |
| 28 | ikea used furniture dubai near me | P1 | 90 | `/` | autocomplete |
| 29 | ikea used furniture dubai price | P1 | 90 | `/` | autocomplete |
| 30 | ikea used furniture sharjah price | P1 | 90 | `/delivery-areas` | autocomplete |

The *Top 100* sheet has 100 rows, because 340 keywords met the P1/P2 used-intent bar.

---

## 6. Keyword-to-page map (cleaned)

| Page | Status | Keywords | P1 / P2 / P3 | Primary | Main secondary keywords |
|---|---|---|---|---|---|
| `/` | Live (optimised on branch) | 170 | 88/43/39 | second hand ikea furniture dubai | used ikea furniture dubai; used ikea furniture uae; … near me; buy used ikea furniture uae; ikea second hand dubai |
| `/beds` | Live | 86 | 39/23/24 | ikea bed with mattress used dubai | used ikea bed dubai; second hand ikea bed sharjah; used ikea bed delivery abu dhabi; … king size |
| `/delivery-areas` | Branch | 66 | 33/0/33 | used ikea furniture abu dhabi | used ikea furniture ajman / sharjah; … with delivery dubai; ikea used furniture abu dhabi price |
| `/sofa-beds` | Live | 40 | 14/14/12 | ikea sofa bed used dubai | **ikea sofa cum bed used dubai**; … price; … for sale; used ikea sofa bed abu dhabi |
| `/daybeds` | Live | 27 | 12/7/8 | used ikea daybed dubai | used ikea daybed abu dhabi / sharjah; … price; ikea daybed second hand |
| `/products/ikea-malm-bed` | Live | 19 | 11/8/0 | used ikea malm bed dubai | … delivery dubai; … for sale; … price; ikea malm storage bed used |
| `/products/ikea-friheten-sofa-bed` | Live | 15 | 5/10/0 | ikea friheten used | second hand ikea friheten sofa; used ikea friheten sofa bed; … facebook marketplace |
| `/products/ikea-hemnes-daybed` | Live | 15 | 0/13/2 | ikea hemnes daybed used | second hand ikea hemnes daybed; … price dubai; … near me |
| `/ikea-hemnes`, `/ikea-brimnes` | Branch | 5 + 4 | — | second hand ikea hemnes / ikea brimnes used | range-level used queries |
| `/products/ikea-brimnes-bed`, `-daybed`, `/products/ikea-hemnes-bed`, `/storage-beds` | Live/branch | 4 / 2 / 5 / 2 | — | … used | model + used |
| Guides (sizes, buying, comparison, daybed vs sofa bed) | Branch | 128 / 100 / 28 / 5 | P3 only | — | Supporting research. **These don't drive orders directly**; keep them as support pages |

**No new pages are justified by this research.** The existing 23 URLs cover every used-IKEA cluster with stock behind it. The programmatic-seo skill's rules (unique value per page, no swapped-city templates) argue against city pages: one `/delivery-areas` page plus the profile covers the location intent.

---

## 7. Audit of the 23 pages on `seo/ikea-quick-wins` against used-IKEA intent

**What already aligns (keep):**
- Every commercial page leads with "Used / Second-hand IKEA …". No commercial page targets generic IKEA terms.
- Canonicals, indexability, sitemap, breadcrumbs and mobile layout passed the 23-URL audit (22 Oct).
- `/delivery-areas` is a single consolidated page, so there's no doorway risk.

**Corrections recommended (none applied yet; all low-risk):**

| # | Page(s) | Finding | Evidence | Fix | Priority |
|---|---|---|---|---|---|
| A1 | All | **The profile and website aren't connected** (name, phone and website link differ) | §2.1 | Profile website → site with UTM (G1); one phone everywhere (G2); add the profile and Facebook URLs to Organization `sameAs` | P1 |
| A2 | Products, categories | No prices | Competitors show prices; "price" related searches | Add real prices → per-variant `Offer` with `UsedCondition` (schema skill: Product needs `offers`) | P1 (blocked on you) |
| A3 | Home, categories, products, delivery page | Delivery and installation is the #1 reason customers praise you, but the site only says "ask us" | Reviews; profile attribute | Once confirmed, say "Delivery and installation across Dubai, Sharjah, Ajman, Abu Dhabi" (and any other areas) wherever "ask us" appears (`✏️ CONFIRM` spots) | P1 (blocked on you) |
| A4 | `/sofa-beds`, FRIHETEN | Missing the customers' own term **"sofa cum bed"** and "L-shape" | Review chips; SERP | Add "sofa cum bed" to the title/H1 support line, an H2 and the FAQ; mention "L-shape corner" only if accurate | P1 |
| A5 | Home | No social proof | 92 reviews at 4.9★ on the profile | Add "4.9 ★ from 92 Google reviews" with a link to the profile. **No review schema** (self-serving review markup isn't eligible) | P2 |
| A6 | Product pages | Not indexed (site: check) | §3.5 | After deploying: submit the sitemap and request indexing for each product. Add product links from the home "Featured" section (already there) and from guides | P1 |
| A7 | `/guides/ikea-bed-sizes-uae` | Generic IKEA informational title; competes with ikea.com | Its 128 mapped keywords are all P3 | Reframe for used buyers: "Buying a Used IKEA Bed? Sizes in cm Explained". Keep the URL | P3 |
| A8 | Guides | Article markup lacks `image` and `datePublished` | Schema skill | Add both from real data (a guide photo and the publish date) | P3 |
| A9 | Home / Contact | No location, while the profile shows Al Quoz | Profile | If customers can visit or collect in Al Quoz, say so on Contact (and in `areaServed`). If not, keep it hidden and fix the profile (G3) | P2 (blocked on you) |
| A10 | Ottoman bed, HEMNES bed | Brand claim unverified, no photos, sold out | 22 Oct audit | As before | P2 (blocked on you) |
| A11 | `/delivery-areas` | Reviews mention Dubai→Abu Dhabi delivery | Reviews | After confirmation, add real examples ("we deliver and install in Abu Dhabi; typical lead time …") | P2 (blocked on you) |

---

## 8. Business Profile ↔ website alignment (preserve what works)

1. **Don't change** the profile name, category, phone or address without a decision. The profile is your order engine.
2. **Connect them:** set the profile website to the site with UTM tags; add the profile and Facebook to `sameAs`; use one phone; describe the same services on both.
3. **Let the profile feed the site:** add Products in the profile that link to the matching product pages (with UTMs), use real photos, and include the same item names (*IKEA MALM bed with mattress*, *IKEA FRIHETEN sofa cum bed*).
4. **Let the site feed the profile:** link to the profile's review page from the site; add a "Find us on Google" link on Contact.
5. **Reviews:** ask every real buyer, reply to all, no incentives. Common themes (delivery, installation, condition) also become website copy, in your own words.

---

## 9. Lead and conversion tracking plan (analytics skill)

**Goal:** know which channel (profile vs organic website) produces enquiries and orders, without double counting.

| Event (GA4) | Trigger | Properties | Key event? |
|---|---|---|---|
| `whatsapp_click` | Any `wa.me` link | `cta_location` (product_inquiry, sticky_bar, floating, header, contact, guide), `product_slug`, `variant` | ✅ |
| `phone_click` | Any `tel:` link | `cta_location` | ✅ |
| `contact_form_submitted` | Contact form send (WhatsApp/mailto) | `method` | ✅ |
| `product_variant_selected` | Colour/size change | `product_slug`, `variant` | — |

- **UTMs** (lowercase, hyphens): profile website button → `utm_source=google&utm_medium=organic&utm_campaign=gbp-listing`. Profile products → `utm_campaign=gbp-product&utm_content={product-slug}`. Never put a phone number or name in a UTM.
- **Separating channels:** GA4 sessions from `gbp-listing` = profile → website. Untagged google/organic = website SEO. **Profile calls and messages** are counted only in the profile's Performance report. **Don't add them to GA4.**
- **WhatsApp attribution:** add a short non-personal source tag to the prefilled website message (for example "[web]"), so chats started from the website can be told apart from profile or Facebook chats. Log each real enquiry once in a simple sheet (date, product, source, sold yes/no). That sheet is the only place where enquiries become orders, and where duplicates get removed.
- **Implementation:** GA4 via `@next/third-parties` or a small gtag snippet, plus a click listener in the existing WhatsApp components. **Needs a GA4 measurement ID from you.** Consent banner: not legally required in the UAE in the way the EU requires it, but keep IP and PII out.

---

## 10. 30/60/90-day roadmap

| Days | Task | Cluster | URL | Problem / evidence | Implementation | Priority | Validation | Why it should help |
|---|---|---|---|---|---|---|---|---|
| 1–7 | Export profile Performance (search terms, interactions) and give Search Console access | all | — | No owner data yet | You export; I map the terms into the database | P1 | Search terms appear in the *GBP opportunities* sheet | Grounds every later decision in real demand |
| 1–7 | Connect profile ↔ site (G1, G2), add `sameAs` | Brand / near me | `/` | Website link → Facebook; phone mismatch | Profile edit (you) + one Organization schema edit | P1 | Profile shows the site link; GA4 sees `gbp-listing` sessions | Sends profile visitors to the product pages; consistent identity |
| 1–14 | Deploy the SEO branch after your review; submit the sitemap; request indexing | All P1 | 23 URLs | Only 5 old URLs indexed | Merge + deploy (your approval) | P1 | GSC Pages report: indexed count → 23 | Pages can't rank until they're indexed |
| 1–14 | Prices plus per-variant Offers | price / cheap / for sale | products | No prices; competitors show them | Prices in `products.ts` → Offer schema | P1 | Rich Results Test: Product valid | Matches the "price" intent; eligible for price rich results |
| 1–14 | Confirm delivery and installation → update copy | with delivery, emirate | home, categories, `/delivery-areas` | #1 review theme | Edit the `✏️ CONFIRM` spots | P1 | Copy matches the profile attribute | The main buying reason customers already give |
| 7–21 | "Sofa cum bed" and L-shape wording | sofa bed cluster | `/sofa-beds`, FRIHETEN | Review language | Title/H2/FAQ edits | P1 | GSC impressions for "sofa cum bed" | Matches how UAE customers say it |
| 7–21 | Quick wins: strengthen MALM, `/beds` and `/daybeds` copy for "… used … dubai / with mattress" | bed / daybed | those pages | Site already ~#6–10 | Intro and H2 with the exact phrases, internal links from home | P1 | Observed or GSC position moves into the top 5 | Page-two to page-one moves are the cheapest gains (seo-audit rankings-push) |
| 15–30 | GA4 + WhatsApp/phone events + lead sheet | — | sitewide | No measurement | Analytics plan §9 | P1 | DebugView shows events | Measures leads, not just rankings |
| 31–60 | Show reviews on site (link, no schema) | trust | `/`, products | 92 reviews unused on the site | Trust strip | P2 | Click-through to WhatsApp | Conversion rate |
| 31–60 | Profile Products and real photos; remove IKEA-logo imagery | local | Profile | Empty products; logo risk | Profile edits (you) | P2 | Products visible on the profile | Relevance plus risk reduction |
| 31–60 | Outreach: wisemove.ae and similar UAE "where to buy used furniture" lists | head terms | `/` | Listicle ranks; no IKEA specialist named | Polite email pitch (needs your approval before sending) | P2 | Mention or link earned | Authority for head terms |
| 31–60 | Ottoman / HEMNES bed fixes | storage / HEMNES | products | Photos, brand | Your info | P2 | Pages complete | Removes thin or doubtful pages |
| 61–90 | Re-rank the database with GSC and profile data; refine copy on the pages ranked 4–20 | all | mapped pages | — | Monthly loop | P2 | Positions and clicks per cluster | Data-driven iteration |
| 61–90 | Add stock categories only when stock exists (wardrobes / PAX, KALLAX) | deferred clusters | new product pages | 1,483 deferred keywords; profile already in the pack for "used ikea wardrobe dubai" | Products in `products.ts` | P3 | New pages indexed | Expands reach without fake inventory |
| 61–90 | Arabic pages for the 4 stocked ranges (real translation) | Arabic | `/ar/…` | Arabic SERPs lack specialists | i18n routes + hreflang | P3 | Indexed Arabic pages | New audience |

No ranking or traffic outcome is guaranteed.

---

## 11. Status and blockers

**Done this round** (all local, nothing pushed, merged or deployed):
- Skills verified; 5 loaded and used.
- Profile and reviews audited.
- 20 live SERPs plus 3 `site:` checks observed.
- Competitors scanned.
- New master database (3,381 researched, 721 targetable), keyword-to-page map, this strategy.

**No code changes this round.** I recommend implementing A3, A4, A5 and A8 plus the tracking on a new branch *after* you answer the blockers below.

**I need from you:**
1. **Profile Performance export** (search terms, calls, website clicks, messages, last 6 months).
2. **Search Console access** or exports (queries, pages, 28 days and 3 months).
3. Confirmation that **the profile is your business**, and which **phone** is primary.
4. **Delivery and installation**: areas, fees, lead times.
5. **Prices** (exact or "from").
6. Whether customers can **visit or collect in Al Quoz**, and real **opening hours**.
7. The ottoman frame brand; HEMNES bed plan; real email.
8. GA4 measurement ID (or permission to create the property).
9. Whether you'll get **legal advice** on the IKEA name and logo imagery used on the profile.

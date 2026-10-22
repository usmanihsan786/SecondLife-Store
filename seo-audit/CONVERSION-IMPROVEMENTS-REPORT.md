# Branch `seo/used-ikea-conversion-improvements`: change report

23 Oct 2026. Based on `seo/ikea-quick-wins`, local commit `c949ed0`.

**Not pushed, merged or deployed. The Google Business Profile has not been touched.** Store name, domain and URLs are unchanged, and the "IKEA Used Furniture" branding draft has not been published.

---

## 1. Exact changed files (11 files, +83 / −25)

| File | Change |
|---|---|
| `src/config/site.ts` | New `googleReviewsUrl` (your profile share link) and `facebookUrl` (left empty on purpose, see §5), both marked `✏️ CONFIRM` |
| `src/app/layout.tsx` | Homepage title and description; Organization `sameAs` built only from filled-in public profiles |
| `src/components/home/Hero.tsx` | H1 and sub-line; small "★ Read our customer reviews on Google" link under the buttons (only shown while `googleReviewsUrl` is set) |
| `src/app/contact/page.tsx` | "Google: Read our customer reviews" row in the contact list |
| `src/app/beds/page.tsx` | Title and intro target "used IKEA bed … Dubai" |
| `src/app/daybeds/page.tsx` | Title, description and intro target "used IKEA daybed Dubai" |
| `src/app/sofa-beds/page.tsx` | "Sofa cum bed" in title, description, intro and H2; corner/L-shape storage wording; new FAQ "Is a sofa bed the same as a sofa cum bed?" |
| `src/data/products.ts` | MALM `seoTitle` (adds Dubai); FRIHETEN `seoTitle` and short description ("L-shape sofa cum bed") |
| `src/data/guides.tsx` | New optional `published` and `image` fields; daybed-vs-sofa-bed guide mentions "sofa cum bed" (its `updated` date is now 23 Oct, the real edit date) |
| `src/app/guides/[slug]/page.tsx` | Article `datePublished` and `image` emitted **only** when real values are set (none are yet) |
| `src/app/sitemap.ts` | Product URLs now carry **image sitemap entries** for your real stock photos (45 images) |

**Deliberately not changed:**
- Product names (they feed WhatsApp messages and schema) and your own long descriptions.
- Prices, delivery claims, the phone number, the ottoman bed, and the main navigation.

## 2. Before and after metadata (11 fields across 7 pages)

| Page | Field | Before | After |
|---|---|---|---|
| `/` | title | Used IKEA Furniture in UAE – Beds, Daybeds & Sofa Beds \| SecondLife | **Used IKEA Furniture Dubai & UAE – Beds, Daybeds, Sofa Beds \| SecondLife** |
| `/` | description | Genuine second-hand IKEA beds with mattress, daybeds and sofa beds in excellent condition: MALM, BRIMNES, HEMNES, FRIHETEN. Real photos of our own stock. | **Second-hand IKEA beds with mattress, daybeds and sofa cum beds in excellent condition, for Dubai and the UAE: MALM, BRIMNES, HEMNES, FRIHETEN. Real photos of our stock.** |
| `/` | H1 | Used IKEA Furniture in the UAE, in Excellent Condition | **Used IKEA Furniture in Dubai & Across the UAE** |
| `/beds` | title | Used IKEA Beds with Mattress – Single to King, UAE \| SecondLife | **Used IKEA Beds with Mattress – Dubai & UAE, Single to King \| SecondLife** |
| `/daybeds` | title | Used IKEA Daybeds with 2 Mattresses – BRIMNES & HEMNES \| SecondLife | **Used IKEA Daybeds with 2 Mattresses – Dubai & UAE \| SecondLife** |
| `/daybeds` | description | … A sofa by day and a bed at night. Ask about availability in the UAE on WhatsApp. | **… A sofa by day and a bed at night, for Dubai and the UAE. Ask on WhatsApp.** |
| `/sofa-beds` | title | Used IKEA Sofa Beds – FRIHETEN with Storage, UAE \| SecondLife | **Used IKEA Sofa Beds & Sofa Cum Beds – FRIHETEN, UAE \| SecondLife** |
| `/sofa-beds` | description | Second-hand IKEA FRIHETEN sofa beds with storage, in gray and beige. … | **Second-hand IKEA FRIHETEN corner sofa cum bed with storage, in gray and beige. A sofa every day and a bed for guests, for Dubai and the UAE. Ask on WhatsApp.** |
| `/products/ikea-malm-bed` | title | Used IKEA MALM Bed with Mattress – 90, 140, 160, 180 cm, UAE \| SecondLife | **Used IKEA MALM Bed with Mattress, Dubai – 90 to 180 cm \| SecondLife** |
| `/products/ikea-friheten-sofa-bed` | title | Used IKEA FRIHETEN Sofa Bed with Storage – Gray & Beige \| SecondLife | **Used IKEA FRIHETEN L-Shape Sofa Cum Bed with Storage \| SecondLife** |
| `/products/ikea-friheten-sofa-bed` | description | Used IKEA FRIHETEN sofa bed with storage, in gray or beige. … | **Used IKEA FRIHETEN corner (L-shape) sofa cum bed with storage, in gray or beige. …** |

All titles are 44–75 characters and all descriptions 100–170 characters. There are no duplicates.

## 3. Updated keyword targets (from the 721-keyword shortlist and the 23 Oct SERPs)

| Page | Primary target | Secondary | Why (evidence) |
|---|---|---|---|
| `/daybeds` | used ikea daybed dubai | used ikea daybed dubai price / for sale; ikea daybed second hand; used ikea daybed sharjah / abu dhabi | Site observed at **~#6**; your profile is in the map pack |
| `/beds` | ikea bed with mattress used dubai | used ikea bed dubai; second hand ikea bed sharjah; used ikea king size bed | Observed at **~#7** and **~#10** |
| `/products/ikea-malm-bed` | used ikea malm bed dubai | used ikea malm bed dubai price / for sale; second hand ikea malm bed; ikea malm queen bed used | Observed at **~#8** |
| `/sofa-beds` | ikea sofa bed used dubai | **ikea sofa cum bed used dubai**; used ikea sofa cum bed; second hand ikea sofa bed uae; sofa cum bed with storage | Review language; related searches |
| `/products/ikea-friheten-sofa-bed` | ikea friheten used | used ikea friheten sofa cum bed; second hand ikea friheten; ikea friheten corner sofa bed used | Your photos show the corner/L-shape storage version |
| `/` | used ikea furniture dubai | second hand ikea furniture dubai; used ikea furniture uae; buy used ikea furniture uae; … near me | Head terms (see §4) |
| `/delivery-areas` | used ikea furniture sharjah / ajman / abu dhabi | … with delivery dubai; … price | Location intent; profile in the pack |

**"Sofa cum bed" research.** Google shows the same kind of results for "used ikea sofa cum bed", "second hand ikea sofa cum bed dubai", "ikea friheten sofa cum bed" and "second hand ikea sofa bed uae": IKEA FRIHETEN pages, dubizzle sofa-bed listings and Facebook posts. Related searches suggest "Sofa cum bed used" and "Sofa cum bed with storage". Autocomplete only returned "ikea sofa cum bed" and "second hand sofa cum bed". **Conclusion: it's a synonym with the same intent, so no separate page.** The phrase now appears naturally on `/sofa-beds`, the FRIHETEN page and the daybed-vs-sofa-bed guide.

## 4. Why the main "used IKEA furniture" searches show little website visibility

Evidence (23 Oct 2026); none of these positions are stable:
1. **The site is new.** It was first deployed on 1 Oct 2026, about 3 weeks ago, and Google is still discovering and evaluating it.
2. **The live site still has the old titles:** "SecondLife | Pre-Owned Furniture UAE", "Preloved IKEA …". All the "used IKEA" title work is on unmerged branches.
3. **Few discovery links.** Your profile links to Facebook, not the site; no other site links to it as far as I could see (the website's phone number and domain have no public footprint); the domain query "ikeiausedfurniture" returns competitors, not you.
4. **Strong incumbents:** Facebook groups, dubizzle and ikea.com hold the organic top 10 for head terms. The map pack (where your profile already wins) sits above them.
5. **Crawlability is not the problem.** On the live site, key pages return 200, have self-referencing canonicals, no `noindex`, robots allows everything, the sitemap is valid (14 URLs), and products are linked from the homepage.

## 5. Business Profile ↔ website: identity check and proposal (prepared only)

**Identity:**
- I **can't confirm publicly** that the profile and website are the same business.
- The name differs (IKEA Used Furniture vs SecondLife), and the phones differ: profile 052 190 2781, site +971 55 326 7566.
- The site's number has **no public footprint** on Google. The profile's number appears only in a directory that copies profiles.
- The profile's Facebook page (`facebook.com/ikeausedfurniturebedsofa`) showed **"This content isn't available at the moment"** to a logged-out visitor on 23 Oct.
- **Decided 23 Oct 2026:** the official phone and WhatsApp number is **+971 55 326 7566**. The website already used it everywhere; it's now set in one place (`PHONE` in `src/config/site.ts`). See §10 for the profile phone proposal.

**Proposal (for you to apply in Business Profile → Edit profile → Contact, when you decide):**

| Field | Current | Proposed |
|---|---|---|
| Website | Facebook page | `https://www.ikeiausedfurniture.ae/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing` |
| Social profiles | (Facebook used as the website) | Facebook in the **Social profiles → Facebook** field, if your profile shows it (Google is rolling it out). Make the page public first |
| Phone | 052 190 2781 | +971 55 326 7566 as primary (see §10; separate approval) |
| Name, category, address, hours | — | **Unchanged** (separate decisions, §6) |

The UTM parameters are safe for SEO: the homepage canonical is `https://www.ikeiausedfurniture.ae`, so the tagged URL won't be indexed separately.

**How the customer journey would change:**
- **Today:** a profile visitor who taps Website lands on Facebook. If they aren't logged in, they may see "content isn't available" and leave, or call instead.
- **After:** they land on the homepage, with photos, categories, reviews link and WhatsApp buttons.
- **Risk:** customers used to messaging you on Facebook might message less. **Mitigation:** keep Facebook in Social profiles and keep Messenger links on the Facebook page.
- **Calls and Messages from the profile** use separate buttons and are **not affected**.

**How to measure it (compare 4 weeks before and after, same weekdays):**
- In the profile's Performance report: website clicks, calls and messages, by month.
- In GA4 (once installed): sessions with `utm_campaign=gbp-listing`, their landing pages, and `whatsapp_click` / `phone_click` events from those sessions.
- Your lead sheet: orders where the customer said "found you on Google Maps", split by "via website" vs "called directly".
- **Stop or roll back** if profile calls plus messages drop noticeably with no matching rise in website WhatsApp leads.

## 6. Google indexing: how to verify (Search Console)

`site:` counts are rough estimates and not definitive. Verify like this:
1. **Add the property:** Search Console → Add property → **Domain** `ikeiausedfurniture.ae` (DNS TXT record at your domain registrar, or in Vercel DNS if Vercel manages it).
2. **Sitemaps:** Indexing → Sitemaps → submit `https://www.ikeiausedfurniture.ae/sitemap.xml`. After deploying the branch, resubmit. It should then show 23 URLs, with images.
3. **Page indexing report:** Indexing → Pages. Check *Indexed* vs *Not indexed*. For each *Not indexed* reason (e.g. "Discovered – currently not indexed", "Crawled – currently not indexed"), open the examples.
4. **URL Inspection, one URL at a time**, at least: `/`, `/beds`, `/daybeds`, `/sofa-beds`, `/products/ikea-malm-bed`, `/products/ikea-friheten-sofa-bed`, `/products/ikea-hemnes-daybed`, `/products/ikea-brimnes-bed`.
   - Note "URL is on Google" vs "not on Google", the last crawl date, and the user-declared vs Google-selected canonical.
   - Use **Test live URL** → **Request indexing** after deploying.
5. **Performance → Search results:** after 2–4 weeks, filter the query with the regex `used|second|2nd|pre.?owned|preloved|مستعمل` and check pages and positions.
6. Send me exports of Pages, Queries and Pages-performance, and I'll fill in the GSC columns of the keyword database.

## 7. Business information still needing your confirmation

1. **That the profile is yours.** The primary phone is now decided: +971 55 326 7566. You still need to decide what happens to 052 190 2781 on the profile (§10).
2. **Facebook page:** public URL to use (the current one isn't publicly visible).
3. **A full Google Maps profile URL** to replace the share link, if you prefer (Business Profile → Share → copy link).
4. **Delivery and installation:** areas, fees, lead times. Reviews and the profile's Delivery attribute suggest yes, but the site still says "ask us".
5. **Prices.**
6. **Visits or collection in Al Quoz**, and real opening hours (the profile says 24 hours).
7. **Ottoman bed frame brand; the HEMNES bed's future; real email.**
8. **Guide go-live dates** (set `published` after deployment) and any real guide photos.
9. **GA4 measurement ID.**
10. **Legal view** on the IKEA name and IKEA-style logo in the profile.

## 8. Local testing

Run each command in the project folder.

Switch to the branch:
```bash
git checkout seo/used-ikea-conversion-improvements
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

Then open http://localhost:3000 and check:
- `/`: the new H1 and the "Read our customer reviews on Google" link.
- `/sofa-beds`: "sofa cum bed" wording and the new FAQ.
- `/products/ikea-friheten-sofa-bed`, `/beds`, `/daybeds`, `/products/ikea-malm-bed`, `/contact`.
- `/sitemap.xml`: look for `<image:loc>` entries.

To see only this branch's changes in VS Code:
```bash
git diff seo/ikea-quick-wins..seo/used-ikea-conversion-improvements
```
Optional checks:
```bash
npm run lint
```
```bash
npx tsc --noEmit
```

**Verified here:**
- `tsc`, `eslint` and `next build` pass.
- All 23 sitemap URLs: 200, self canonical, no `noindex`, one H1, valid JSON-LD, titles and descriptions within limits, no duplicates.
- 27 internal links, none broken.
- No horizontal scroll at 375 px on the 8 changed pages.

## 9. Deployment risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Both branches deploy at once (this branch contains `seo/ikea-quick-wins`) | Certain if merged | Review both. Merging this branch alone deploys everything from both |
| Title changes cause short-term ranking movement on pages already at ~#6–10 | Possible | The changes keep the existing phrases and add "Dubai" and synonyms. Monitor the 4 quick-win queries weekly |
| The reviews link points to a share URL that could change | Low | Replace it with the full Maps URL (§7.3), or set `googleReviewsUrl: ""` to hide it |
| "Dubai & UAE" wording implies you serve those areas | Low | It invites customers and makes no delivery promise. Confirm the areas (§7.4) |
| The profile still links to Facebook after deployment | — | Apply §5 when you choose. The site works either way |
| The draft branding branch gets merged by mistake | Low | It stays local and separate (`draft/site-name-ikea-used-furniture`) |

## 10. Official phone number: website status and Business Profile proposal

**Website (commit `a762c59`):**
- `+971 55 326 7566` is the only business number in the code. It's typed once (`const PHONE` in `src/config/site.ts`). The displayed number, `tel:` links, `wa.me` links and the Organization `telephone` are all derived from it.
- No old number was present. A search of every branch found no 052 190 2781 or other business numbers. The only other numbers in the repo are the placeholder examples in `OWNER-GUIDE.md`, now updated to describe the single `PHONE` setting.
- The site has no LocalBusiness markup (only Organization), so there was nothing else to update.

**Verified on the production build (all 23 pages):**
- `tel:` links: only `tel:+971553267566`.
- WhatsApp: only `https://wa.me/971553267566`, both in links on the page and in the messages built when someone taps a button (general enquiry, and the product message with colour and link).
- JSON-LD `telephone`: only `+971553267566`.
- Displayed number: only `+971 55 326 7566`.

**Proposed Business Profile change (not applied; needs your approval and owner/manager access):**

| Field | Current | Proposed |
|---|---|---|
| Primary phone | 052 190 2781 | **+971 55 326 7566** |
| Additional phone | — | **052 190 2781**, for now, if you still answer it |

Why keep the old number as "additional":
- Customers who saved 052 190 2781, and directories that copied it (e.g. uaedays.vercel.app, magicpin), will still reach you.
- Google sees a gradual change instead of a hard switch.
- Remove it later once calls to it stop.

Risks and how to protect visibility and reviews:
- Changing the phone is a normal edit. **Reviews, rating and ranking history stay with the profile.** Google can, however, hold edits for review, and occasionally asks for re-verification after contact changes. Make the change from the owner account and don't combine it with name, category or address edits.
- For a few days some surfaces (Maps, Search, directories) may show different numbers. Keep both numbers answered during that time.
- Phone numbers aren't a strong ranking factor. Consistency between the profile and the website helps trust and makes the identity clear.

Measuring it:
- Profile Performance: calls per week, 4 weeks before vs after.
- Your WhatsApp: chats on +971 55 326 7566 that mention Google or Maps.
- Edit status: Business Profile shows "Under review" or "Published".

Order of operations once you approve:
1. Website link (§5).
2. Primary phone change.
3. Wait about 2 weeks, check calls.
4. Decide whether to drop the additional number.

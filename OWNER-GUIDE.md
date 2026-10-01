# Owner Guide

How to manage the website yourself. You only ever need to edit two files:

| What | File |
| --- | --- |
| Products, prices, colours, sizes, stock | `src/data/products.ts` |
| WhatsApp number, phone, email, business name | `src/config/site.ts` |
| The list of colours and sizes the site knows | `src/data/options.ts` |

After any change, rebuild and redeploy the site (`npm run build`, or push to your host if it builds automatically). While testing on your computer with `npm run dev`, changes appear on refresh.

---

## 1. Add a new product

Open `src/data/products.ts`. Copy a whole product block, from its `{` to its closing `},` and paste it inside the list. For example, a new daybed:

```ts
{
  id: "malm-daybed",                 // REQUIRED. Unique, lowercase, no spaces
  slug: "ikea-malm-daybed",          // REQUIRED. Unique. Becomes /products/ikea-malm-daybed
  name: "IKEA MALM Daybed",          // REQUIRED
  shortName: "IKEA MALM Daybed",     // optional. Name used in WhatsApp messages
  series: "malm",                    // REQUIRED. malm | brimnes | hemnes | friheten | ottoman
  category: "daybeds",               // REQUIRED. beds | daybeds | sofa-beds | storage-beds
  shortDescription: "Preloved MALM daybed in white.",   // REQUIRED. One line, used on search engines
  description: "WRITE MY DESCRIPTION HERE",               // REQUIRED. Shown on the product page
  condition: "Excellent condition",  // REQUIRED
  includes: ["IKEA MALM daybed frame", "2 IKEA mattresses"], // optional
  price: null,                       // REQUIRED. null shows "Contact for price"
  featured: false,                   // optional. true shows it on the homepage
  variants: [                        // REQUIRED. At least one
    { color: "white", imageFolder: "malm/white/daybed", availability: "available" },
  ],
},
```

Then create the photo folder (here `/public/images/products/malm/white/daybed/`) and add `01.webp`, `02.webp`…

A new series (e.g. "KURA") must first be added to `series` in `src/data/options.ts`, with a label and a short blurb. It then appears in the filters and the "Shop by series" section automatically.

## 2. Change a product price

In `src/data/products.ts`, find the product and change its `price` line:

```ts
price: 1200,          // shows "AED 1,200"
price: "AED 900 – 1,400",   // shows exactly this text
price: null,          // shows "Contact for price"
```

When sizes have different prices, give each variant its own `price`. A variant price overrides the product price, and product cards show "From AED …":

```ts
{ color: "white", size: "90x200",  imageFolder: "malm/white/90x200",  availability: "available", price: 650 },
{ color: "white", size: "160x200", imageFolder: "malm/white/160x200", availability: "available", price: 1100 },
```

The currency (`AED`) and the "Contact for price" wording are in `src/config/site.ts`.

## 3. Add another color

Each colour/size combination is one line in the product's `variants` list. To add Black to the BRIMNES bed, add lines like:

```ts
{ color: "black", size: "160x200", imageFolder: "brimnes/black/160x200", availability: "available" },
```

The colour must exist in `colors` in `src/data/options.ts`. To add a brand-new colour, add it there first:

```ts
oak: { label: "Oak", swatch: "#C8A47E" },   // swatch = the dot colour shown on the site
```

Filters and colour buttons update automatically.

## 4. Add another size

Same idea: add a variant line with the new `size`. Sizes must exist in `sizes` in `src/data/options.ts`:

```ts
"120x200": { label: "120 × 200 cm", short: "120 × 200" },
```

**HEMNES Queen and King:** their dimensions were not provided, so they use the sizes `queen` and `king`. Once you have measured them, either rename the labels in `options.ts`
(`queen: { label: "Queen (160 × 200 cm)", short: "160 × 200" }`), or change the HEMNES variants to use `"160x200"` / `"180x200"`. If you change the size keys, also rename their photo folders to match.

To show a friendly name under a size button (like "Queen"), use `sizeNames` on the product:

```ts
sizeNames: { "160x200": "Queen", "180x200": "King" },
```

## 5. Replace product photos

Photos live in `/public/images/products/<series>/<color>/<size>/`. Each variant's `imageFolder` says exactly which folder. Replace the files in that folder, keeping names like `01.webp`, `02.webp`. See **IMAGE-GUIDE.md** for every folder.

## 6. Add more photos

Just drop more files into the variant's folder: `05.webp`, `06.webp`, … The site lists every photo in the folder, sorted by filename, and `01` is the main photo. There is no list to update.

If you ever want to choose photos by hand instead, give the variant an `images` list. It then ignores the folder:

```ts
{ color: "white", size: "160x200", images: ["/images/products/malm/white/160x200/02.webp", "/images/products/malm/white/160x200/01.webp"], availability: "available" },
```

## 7. Mark one variant sold out

Find the variant line and change its availability:

```ts
availability: "sold-out"
```

The product stays visible. That option shows "Sold out", its WhatsApp button changes to "Currently sold out" with an "Ask about similar items" option, and the other options stay available.

## 8. Put it back in stock

```ts
availability: "available"
```

## 9. Mark an entire product sold out

Set `availability: "sold-out"` on every variant of that product. The product card shows a SOLD OUT badge, stays in the shop (listed after available items), and the product page explains that all options are sold out.

To remove a product from the site completely, delete its whole block (or a single variant line to remove just that option).

## 10. Change the WhatsApp number

Open `src/config/site.ts` and change:

```ts
whatsappNumber: "971501234567",
```

International format, digits only: country code `971`, then the number without the leading 0. No `+`, spaces or dashes. Every WhatsApp button on the site uses this one value.

## 11. Add my logo

Place your main logo here:

`/public/images/brand/logo.png`

A PNG with a transparent background works best. It is shown in the header, the mobile menu and the footer, always scaled to fit without stretching or cropping. Until it is added, a neutral "Your logo" placeholder is shown.

For a browser tab icon, replace `src/app/favicon.ico` with your own icon file.

## 12. Update phone and email

In `src/config/site.ts`:

```ts
phoneDisplay: "+971 50 123 4567",   // how it is shown
phoneLink: "+971501234567",         // used for tap-to-call
email: "hello@yourdomain.ae",
instagramUrl: "https://instagram.com/yourpage",   // leave "" to hide
name: "Your Business Name",
url: "https://www.yourdomain.ae",   // your live web address, used for search engines
```

## 13. Write your own product descriptions

Every product has its own `description` in `src/data/products.ts`, marked with ✏️. Replace the text between the quotes:

```ts
// ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
description:
  "WRITE MY DESCRIPTION HERE",
```

MALM, the BRIMNES bed, the BRIMNES daybed, the HEMNES daybed, the HEMNES bed, FRIHETEN and the Ottoman bed each have their own, so changing one never affects another. To start a new paragraph, type `\n\n` inside the text.

`shortDescription` (also marked ✏️) is the one-line summary used by Google and in link previews.

## 14. Add extra text for one exact item (optional)

Add `variantDescription` to a variant line. It appears under the main description only while that colour and size is selected:

```ts
{ color: "white", size: "160x200", imageFolder: "malm/white/160x200", availability: "available", variantDescription: "Small scratch on the left side panel, see photo 3." },
```

Leave it out and nothing extra is shown.

## Quick reference: one variant line

```ts
{ color: "black", size: "160x200", imageFolder: "malm/black/160x200", availability: "available", price: 1100 },
//  colour         size             photo folder                       stock: "available" or "sold-out"   optional price
```

---

## Placeholders still to replace

All in `src/config/site.ts`: `name`, `whatsappNumber`, `phoneDisplay`, `phoneLink`, `email`, `instagramUrl`, `url`.
Also: your logo, product photos, and prices (all currently `null`, shown as "Contact for price").

## Running the site

```bash
npm install        # once
npm run dev        # preview at http://localhost:3000
npm run build      # production build
npm start          # run the production build
```

The site is a standard Next.js app and can be hosted on Vercel, Netlify or any Node.js host.

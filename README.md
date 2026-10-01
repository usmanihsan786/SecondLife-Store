# Preloved IKEA Furniture UAE — Website

Catalog and WhatsApp-inquiry website built with Next.js, TypeScript and Tailwind CSS.

- **OWNER-GUIDE.md** — how to add products, change prices, mark items sold out, change contact details and add your logo.
- **IMAGE-GUIDE.md** — the exact folder for every product photo.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where things live

```
src/config/site.ts        Business details and WhatsApp number (placeholders marked)
src/data/products.ts      Every product and variant (colour, size, stock, price)
src/data/options.ts       Known colours, sizes, categories and series
src/lib/catalog.ts        Loads products and finds their photos on disk (server only)
src/lib/filters.ts        Shop filtering
src/lib/whatsapp.ts       WhatsApp links and messages
src/components/           Header, footer, product card, gallery, variant selectors, filters…
src/app/                  Pages: /, /shop, /beds, /daybeds, /sofa-beds, /about, /contact, /products/[slug]
public/images/            Logo, product photos, homepage images
```

Independent reseller of preloved furniture. Not affiliated with or endorsed by IKEA.

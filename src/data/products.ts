import type { Product } from "@/types/product";

/**
 * ALL PRODUCTS LIVE HERE. This is the only place products are defined.
 *
 * Quick reference (full instructions in OWNER-GUIDE.md):
 * - Price:        set `price` on the product, e.g. price: 1200   (null shows "Contact for price")
 * - Sold out:     set availability: "sold-out" on a variant
 * - Back in stock: set availability: "available"
 * - Photos:       put 01.webp, 02.webp … in /public/images/products/<imageFolder>/
 * - Description:  edit `description` on the product (marked ✏️ below)
 * - Card photo:   put a photo at the product's `cardImage` path, e.g. /public/images/cards/malm-bed.webp
 *                 (used on Featured, Shop and category cards; until it exists, the first variant photo is used)
 * - Extra text for one exact item: add variantDescription to that variant, e.g.
 *     { color: "white", size: "160x200", ..., availability: "available", variantDescription: "Small mark on the headboard." }
 */

const condition = "Excellent condition";

export const products: Product[] = [
  // ─── MALM ────────────────────────────────────────────────────────────
  {
    id: "malm-bed",
    slug: "ikea-malm-bed",
    name: "IKEA MALM Bed with IKEA Mattress",
    shortName: "IKEA MALM Bed", // used in WhatsApp messages
    series: "malm",
    category: "beds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved MALM bed frame with an IKEA mattress, in four colours and four sizes.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA MALM bed, sold together with an IKEA mattress. MALM has a clean, simple shape that sits well in most bedrooms. Choose a colour and size to see the photos for that exact bed, then message us to check availability.",
    condition,
    includes: ["IKEA MALM bed frame", "IKEA mattress"],
    sizeNames: { "90x200": "Single" },
    price: null, // PRICE: enter a number like 1200, or set a price on each variant below
    featured: true,
    cardImage: "/images/cards/malm-bed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "white", size: "90x200", imageFolder: "malm/white/90x200", availability: "available" },
      { color: "white", size: "140x200", imageFolder: "malm/white/140x200", availability: "available" },
      { color: "white", size: "160x200", imageFolder: "malm/white/160x200", availability: "available" },
      { color: "white", size: "180x200", imageFolder: "malm/white/180x200", availability: "available" },
      { color: "gray", size: "90x200", imageFolder: "malm/gray/90x200", availability: "sold-out" },
      { color: "gray", size: "140x200", imageFolder: "malm/gray/140x200", availability: "sold-out" },
      { color: "gray", size: "160x200", imageFolder: "malm/gray/160x200", availability: "sold-out" },
      { color: "gray", size: "180x200", imageFolder: "malm/gray/180x200", availability: "sold-out" },
      { color: "black", size: "90x200", imageFolder: "malm/black/90x200", availability: "available" },
      { color: "black", size: "140x200", imageFolder: "malm/black/140x200", availability: "available" },
      { color: "black", size: "160x200", imageFolder: "malm/black/160x200", availability: "available" },
      { color: "black", size: "180x200", imageFolder: "malm/black/180x200", availability: "available" },
      { color: "brown", size: "90x200", imageFolder: "malm/brown/90x200", availability: "sold-out" },
      { color: "brown", size: "140x200", imageFolder: "malm/brown/140x200", availability: "available" },
      { color: "brown", size: "160x200", imageFolder: "malm/brown/160x200", availability: "available" },
      { color: "brown", size: "180x200", imageFolder: "malm/brown/180x200", availability: "available" },
    ],
  },

  // ─── BRIMNES ─────────────────────────────────────────────────────────
  {
    id: "brimnes-bed",
    slug: "ikea-brimnes-bed",
    name: "IKEA BRIMNES Bed with IKEA Mattress",
    shortName: "IKEA BRIMNES Bed", // used in WhatsApp messages
    series: "brimnes",
    category: "beds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved white BRIMNES bed with an IKEA mattress, in Double, Queen and King.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA BRIMNES bed in white, sold together with an IKEA mattress. Available as a Double (140 × 200 cm), Queen (160 × 200 cm) or King (180 × 200 cm). Select a size to see the photos for that bed.",
    condition,
    includes: ["IKEA BRIMNES bed frame", "IKEA mattress"],
    sizeNames: { "140x200": "Double", "160x200": "Queen", "180x200": "King" },
    price: null, // PRICE
    featured: false,
    cardImage: "/images/cards/brimnes-bed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "white", size: "140x200", imageFolder: "brimnes/white/140x200", availability: "available" },
      { color: "white", size: "160x200", imageFolder: "brimnes/white/160x200", availability: "available" },
      { color: "white", size: "180x200", imageFolder: "brimnes/white/180x200", availability: "available" },
    ],
  },
  {
    id: "brimnes-daybed",
    slug: "ikea-brimnes-daybed",
    name: "IKEA BRIMNES Daybed",
    shortName: "IKEA BRIMNES Daybed", // used in WhatsApp messages
    series: "brimnes",
    category: "daybeds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved white BRIMNES daybed, including two IKEA mattresses.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA BRIMNES daybed in white, including two IKEA mattresses. A daybed works as a sofa during the day and a bed at night, which makes it a practical choice for guest rooms, kids' rooms and smaller spaces.",
    condition,
    includes: ["IKEA BRIMNES daybed frame", "2 IKEA mattresses"],
    price: null, // PRICE
    featured: true,
    cardImage: "/images/cards/brimnes-daybed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "white", imageFolder: "brimnes/white/daybed", availability: "available" },
    ],
  },

  // ─── HEMNES ──────────────────────────────────────────────────────────
  {
    id: "hemnes-daybed",
    slug: "ikea-hemnes-daybed",
    name: "IKEA HEMNES Daybed",
    shortName: "IKEA HEMNES Daybed", // used in WhatsApp messages
    series: "hemnes",
    category: "daybeds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved HEMNES daybed in white or gray, including two IKEA mattresses.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA HEMNES daybed, including two IKEA mattresses. HEMNES has a classic, traditional look, and a daybed gives you seating by day and a bed at night. Choose a colour to see the photos for that daybed.",
    condition,
    includes: ["IKEA HEMNES daybed frame", "2 IKEA mattresses"],
    price: null, // PRICE
    featured: true,
    cardImage: "/images/cards/hemnes-daybed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "white", imageFolder: "hemnes/white/daybed", availability: "available" },
      { color: "gray", imageFolder: "hemnes/gray/daybed", availability: "available" },
    ],
  },
  {
    id: "hemnes-bed",
    slug: "ikea-hemnes-bed",
    name: "IKEA HEMNES Bed with IKEA Mattress",
    shortName: "IKEA HEMNES Bed", // used in WhatsApp messages
    series: "hemnes",
    category: "beds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved HEMNES bed with an IKEA mattress, in Queen and King, white or gray.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA HEMNES bed, sold together with an IKEA mattress. Available in Queen and King, in white or gray. Message us for the exact measurements of the bed you are interested in.",
    condition,
    includes: ["IKEA HEMNES bed frame", "IKEA mattress"],
    price: null, // PRICE
    featured: false,
    cardImage: "/images/cards/hemnes-bed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      // SIZE: Queen and King dimensions are not confirmed yet. See OWNER-GUIDE.md, "Add another size".
      { color: "white", size: "queen", imageFolder: "hemnes/white/queen", availability: "sold-out" },
      { color: "white", size: "king", imageFolder: "hemnes/white/king", availability: "sold-out" },
      { color: "gray", size: "queen", imageFolder: "hemnes/gray/queen", availability: "sold-out" },
      { color: "gray", size: "king", imageFolder: "hemnes/gray/king", availability: "sold-out" },
    ],
  },

  // ─── FRIHETEN ────────────────────────────────────────────────────────
  {
    id: "friheten-sofa-bed",
    slug: "ikea-friheten-sofa-bed",
    name: "IKEA FRIHETEN Sofa Bed with Storage",
    shortName: "IKEA FRIHETEN Sofa Bed", // used in WhatsApp messages
    series: "friheten",
    category: "sofa-beds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved FRIHETEN sofa bed with storage, in gray or beige.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved genuine IKEA FRIHETEN sofa bed with storage. It gives you a sofa, a bed for guests and a place to keep bedding, all in one piece. Choose a colour to see the photos for that sofa bed.",
    condition,
    includes: ["IKEA FRIHETEN sofa bed with storage"],
    price: null, // PRICE
    featured: true,
    cardImage: "/images/cards/friheten-sofa-bed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "gray", imageFolder: "friheten/gray", availability: "available" },
      { color: "beige", imageFolder: "friheten/beige", availability: "available" },
    ],
  },

  // ─── OTTOMAN / HYDRAULIC STORAGE BEDS ────────────────────────────────
  {
    id: "ottoman-bed",
    slug: "ikea-hydraulic-ottoman-bed",
    name: "IKEA Hydraulic Ottoman Bed with IKEA Mattress",
    shortName: "IKEA Hydraulic Ottoman Bed", // used in WhatsApp messages
    series: "ottoman",
    category: "storage-beds",
    // ✏️ SHORT DESCRIPTION: one or two sentences, used for Google and link previews
    shortDescription: "Preloved hydraulic ottoman storage bed with an IKEA mattress, in Queen and King.",
    // ✏️ DESCRIPTION: write your own description for this product here. Shown on the product page.
    description:
      "A preloved hydraulic ottoman storage bed, sold together with an IKEA mattress. The base lifts up to give you storage space underneath the bed. Available in white or black, as a Queen (160 × 200 cm) or King (180 × 200 cm).",
    condition,
    includes: ["Hydraulic ottoman bed frame", "IKEA mattress"],
    sizeNames: { "160x200": "Queen", "180x200": "King" },
    price: null, // PRICE
    featured: false,
    cardImage: "/images/cards/ottoman-bed.webp", // CARD PHOTO: optional cover photo for this product's card
    variants: [
      { color: "white", size: "160x200", imageFolder: "ottoman/white/160x200", availability: "available" },
      { color: "white", size: "180x200", imageFolder: "ottoman/white/180x200", availability: "available" },
      { color: "black", size: "160x200", imageFolder: "ottoman/black/160x200", availability: "available" },
      { color: "black", size: "180x200", imageFolder: "ottoman/black/180x200", availability: "available" },
    ],
  },
];

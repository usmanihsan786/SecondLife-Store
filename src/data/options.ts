/**
 * The lists of colors, sizes, categories and series the site knows about.
 * Add an entry here first, then use its key (e.g. "beige") in products.ts.
 * The order here is the order shown in filters and selectors.
 */

export const colors = {
  white: { label: "White", swatch: "#F6F4F0" },
  gray: { label: "Gray", swatch: "#9C9A96" },
  black: { label: "Black", swatch: "#2B2927" },
  brown: { label: "Brown", swatch: "#5C4332" },
  beige: { label: "Beige", swatch: "#D9C6AA" },
} as const;

export const sizes = {
  "90x200": { label: "90 × 200 cm", short: "90 × 200" },
  "140x200": { label: "140 × 200 cm", short: "140 × 200" },
  "160x200": { label: "160 × 200 cm", short: "160 × 200" },
  "180x200": { label: "180 × 200 cm", short: "180 × 200" },
  // Sizes without confirmed dimensions yet. Rename or replace once measured.
  queen: { label: "Queen", short: "Queen" },
  king: { label: "King", short: "King" },
} as const;

export const categories = {
  beds: { label: "Beds", href: "/beds" },
  daybeds: { label: "Daybeds", href: "/daybeds" },
  "sofa-beds": { label: "Sofa Beds", href: "/sofa-beds" },
  "storage-beds": { label: "Storage Beds", href: "/shop?category=storage-beds" },
} as const;

export const series = {
  malm: {
    label: "MALM",
    blurb: "Clean-lined bed frames in four colours and four sizes.",
    image: "/images/collections/malm.webp",
  },
  brimnes: {
    label: "BRIMNES",
    blurb: "White beds and a daybed with a bright, simple look.",
    image: "/images/collections/brimnes.webp",
  },
  hemnes: {
    label: "HEMNES",
    blurb: "Daybeds and beds with a classic, traditional look.",
    image: "/images/collections/hemnes.webp",
  },
  friheten: {
    label: "FRIHETEN",
    blurb: "A sofa bed with storage for flexible living spaces.",
    image: "/images/collections/friheten.webp",
  },
  ottoman: {
    label: "Ottoman Beds",
    blurb: "Hydraulic lift-up beds with storage underneath.",
    image: "/images/collections/ottoman.webp",
  },
} as const;

export type ColorId = keyof typeof colors;
export type SizeId = keyof typeof sizes;
export type CategoryId = keyof typeof categories;
export type SeriesId = keyof typeof series;

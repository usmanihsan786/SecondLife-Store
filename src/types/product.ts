import type { CategoryId, ColorId, SeriesId, SizeId } from "@/data/options";

export type Availability = "available" | "sold-out";

/** A price in AED, a custom text such as "Contact for price", or null for "not set yet". */
export type Price = number | string | null;

export type ProductVariant = {
  /** Optional. Generated from color and size when left out. */
  id?: string;
  color?: ColorId;
  size?: SizeId;
  /** Folder inside /public/images/products/ that holds this variant's photos. */
  imageFolder?: string;
  /** Optional explicit photo list. When left out, every photo in imageFolder is used in filename order. */
  images?: string[];
  availability: Availability;
  /** Optional price for this exact variant. Overrides the product price. */
  price?: Price;
  /** Optional extra text about this exact item, shown under the main description when this variant is selected. */
  variantDescription?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Optional shorter name used in WhatsApp messages, e.g. "IKEA MALM Bed". Falls back to name. */
  shortName?: string;
  series: SeriesId;
  category: CategoryId;
  /** One or two sentences. Used for search engines and link previews. */
  shortDescription: string;
  /** Your full product description, shown on the product page. */
  description: string;
  condition: string;
  /** What comes with the item, shown as a list on the product page. */
  includes?: string[];
  /** Friendly names shown under a size, e.g. { "160x200": "Queen" }. */
  sizeNames?: Partial<Record<SizeId, string>>;
  price: Price;
  featured?: boolean;
  /**
   * Optional cover photo for this product's card (Featured furniture, Shop and category pages),
   * e.g. "/images/cards/malm-bed.webp". If the file is missing, the first variant photo is used.
   */
  cardImage?: string;
  variants: ProductVariant[];
};

/** A variant after the site has filled in its id and found its photos on disk. */
export type ResolvedVariant = Omit<ProductVariant, "id" | "images" | "imageFolder"> & {
  id: string;
  images: string[];
};

export type ResolvedProduct = Omit<Product, "variants"> & {
  variants: ResolvedVariant[];
};

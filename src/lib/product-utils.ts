import { siteConfig } from "@/config/site";
import { categories, colors, series, sizes, type ColorId, type SizeId } from "@/data/options";
import type { Availability, Price, ProductVariant, ResolvedProduct, ResolvedVariant } from "@/types/product";

export const colorLabel = (id?: ColorId) => (id ? colors[id].label : undefined);
export const sizeLabel = (id?: SizeId) => (id ? sizes[id].label : undefined);
export const seriesLabel = (product: { series: keyof typeof series }) => series[product.series].label;
export const categoryLabel = (product: { category: keyof typeof categories }) =>
  categories[product.category].label;

export function variantId(variant: { id?: string; color?: string; size?: string }) {
  return variant.id ?? ([variant.color, variant.size].filter(Boolean).join("-") || "default");
}

/** Unique option values in the order defined in data/options.ts. */
export function productColors(product: ResolvedProduct): ColorId[] {
  const used = new Set(product.variants.map((v) => v.color).filter(Boolean));
  return (Object.keys(colors) as ColorId[]).filter((c) => used.has(c));
}

export function productSizes(product: ResolvedProduct): SizeId[] {
  const used = new Set(product.variants.map((v) => v.size).filter(Boolean));
  return (Object.keys(sizes) as SizeId[]).filter((s) => used.has(s));
}

export const isAvailable = (variant: { availability: Availability }) => variant.availability === "available";
export const isFullySoldOut = (product: ResolvedProduct) => !product.variants.some(isAvailable);

/**
 * The one variant matching the selected colour + size.
 * Products without colours (or without sizes) have those fields undefined on every variant,
 * so undefined === undefined matches; a product with neither resolves to its only variant.
 */
export function findVariant(product: ResolvedProduct, color?: ColorId, size?: SizeId) {
  if (product.variants.length === 1 && !product.variants[0].color && !product.variants[0].size) {
    return product.variants[0];
  }
  return product.variants.find((v) => v.color === color && v.size === size);
}

/** The variant shown first: the first available one, or the first one if all are sold out. */
export function defaultVariant<V extends ProductVariant>(product: { variants: V[] }) {
  return product.variants.find(isAvailable) ?? product.variants[0];
}

/** Turns a site path such as "/products/ikea-malm-bed" into a full link on the live domain. */
export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

/**
 * Link to a product page, e.g. /products/ikea-malm-bed?color=brown&size=160x200.
 * The colour and size are only added when the product has more than one option to choose from.
 */
export function productPath(product: { slug: string; variants: unknown[] }, variant?: ProductVariant) {
  const params = new URLSearchParams();
  if (variant && product.variants.length > 1) {
    if (variant.color) params.set("color", variant.color);
    if (variant.size) params.set("size", variant.size);
  }
  const query = params.toString();
  return `/products/${product.slug}${query ? `?${query}` : ""}`;
}

/**
 * The variant a link asks for, from ?color=brown&size=160x200 (or the older ?variant=brown-160x200).
 * Unknown values are ignored. If the exact combination does not exist, the colour alone, then the size alone, is tried.
 * Returns undefined when the link does not pick a variant, so the page shows its default.
 */
export function variantFromParams<V extends ProductVariant>(product: { variants: V[] }, params: URLSearchParams) {
  const byId = product.variants.find((v) => variantId(v) === params.get("variant"));
  if (byId) return byId;

  const color = params.get("color");
  const size = params.get("size");
  const pick = (match: (v: V) => boolean) => {
    const matches = product.variants.filter(match);
    return matches.find(isAvailable) ?? matches[0];
  };
  return (
    (color && size ? pick((v) => v.color === color && v.size === size) : undefined) ??
    (color ? pick((v) => v.color === color) : undefined) ??
    (size ? pick((v) => v.size === size) : undefined)
  );
}

export function formatPrice(price: Price | undefined): string {
  if (typeof price === "number") {
    return `${siteConfig.currency} ${price.toLocaleString("en-US")}`;
  }
  if (typeof price === "string" && price.trim()) return price;
  return siteConfig.priceFallback;
}

export function variantPrice(product: ResolvedProduct, variant?: ResolvedVariant): Price {
  return variant?.price ?? product.price;
}

/** "From AED 900" when variants have different numeric prices, otherwise the single price. */
export function priceSummary(product: ResolvedProduct): string {
  const numeric = product.variants
    .map((v) => variantPrice(product, v))
    .filter((p): p is number => typeof p === "number");
  if (numeric.length === 0) return formatPrice(product.price);
  const min = Math.min(...numeric);
  const allSame = numeric.length === product.variants.length && numeric.every((p) => p === min);
  return allSame ? formatPrice(min) : `From ${formatPrice(min)}`;
}

/** e.g. "90 × 200 to 180 × 200 cm", "Queen, King" or undefined when sizes do not apply. */
export function sizeSummary(product: ResolvedProduct): string | undefined {
  const list = productSizes(product);
  if (list.length === 0) return undefined;
  if (list.length === 1) return sizes[list[0]].label;
  const dims = list.filter((s) => /^\d+x\d+$/.test(s));
  if (dims.length === list.length) {
    return `${sizes[dims[0]].short} to ${sizes[dims[dims.length - 1]].label}`;
  }
  return list.map((s) => sizes[s].short).join(", ");
}

export function variantSummary(product: ResolvedProduct, variant?: ResolvedVariant) {
  if (!variant) return "";
  return [colorLabel(variant.color), variant.size ? sizes[variant.size].short : undefined]
    .filter(Boolean)
    .join(" · ");
}

export function variantImageAlt(product: ResolvedProduct, variant: ResolvedVariant | undefined, index = 0) {
  const parts = [product.name, colorLabel(variant?.color), sizeLabel(variant?.size)].filter(Boolean);
  return `${parts.join(", ")}${index > 0 ? `, photo ${index + 1}` : ""}`;
}

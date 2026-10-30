import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { RotationFrame } from "@/components/ui/AutoRotate";
import { productPath, variantImageAlt, variantSummary } from "@/lib/product-utils";
import { productInquiryMessage } from "@/lib/whatsapp";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";

// Server-only: builds the photo rotations shown on homepage cards from the real product data and photos.

const hashes = new Map<string, string>();

/** A fingerprint of the photo file, so the same photo saved under two names is not shown twice in a row. */
function fingerprint(src: string) {
  if (!hashes.has(src)) {
    const file = path.join(process.cwd(), "public", src);
    hashes.set(src, fs.existsSync(file) ? crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex") : src);
  }
  return hashes.get(src)!;
}

function unique(frames: RotationFrame[]) {
  const seen = new Set<string>();
  return frames.filter((f) => {
    const key = fingerprint(f.src);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Alternates between groups (colours, or products) so neighbouring frames look different: a, b, c, a, b, c… */
function roundRobin<T>(groups: T[][]) {
  const out: T[] = [];
  for (let i = 0; groups.some((g) => i < g.length); i++) for (const g of groups) if (i < g.length) out.push(g[i]);
  return out;
}

type VariantOptions = {
  /** Show this variant first (e.g. the hero's current pick). */
  start?: ResolvedVariant;
  /** Leave out sold-out variants. Use wherever the card implies the item can be bought. */
  availableOnly?: boolean;
  /** How many photos of each variant to include (in gallery order). */
  photosPerVariant?: number;
};

/** Variants of one product, in the order they should rotate. */
function orderedVariants(product: ResolvedProduct, { start, availableOnly = true }: VariantOptions) {
  const withPhotos = product.variants.filter((v) => v.images.length && (!availableOnly || v.availability === "available"));
  const byColor = new Map<string, ResolvedVariant[]>();
  for (const v of withPhotos) byColor.set(v.color ?? "", [...(byColor.get(v.color ?? "") ?? []), v]);
  const ordered = roundRobin([...byColor.values()]);
  const at = start ? ordered.findIndex((v) => v.id === start.id) : -1;
  return at > 0 ? [...ordered.slice(at), ...ordered.slice(0, at)] : ordered;
}

/** One frame per photo: the photo, its alt text, the link to that exact variant and a "Colour · size" label. */
function framesFor(product: ResolvedProduct, variants: ResolvedVariant[], photosPerVariant: number): RotationFrame[] {
  return variants.flatMap((v) =>
    v.images.slice(0, photosPerVariant).map((src, k) => ({
      src,
      alt: [variantImageAlt(product, v), v.imageAlts?.[k]].filter(Boolean).join(", "),
      href: productPath(product, v),
      detail: variantSummary(product, v),
      inquiry: productInquiryMessage(product, v),
    })),
  );
}

/** Rotation for a single product (hero tiles, featured product cards). */
export function productFrames(product: ResolvedProduct, options: VariantOptions & { first?: RotationFrame } = {}) {
  const frames = framesFor(product, orderedVariants(product, options), options.photosPerVariant ?? 1);
  return unique(options.first ? [options.first, ...frames] : frames);
}

/**
 * Rotation for a category tile: photos of every product in the category, alternating between products.
 * Every frame keeps the tile's own link and its decorative (empty) alt text, because the tile's title names it.
 */
export function categoryFrames(
  products: ResolvedProduct[],
  { href, image, photosPerVariant = 1 }: { href: string; image: string | null; photosPerVariant?: number },
) {
  const perProduct = products.map((p) =>
    framesFor(p, orderedVariants(p, { availableOnly: false }), photosPerVariant).map((f) => ({ ...f, alt: "", href, detail: undefined })),
  );
  const first: RotationFrame[] = image ? [{ src: image, alt: "", href }] : [];
  return unique([...first, ...roundRobin(perProduct)]);
}

import fs from "node:fs";
import path from "node:path";
import { products } from "@/data/products";
import { variantId } from "@/lib/product-utils";
import type { Product, ResolvedProduct } from "@/types/product";

// Server-only: reads /public to find which photos exist, so missing photos never show as broken images.

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PRODUCT_IMAGE_ROOT = "/images/products";
const IMAGE_FILE = /\.(webp|avif|jpe?g|png)$/i;

export function publicFileExists(publicPath: string) {
  return fs.existsSync(path.join(PUBLIC_DIR, publicPath));
}

/** Returns the public path if the file exists, otherwise null. */
export function existingImage(publicPath: string) {
  return publicFileExists(publicPath) ? publicPath : null;
}

function imagesInFolder(folder: string): string[] {
  const dir = path.join(PUBLIC_DIR, PRODUCT_IMAGE_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `${PRODUCT_IMAGE_ROOT}/${folder}/${file}`);
}

function resolveProduct(product: Product): ResolvedProduct {
  const seen = new Set<string>();
  const variants = product.variants.map((variant) => {
    const id = variantId(variant);
    if (seen.has(id)) {
      throw new Error(`Product "${product.id}" has two variants with the same colour and size (${id}).`);
    }
    seen.add(id);

    const { imageFolder, images: explicit, ...rest } = variant;
    const images = explicit
      ? explicit.filter((src) => /^https?:\/\//.test(src) || publicFileExists(src))
      : imageFolder
        ? imagesInFolder(imageFolder)
        : [];
    return { ...rest, id, images };
  });
  // Ignore a cover photo that has not been added yet, so the card falls back to the variant photo.
  const cardImage = product.cardImage && publicFileExists(product.cardImage) ? product.cardImage : undefined;
  return { ...product, cardImage, variants };
}

let cache: ResolvedProduct[] | undefined;

export function getProducts(): ResolvedProduct[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const slugs = new Set<string>();
  cache = products
    .filter((p) => p.variants.length > 0)
    .map((p) => {
      if (slugs.has(p.slug)) throw new Error(`Two products use the slug "${p.slug}".`);
      slugs.add(p.slug);
      return resolveProduct(p);
    });
  return cache;
}

export function getProductBySlug(slug: string) {
  return getProducts().find((p) => p.slug === slug);
}

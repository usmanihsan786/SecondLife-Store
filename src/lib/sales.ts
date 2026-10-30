import { verifiedSales, type VerifiedSale } from "@/data/sales";
import { getProducts } from "@/lib/catalog";
import { productPath } from "@/lib/product-utils";

// Server-only: turns the verified sales records into what the website may show. Unpublished, future-dated or
// unknown-product records are always ignored.

/** What a "recently sold" notice may show. No customer details beyond an approved first name and a city. */
export type SaleNotice = {
  id: string;
  /** An approved first name, or "A customer". */
  who: string;
  /** e.g. "IKEA MALM Bed". */
  productName: string;
  city?: string;
  href: string;
  image?: string;
  soldAt: string;
};

/** Notices only for sales in this many recent days, so the site never presents old activity as recent. */
const NOTICE_WINDOW_DAYS = 30;

/** Sales counts are shown only once there are at least this many published sales. */
export const MIN_SALES_FOR_COUNTER = 10;

function isValid(sale: VerifiedSale, today = new Date()) {
  const sold = new Date(`${sale.soldAt}T00:00:00Z`);
  return sale.published && !Number.isNaN(sold.getTime()) && sold <= today;
}

export function saleNotices(today = new Date()): SaleNotice[] {
  const products = getProducts();
  const oldest = new Date(today.getTime() - NOTICE_WINDOW_DAYS * 86_400_000);
  return verifiedSales
    .filter((s) => isValid(s, today) && new Date(`${s.soldAt}T00:00:00Z`) >= oldest)
    .flatMap((s) => {
      const product = products.find((p) => p.id === s.productId);
      if (!product) return [];
      const variant = product.variants.find((v) => v.id === s.variantId);
      return [
        {
          id: s.id,
          who: s.nameConsent && s.firstName ? s.firstName : "A customer",
          productName: product.shortName ?? product.name,
          city: s.city,
          href: productPath(product, variant),
          image: variant?.images[0] ?? product.cardImage ?? product.variants.find((v) => v.images.length)?.images[0],
          soldAt: s.soldAt,
        },
      ];
    })
    .sort((a, b) => b.soldAt.localeCompare(a.soldAt));
}

/** Totals for a sales counter, or null while there are too few verified sales to show one. */
export function salesStats(today = new Date()) {
  const published = verifiedSales.filter((s) => isValid(s, today));
  if (published.length < MIN_SALES_FOR_COUNTER) return null;
  const first = published.map((s) => s.soldAt).sort()[0];
  return { piecesSold: published.length, since: first };
}

/**
 * Development only: a clearly labelled sample notice, so the design can be reviewed on `next dev` with
 * ?sales-preview=1. It is never passed to the component in a production build.
 */
export function developmentSampleNotice(): SaleNotice | undefined {
  const product = getProducts().find((p) => p.id === "malm-bed") ?? getProducts()[0];
  if (!product) return undefined;
  const variant = product.variants.find((v) => v.availability === "available" && v.images.length);
  return {
    id: "dev-sample",
    who: "Ahmad",
    productName: product.shortName ?? product.name,
    city: "Dubai",
    href: productPath(product, variant),
    image: variant?.images[0],
    soldAt: new Date().toISOString().slice(0, 10),
  };
}

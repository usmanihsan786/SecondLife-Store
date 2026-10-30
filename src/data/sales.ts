/**
 * VERIFIED COMPLETED SALES. The only source for "recently sold" notices and sales counts on the website.
 *
 * Add a record only for a sale that was actually completed (paid / delivered), never for a WhatsApp enquiry or a
 * page view. Nothing here is shown unless `published` is true. The list is empty until real sales are recorded,
 * so the website shows no sales activity at all.
 *
 * Privacy:
 * - Never store phone numbers, full names, addresses or order details here: this file is public on GitHub.
 * - `firstName` is shown only when `nameConsent` is true (the customer agreed to be named). Otherwise the notice
 *   says "A customer".
 * - `city` is optional and should be general ("Dubai", "Sharjah"), never an address.
 *
 * Example (do not copy as a real record):
 *   { id: "2026-11-03-1", productId: "brimnes-bed", variantId: "white-160x200", soldAt: "2026-11-03",
 *     city: "Dubai", published: true }
 */
export type VerifiedSale = {
  /** Your own unique reference for the sale, e.g. "2026-11-03-1". */
  id: string;
  /** The product's `id` in products.ts, e.g. "brimnes-bed". */
  productId: string;
  /** Optional variant, e.g. "white-160x200" (colour-size), so the notice can link to that exact item. */
  variantId?: string;
  /** The date the sale was completed, "YYYY-MM-DD". */
  soldAt: string;
  /** Optional general area, e.g. "Dubai". */
  city?: string;
  /** Optional first name, shown only with `nameConsent: true`. */
  firstName?: string;
  nameConsent?: boolean;
  /** Set to true only when this sale may be shown publicly. */
  published: boolean;
};

export const verifiedSales: VerifiedSale[] = [];

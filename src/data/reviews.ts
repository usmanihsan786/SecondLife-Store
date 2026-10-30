/**
 * CUSTOMER REVIEWS. The only source for the reviews section on the website.
 *
 * Add a review only when a real customer wrote it and agreed to it being shown. Copy their words exactly; do not
 * edit the meaning. Nothing here appears unless `approved` is true. The list is empty until real reviews are
 * added, so the reviews section stays hidden.
 *
 * Privacy (this file is public on GitHub):
 * - `displayName` is what the customer agreed to, e.g. "Ahmad" or "Ahmad K." Never a full name without consent,
 *   never phone numbers or addresses.
 * - `rating` only if the customer actually gave one (1–5). Leave it out otherwise; no stars are then shown.
 * - `purchaseVerified: true` only when you can match the review to a completed sale.
 *
 * No Review or AggregateRating structured data is generated from this file.
 *
 * Example (do not copy as a real review):
 *   { id: "r-2026-11-04", displayName: "Ahmad", city: "Dubai", text: "…the customer's own words…",
 *     rating: 5, productId: "malm-bed", purchaseVerified: true, date: "2026-11-04", source: "WhatsApp",
 *     approved: true }
 */
export type CustomerReview = {
  id: string;
  /** The name the customer agreed to show, e.g. "Ahmad" or "Ahmad K.". */
  displayName: string;
  /** Optional general area, e.g. "Dubai". */
  city?: string;
  /** The customer's own words. */
  text: string;
  /** 1–5, only if the customer gave a rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** The product's `id` in products.ts, if the review is about a specific item. */
  productId?: string;
  /** True only when the review matches a completed sale. */
  purchaseVerified?: boolean;
  /** "YYYY-MM-DD", when the review was given. */
  date?: string;
  /** Where the customer gave it, e.g. "WhatsApp" or "Google". */
  source?: string;
  /** Set to true only when the customer agreed to it being shown. */
  approved: boolean;
};

export const customerReviews: CustomerReview[] = [];

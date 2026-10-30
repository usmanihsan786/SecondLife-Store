import { customerReviews, type CustomerReview } from "@/data/reviews";
import { getProducts } from "@/lib/catalog";
import { productPath } from "@/lib/product-utils";

// Server-only: what the reviews section may show. Unapproved reviews never leave this file.

export type ReviewCard = {
  id: string;
  name: string;
  city?: string;
  text: string;
  rating?: number;
  date?: string;
  source?: string;
  product?: { name: string; href: string; image?: string; verified: boolean };
};

function toCard(r: CustomerReview): ReviewCard {
  const product = r.productId ? getProducts().find((p) => p.id === r.productId) : undefined;
  return {
    id: r.id,
    name: r.displayName,
    city: r.city,
    text: r.text,
    rating: r.rating,
    date: r.date,
    source: r.source,
    product: product && {
      name: product.name,
      href: productPath(product),
      image: product.cardImage ?? product.variants.find((v) => v.images.length)?.images[0],
      verified: !!r.purchaseVerified,
    },
  };
}

export function approvedReviews(): ReviewCard[] {
  return customerReviews
    .filter((r) => r.approved && r.text.trim())
    .map(toCard)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/**
 * Development only: sample cards so the design can be reviewed on `next dev` with ?preview=1.
 * The text says plainly that it is a sample. Never passed to the page in a production build.
 */
export function developmentSampleReviews(): ReviewCard[] {
  const sample = (id: string, name: string, city: string, productId: string, rating?: 1 | 2 | 3 | 4 | 5) =>
    toCard({
      id,
      displayName: name,
      city,
      productId,
      rating,
      purchaseVerified: true,
      date: new Date().toISOString().slice(0, 10),
      source: "Sample",
      text: "Sample review text for the design preview. A real customer's own words will appear here once they are added and approved.",
      approved: true,
    });
  return [
    sample("dev-1", "Sample customer", "Dubai", "malm-bed", 5),
    sample("dev-2", "Sample customer", "Sharjah", "friheten-sofa-bed", 5),
    sample("dev-3", "Sample customer", "Abu Dhabi", "hemnes-daybed"),
    sample("dev-4", "Sample customer", "Ajman", "brimnes-bed", 4),
  ];
}

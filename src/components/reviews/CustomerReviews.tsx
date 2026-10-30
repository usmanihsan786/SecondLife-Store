import Image from "next/image";
import Link from "next/link";
import { DevPreview } from "@/components/dev/DevPreview";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approvedReviews, developmentSampleReviews, type ReviewCard } from "@/lib/reviews";

const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5 text-accent-strong" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} aria-hidden="true" viewBox="0 0 20 20" width="15" height="15" fill={n <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3">
          <path d="M10 1.8l2.4 5 5.5.7-4 3.8 1 5.4L10 14.1l-4.9 2.6 1-5.4-4-3.8 5.5-.7z" strokeLinejoin="round" />
        </svg>
      ))}
    </p>
  );
}

function Review({ review }: { review: ReviewCard }) {
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        {review.rating ? <Stars rating={review.rating} /> : <span />}
        <span aria-hidden="true" className="font-display text-[2.5rem] leading-[0.6] text-accent/60">“</span>
      </div>
      <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink sm:text-base">{review.text}</blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <p className="text-[0.9375rem] font-medium text-ink">
          {review.name}
          {review.city && <span className="font-normal text-muted"> · {review.city}</span>}
        </p>
        {(review.date || review.source) && (
          <p className="mt-0.5 text-[0.8125rem] text-muted">
            {[review.date && formatDate(review.date), review.source && `via ${review.source}`].filter(Boolean).join(" · ")}
          </p>
        )}
        {review.product && (
          <Link href={review.product.href} className="group mt-3 flex items-center gap-3 rounded-[var(--radius-control)] bg-surface p-2 pr-3 transition-colors hover:bg-surface-2">
            {review.product.image && (
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[4px] bg-surface-2">
                <Image src={review.product.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate text-[0.8125rem] font-medium text-ink group-hover:underline">{review.product.name}</span>
              {review.product.verified && (
                <span className="mt-0.5 flex items-center gap-1 text-xs text-ok">
                  <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Verified purchase
                </span>
              )}
            </span>
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

function ReviewList({ reviews }: { reviews: ReviewCard[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {reviews.map((r) => (
        <li key={r.id}>
          <Review review={r} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Customer reviews: approved real reviews only (data/reviews.ts). Hidden until there is at least one. On the
 * development server, ?preview=1 shows clearly labelled sample cards instead, to review the design.
 */
export function CustomerReviews() {
  const reviews = approvedReviews();
  const samples = process.env.NODE_ENV === "development" && reviews.length === 0 ? developmentSampleReviews() : [];
  if (reviews.length === 0 && samples.length === 0) return null;

  const heading = (
    <SectionHeading eyebrow="Reviews" title="What our customers say" description={<p>In their own words, shared with their permission.</p>} />
  );

  const section = (list: ReviewCard[]) => (
    <section className="border-t border-line py-12 sm:py-20">
      <Container>
        {heading}
        <ReviewList reviews={list} />
      </Container>
    </section>
  );

  return reviews.length > 0 ? section(reviews) : <DevPreview label="sample reviews, not real customers">{section(samples)}</DevPreview>;
}

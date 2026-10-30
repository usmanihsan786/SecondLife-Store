import Link from "next/link";
import { DevPreview } from "@/components/dev/DevPreview";
import { RotatingImage, RotationDetail, RotationDots, RotationLink, RotationScope, type RotationFrame } from "@/components/ui/AutoRotate";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getProducts } from "@/lib/catalog";
import { productFrames } from "@/lib/rotation-frames";
import { salesStats } from "@/lib/sales";
import { CountUp } from "./CountUp";

const monthYear = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-t border-white/15 pt-3">
      <CountUp value={value} className="block font-display text-[2.25rem] leading-none text-white sm:text-[2.75rem]" />
      <span className="mt-1.5 block text-[0.8125rem] leading-snug text-white/70 sm:text-sm">{label}</span>
    </div>
  );
}

/**
 * The collection and trust banner. Everything in it is real: inventory and photo counts come from the product data,
 * the photos are our own stock, and a "pieces sold" figure appears only from verified sales records
 * (data/sales.ts, at least MIN_SALES_FOR_COUNTER). On the development server, ?preview=1 adds a labelled sample.
 */
export function TrustBanner() {
  const products = getProducts();
  const available = products.flatMap((p) => p.variants).filter((v) => v.availability === "available");
  const inventory = {
    products: products.filter((p) => p.variants.some((v) => v.availability === "available")).length,
    options: available.length,
    photos: new Set(products.flatMap((p) => p.variants.flatMap((v) => v.images))).size,
  };
  const sales = salesStats();

  // One photo of each available product in turn, so the banner shows the range, not one item.
  const perProduct = products.map((p) => productFrames(p).map((f) => ({ ...f, detail: [p.shortName ?? p.name, f.detail].filter(Boolean).join(" · ") })));
  const frames: RotationFrame[] = [];
  for (let i = 0; perProduct.some((f) => i < f.length) && frames.length < 14; i++) for (const f of perProduct) if (f[i]) frames.push(f[i]);

  return (
    <section className="bg-ink text-white" aria-labelledby="collection-banner">
      <Container className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-20">
        <div className="lg:order-2">
          {frames.length > 0 && (
            <RotationScope frames={frames} swipe delay={600} className="relative">
              <RotationLink className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-white/5">
                <RotatingImage sizes="(min-width: 1024px) 45vw, 100vw" />
                <RotationDots className="absolute right-3 top-3 z-[2] drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]" />
                <span className="absolute bottom-3 left-3 z-[2] max-w-[calc(100%-1.5rem)] truncate rounded-[var(--radius-control)] bg-white/95 px-3 py-1.5 text-[0.8125rem] font-medium text-ink shadow-sm">
                  <RotationDetail />
                </span>
              </RotationLink>
            </RotationScope>
          )}
        </div>

        <div className="lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Our collection</p>
          <h2 id="collection-banner" className="mt-3 font-display text-[2.125rem] leading-[1.05] sm:text-[2.875rem]">
            Discover genuine used IKEA furniture
          </h2>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
            Explore available beds, daybeds and sofa beds across our current collection, each photographed as it is.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
            <Stat value={inventory.products} label="products listed now" />
            <Stat value={inventory.options} label="sizes and colours available" />
            <Stat value={inventory.photos} label="real photos of our stock" />
          </div>

          {sales && (
            <p className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-ok text-white">
                <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span>
                <span className="font-medium text-white">{sales.piecesSold} pieces sold</span> since {monthYear(sales.since)}, from our verified
                sales records
              </span>
            </p>
          )}
          {!sales && process.env.NODE_ENV === "development" && (
            <DevPreview label="sample counter, not real sales">
              <p className="mt-6 flex items-center gap-2 px-3 pb-3 pt-12 text-sm text-white/80">
                <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-ok text-white">
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span>
                  <span className="font-medium text-white">128 pieces sold</span> since March 2026, from our verified sales records (sample)
                </span>
              </p>
            </DevPreview>
          )}

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Link href="/shop" className={buttonClasses("light", "lg", "min-[420px]:px-8")}>
              Browse Furniture
            </Link>
            <WhatsAppButton variant="outline-light">Ask on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

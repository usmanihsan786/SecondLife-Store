import type { Metadata } from "next";
import Link from "next/link";
import { ConditionSection, ShopBySeries, WhatsAppCta, WhyBuy } from "@/components/home/Sections";
import { Hero } from "@/components/home/Hero";
import { ArrowRightIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/lib/catalog";
import { emptyFilters, filterProducts } from "@/lib/filters";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = filterProducts(
    getProducts().filter((p) => p.featured),
    emptyFilters,
  );

  return (
    <>
      <Hero />
      <ShopBySeries />

      {featured.length > 0 && (
        <section className="pb-14 sm:pb-20">
          <Container>
            <SectionHeading
              eyebrow="Featured"
              title="Featured furniture"
              description={<p>A few favourites from our current selection.</p>}
              action={
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-espresso underline-offset-4 hover:underline"
                >
                  View all furniture <ArrowRightIcon size={18} />
                </Link>
              }
            />
            <div className="mt-8">
              <ProductGrid items={featured} columns="wide" />
            </div>
          </Container>
        </section>
      )}

      <WhyBuy />
      <ConditionSection />
      <WhatsAppCta />
    </>
  );
}

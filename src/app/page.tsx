import type { Metadata } from "next";
import Link from "next/link";
import { Faq, LinkCards } from "@/components/content/ContentBlocks";
import { ConditionSection, ShopBySeries, WhatsAppCta, WhyBuy } from "@/components/home/Sections";
import { Hero } from "@/components/home/Hero";
import { ArrowRightIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryLinks, faqDelivery, faqGenuine, faqHowToBuy, faqPhotos } from "@/data/faq";
import { guideLinks } from "@/data/guides";
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
              title="Featured used IKEA furniture"
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

      <section className="pb-14 sm:pb-20">
        <Container className="space-y-14">
          <LinkCards title="Shop used IKEA furniture by category" links={categoryLinks} />
          <div className="max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base">
            <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
              Second-hand IKEA furniture in the UAE
            </h2>
            <p>
              We are based in the UAE and sell genuine used IKEA furniture. Every bed comes with an IKEA mattress,
              every daybed with two, and our photos show our own stock, colour by colour and size by size. Whether you are in
              Dubai, Sharjah, Ajman or Abu Dhabi, message us on WhatsApp to check availability and ask about delivery
              to your area.{" "}
              <Link href="/delivery-areas" className="font-medium text-espresso underline underline-offset-4">
                Delivery and areas
              </Link>
              .
            </p>
          </div>
          <Faq
            title="Questions about used IKEA furniture"
            items={[
              faqGenuine,
              {
                question: "Which IKEA ranges do you sell?",
                answer: (
                  <p>
                    Mainly beds, daybeds and sofa beds from <Link href="/products/ikea-malm-bed">MALM</Link>,{" "}
                    <Link href="/ikea-brimnes">BRIMNES</Link>, <Link href="/ikea-hemnes">HEMNES</Link> and{" "}
                    <Link href="/products/ikea-friheten-sofa-bed">FRIHETEN</Link>. Stock changes, so ask us if you are
                    looking for something specific.
                  </p>
                ),
              },
              faqPhotos,
              faqDelivery,
              faqHowToBuy,
            ]}
          />
          <LinkCards title="Buying guides" links={guideLinks} />
        </Container>
      </section>

      <WhatsAppCta />
    </>
  );
}

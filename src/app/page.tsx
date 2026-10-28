import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/ContentBlocks";
import { ConditionSection, GuideCards, OrderSteps, ShopByCategory, ShopBySeries, WhatsAppCta, WhyBuy } from "@/components/home/Sections";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionHeading } from "@/components/ui/SectionHeading";
import { faqDelivery, faqGenuine, faqHowToBuy, faqPhotos } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/catalog";
import { emptyFilters, filterProducts } from "@/lib/filters";
import { defaultShareImage, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

// `absolute` stops the layout's "%s | <store name>" template from adding anything to the homepage title.
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: siteConfig.url,
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [siteConfig.logo.share],
  },
};

// The real buying process (no cart): only facts the site already states elsewhere.
export default function HomePage() {
  const featured = filterProducts(
    getProducts().filter((p) => p.featured),
    emptyFilters,
  );

  return (
    <>
      <Hero />
      <ShopByCategory />

      {featured.length > 0 && (
        <section className="pb-14 sm:pb-20">
          <Container>
            <SectionHeading
              eyebrow="Featured"
              title="Featured used IKEA furniture"
              description={<p>A few favourites from our current selection.</p>}
              action={<ArrowLink href="/shop">View all furniture</ArrowLink>}
            />
            <div className="mt-8">
              <ProductGrid items={featured} columns="wide" />
            </div>
          </Container>
        </section>
      )}

      <ShopBySeries />
      <OrderSteps />
      <ConditionSection />
      <WhyBuy />
      <div className="border-t border-line">
        <GuideCards />
      </div>

      <section className="border-t border-line py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
          <div className="max-w-xl space-y-3 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">Dubai · Sharjah · Ajman · Abu Dhabi</p>
            <h2 className="font-display text-[1.875rem] leading-[1.08] text-ink sm:text-[2.375rem]">
              IKEA used furniture in Dubai and the UAE
            </h2>
            <p>
              We are based in the UAE and sell genuine used IKEA furniture. Every bed comes with an IKEA mattress,
              every daybed with two, and our photos show our own stock, colour by colour and size by size.
            </p>
            <p>
              Looking for IKEA used furniture in Dubai, Sharjah, Ajman or Abu Dhabi? Choose the piece, size and colour here,
              then message us on WhatsApp with your area. We will confirm whether it is still available and whether
              delivery to your area is possible.
            </p>
            <p>
              See{" "}
              <Link href="/delivery-areas" className="font-medium text-ink underline decoration-accent underline-offset-4 hover:decoration-ink">
                used IKEA furniture in Sharjah, Ajman and Abu Dhabi
              </Link>{" "}
              for how buying and delivery enquiries work in each emirate.
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
        </Container>
      </section>

      <WhatsAppCta />
    </>
  );
}

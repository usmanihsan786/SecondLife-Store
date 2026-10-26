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
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/catalog";
import { emptyFilters, filterProducts } from "@/lib/filters";
import { defaultShareImage, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

// `absolute` stops the layout's "%s | SecondLife" template from adding anything to the homepage title.
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
    images: [siteConfig.logo.main],
  },
};

// The real buying process (no cart): only facts the site already states elsewhere.
const orderSteps = [
  { title: "Choose your piece", text: "Pick the IKEA range, colour and size. Each option shows photos of our own stock." },
  { title: "Message us on WhatsApp", text: "Tap the WhatsApp button. Your message already includes the exact item you chose." },
  { title: "We confirm the details", text: "We confirm availability, send extra photos if you want them and tell you the delivery options for your area." },
];

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

      <section className="pb-14 sm:pb-20" aria-labelledby="how-to-order">
        <Container>
          <h2 id="how-to-order" className="font-display text-[1.75rem] font-semibold leading-tight text-ink sm:text-[2.125rem]">
            How to order on WhatsApp
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {orderSteps.map((step, i) => (
              <li key={step.title} className="rounded-[var(--radius-card)] border border-line/70 bg-paper p-5 shadow-[var(--shadow-card)]">
                <span aria-hidden="true" className="font-display text-2xl font-semibold leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <WhyBuy />
      <ConditionSection />

      <section className="pb-14 sm:pb-20">
        <Container className="space-y-14">
          <LinkCards title="Shop used IKEA furniture by category" links={categoryLinks} />
          <div className="max-w-3xl space-y-3 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base">
            <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
              IKEA used furniture in Dubai and the UAE
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

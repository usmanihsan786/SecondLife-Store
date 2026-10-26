import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { HOME_TITLE } from "@/lib/seo";
import { existingImage } from "@/lib/catalog";

// Add your own photo at /public/images/hero/hero.webp to replace the placeholder.
const HERO_IMAGE = "/images/hero/hero.webp";

export function Hero() {
  const image = existingImage(HERO_IMAGE);
  return (
    <section className="border-b border-line/70 bg-gradient-to-b from-sand/70 to-canvas">
      <Container className="grid items-center gap-8 py-8 sm:py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-16">
        <div className="animate-rise">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">Second-hand · Genuine IKEA · UAE</p>
          <h1 className="mt-3 font-display text-[2.125rem] font-semibold leading-[1.08] text-ink min-[400px]:text-[2.375rem] sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem]">
            {HOME_TITLE}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Genuine used IKEA beds with mattress, daybeds and sofa cum beds in excellent condition, for Dubai and
            across the UAE.
          </p>
          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row md:flex-col lg:flex-row sm:mt-8" data-cta="hero">
            <Link href="/shop" className={buttonClasses("primary", "lg", "min-[420px]:px-7")}>
              Shop Furniture
            </Link>
            <WhatsAppButton variant="secondary">Contact on WhatsApp</WhatsAppButton>
          </div>
          {siteConfig.googleReviewsUrl && (
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-espresso underline-offset-4 hover:underline"
            >
              <span aria-hidden="true" className="text-accent">★</span> Read our customer reviews on Google
            </a>
          )}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[var(--shadow-card)] sm:aspect-[16/9] md:aspect-[4/5] lg:aspect-[5/4]">
          <SmartImage
            src={image}
            alt="Used IKEA bedroom furniture"
            kind="room"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}

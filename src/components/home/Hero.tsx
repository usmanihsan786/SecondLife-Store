import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { existingImage } from "@/lib/catalog";

// Add your own photo at /public/images/hero/hero.webp to replace the placeholder.
const HERO_IMAGE = "/images/hero/hero.webp";

export function Hero() {
  const image = existingImage(HERO_IMAGE);
  return (
    <section className="border-b border-line/70 bg-gradient-to-b from-sand/70 to-canvas">
      <Container className="grid items-center gap-8 py-8 sm:py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-16">
        <div className="animate-rise">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">Preloved · Genuine IKEA · UAE</p>
          <h1 className="mt-3 font-display text-[2.125rem] font-semibold leading-[1.08] text-ink min-[400px]:text-[2.375rem] sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem]">
            Quality Preloved IKEA Furniture in the UAE
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Carefully selected IKEA beds, mattresses, daybeds and sofa beds in excellent condition.
          </p>
          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row md:flex-col lg:flex-row sm:mt-8">
            <Link href="/shop" className={buttonClasses("primary", "lg", "min-[420px]:px-7")}>
              Shop Furniture
            </Link>
            <WhatsAppButton variant="secondary">Contact on WhatsApp</WhatsAppButton>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[var(--shadow-card)] sm:aspect-[16/9] md:aspect-[4/5] lg:aspect-[5/4]">
          <SmartImage
            src={image}
            alt="Preloved IKEA bedroom furniture"
            kind="room"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}

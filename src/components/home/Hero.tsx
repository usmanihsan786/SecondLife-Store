import Link from "next/link";
import { CameraIcon, ChatIcon, ShieldCheckIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { RotatingImage, RotationDetail, RotationDots, RotationLink, RotationPauseButton, RotationScope } from "@/components/ui/AutoRotate";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ColorId, SizeId } from "@/data/options";
import { getProductBySlug } from "@/lib/catalog";
import { findVariant } from "@/lib/product-utils";
import { productFrames } from "@/lib/rotation-frames";
import { HOME_TITLE } from "@/lib/seo";

/**
 * The hero shows three photos of our own stock, each linking to that exact item.
 * ✏️ To change them, pick a product slug and the colour/size whose first photo you want. Sold-out or missing
 * items are skipped automatically, so the hero never shows something that cannot be bought.
 * Each tile then rotates through the product's other available colours and sizes; the label and link follow the photo.
 */
const heroPicks: { slug: string; color?: ColorId; size?: SizeId; label: string }[] = [
  { slug: "ikea-malm-bed", color: "brown", size: "160x200", label: "MALM bed" },
  { slug: "ikea-friheten-sofa-bed", color: "beige", label: "FRIHETEN sofa bed" },
  { slug: "ikea-hemnes-daybed", color: "white", label: "HEMNES daybed" },
];

const facts = [
  { icon: ShieldCheckIcon, text: "Genuine IKEA ranges" },
  { icon: CameraIcon, text: "Photos of our own stock" },
  { icon: ChatIcon, text: "Quick answers on WhatsApp" },
];

function resolvePicks() {
  return heroPicks.flatMap((pick) => {
    const product = getProductBySlug(pick.slug);
    const variant = product && findVariant(product, pick.color, pick.size);
    const image = variant?.images[0];
    if (!product || !variant || !image || variant.availability !== "available") return [];
    return [{ ...pick, frames: productFrames(product, { start: variant }) }];
  });
}

export function Hero() {
  const picks = resolvePicks();
  const [main, ...side] = picks;

  // Phones: heading, then the photos, then the introduction and buttons, so real furniture is visible at once.
  // From lg: heading and text on the left, photos on the right (the grid places the three blocks).
  return (
    <section className="border-b border-line">
      <Container className="grid gap-6 pb-10 pt-6 sm:gap-8 sm:pb-14 sm:pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-0 lg:py-16 xl:gap-x-20">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">
            Second-hand · Genuine IKEA · UAE
          </p>
          <h1 className="mt-3 font-display text-[2.75rem] leading-[0.98] text-ink min-[400px]:text-[3.125rem] sm:mt-4 sm:text-[4rem] lg:text-[4.25rem] xl:text-[5rem]">
            {HOME_TITLE}
          </h1>
        </div>

        {main && (
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className={`grid gap-2.5 sm:gap-4 ${side.length ? "grid-cols-2 sm:grid-cols-[1.15fr_1fr]" : ""}`}>
              <HeroTile
                pick={main}
                priority
                className={side.length ? "col-span-2 aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-[3/4]" : "aspect-[4/3]"}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              />
              {side.map((pick, i) => (
                // Staggered by a second each, so the three photos never change at the same moment.
                <HeroTile
                  key={pick.slug}
                  pick={pick}
                  delay={(i + 1) * 1000}
                  className="aspect-[5/4] sm:aspect-auto sm:h-full sm:min-h-0"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 50vw"
                />
              ))}
            </div>
            <div className="mt-1 flex justify-end">
              <RotationPauseButton />
            </div>
          </div>
        )}

        {/* Phones: the buttons come straight after the photos (within the first screen), then the introduction. */}
        <div className="flex flex-col lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="order-2 mt-6 max-w-[34rem] text-base leading-relaxed text-muted sm:mt-0 sm:text-lg lg:order-1 lg:mt-5">
            Genuine used IKEA beds with mattress, daybeds and sofa cum beds, photographed as they are. Choose the size and
            colour you want, for Dubai and across the UAE, then message us on WhatsApp.
          </p>
          <div className="order-1 flex flex-col gap-3 min-[420px]:flex-row sm:order-2 sm:mt-9" data-cta="hero" data-hide-floating="">
            <Link href="/shop" className={buttonClasses("primary", "lg", "min-[420px]:px-8")}>
              Shop Furniture
            </Link>
            <WhatsAppButton variant="secondary">WhatsApp Inquiry</WhatsAppButton>
          </div>
          <ul className="order-3 mt-7 grid grid-cols-1 gap-2.5 border-t border-line pt-5 text-sm text-ink/80 min-[400px]:grid-cols-[auto_auto] min-[400px]:gap-x-5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-6 sm:pt-6">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon size={17} className="shrink-0 text-accent-strong" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function HeroTile({
  pick,
  priority = false,
  delay = 0,
  className = "",
  sizes,
}: {
  pick: ReturnType<typeof resolvePicks>[number];
  priority?: boolean;
  delay?: number;
  className?: string;
  sizes: string;
}) {
  return (
    <RotationScope frames={pick.frames} delay={delay} className={className}>
      <RotationLink className="group relative block h-full overflow-hidden rounded-[var(--radius-card)] bg-surface-2 active:opacity-95">
        <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.03]">
          <RotatingImage priority={priority} sizes={sizes} />
        </span>
        <RotationDots className="absolute right-3 top-3 z-[2] drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]" />
        <span className="absolute bottom-2 left-2 right-2 z-[2] flex flex-col rounded-[var(--radius-control)] bg-white/95 px-2.5 py-1.5 text-left shadow-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-1.5rem)] sm:px-3 sm:py-2">
          <span className="truncate text-sm font-medium text-ink">{pick.label}</span>
          <RotationDetail className="truncate text-[0.8125rem] text-muted" />
        </span>
      </RotationLink>
    </RotationScope>
  );
}

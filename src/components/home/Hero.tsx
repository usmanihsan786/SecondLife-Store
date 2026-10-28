import Link from "next/link";
import { CameraIcon, ChatIcon, ShieldCheckIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { RotatingImage, RotationDetail, RotationLink, RotationScope } from "@/components/ui/AutoRotate";
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

  return (
    <section className="border-b border-line">
      <Container className="grid items-center gap-8 pb-10 pt-8 sm:pb-14 sm:pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:py-16 xl:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">
            Second-hand · Genuine IKEA · UAE
          </p>
          <h1 className="mt-4 font-display text-[2.875rem] leading-[0.98] text-ink min-[400px]:text-[3.25rem] sm:text-[4rem] lg:text-[4.25rem] xl:text-[5rem]">
            {HOME_TITLE}
          </h1>
          <p className="mt-5 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg">
            Genuine used IKEA beds with mattress, daybeds and sofa cum beds, photographed as they are. Choose the size and
            colour you want, for Dubai and across the UAE, then message us on WhatsApp.
          </p>
          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-9" data-cta="hero">
            <Link href="/shop" className={buttonClasses("primary", "lg", "min-[420px]:px-8")}>
              Shop Furniture
            </Link>
            <WhatsAppButton variant="secondary">WhatsApp Inquiry</WhatsAppButton>
          </div>
          <ul className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6 text-sm text-ink/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon size={17} className="shrink-0 text-accent-strong" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {main && (
          <div className={`grid gap-3 sm:gap-4 ${side.length ? "grid-cols-[1.15fr_1fr]" : ""}`}>
            <HeroTile pick={main} priority className={side.length ? "row-span-2 aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]"} />
            {side.map((pick, i) => (
              // Staggered by a second each, so the three photos never change at the same moment.
              <HeroTile key={pick.slug} pick={pick} delay={(i + 1) * 1000} className="h-full min-h-0" />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function HeroTile({
  pick,
  priority = false,
  delay = 0,
  className = "",
}: {
  pick: ReturnType<typeof resolvePicks>[number];
  priority?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <RotationScope frames={pick.frames} delay={delay} className={className}>
      <RotationLink className="group relative block h-full overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.03]">
          <RotatingImage
            priority={priority}
            sizes={priority ? "(min-width: 1024px) 30vw, 55vw" : "(min-width: 1024px) 25vw, 45vw"}
          />
        </span>
        <span className="absolute bottom-2.5 left-2.5 right-2.5 z-[2] flex flex-col rounded-[var(--radius-control)] bg-white/95 px-2.5 py-1.5 text-left shadow-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-1.5rem)] sm:px-3 sm:py-2">
          <span className="truncate text-[0.8125rem] font-medium text-ink sm:text-sm">{pick.label}</span>
          <RotationDetail className="hidden truncate text-xs text-muted min-[400px]:block" />
        </span>
      </RotationLink>
    </RotationScope>
  );
}

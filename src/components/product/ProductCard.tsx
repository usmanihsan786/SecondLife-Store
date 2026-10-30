import Link from "next/link";
import { colors } from "@/data/options";
import {
  formatPrice,
  priceSummary,
  productColors,
  productPath,
  seriesLabel,
  sizeSummary,
  variantImageAlt,
  variantPrice,
  variantSummary,
} from "@/lib/product-utils";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";
import { RotatingImage, RotationDots, RotationLink, RotationScope, RotationWhatsApp, type RotationFrame } from "@/components/ui/AutoRotate";
import { buttonClasses } from "@/components/ui/button";
import { SoldOutBadge } from "./Badges";

type Props = {
  product: ResolvedProduct;
  /** The variant whose photo and details the card shows. */
  variant: ResolvedVariant;
  soldOut: boolean;
  /** Show the specific colour and size instead of the product's range. */
  showVariant?: boolean;
  priority?: boolean;
  /** Passed to the photo so the browser downloads the right width for the grid it sits in. */
  sizes?: string;
  /**
   * Optional photo rotation (homepage). The first frame must be the card's normal photo. The card's link follows the
   * photo on screen, so it opens the colour and size shown.
   */
  frames?: RotationFrame[];
  rotationDelay?: number;
  /** Where the card is shown, for analytics (e.g. "home_featured", "catalog", "related"). */
  list?: string;
};

/**
 * Photo-first product card: no box, no shadow. The whole card is one link (the title's link stretches over it).
 * Shows the series, name, sizes, colours, condition, availability and the price or "Ask for price".
 */
export function ProductCard({
  product,
  variant,
  soldOut,
  showVariant = false,
  priority,
  sizes = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw",
  frames,
  rotationDelay = 0,
  list = "catalog",
}: Props) {
  // A card for a specific filtered variant shows that variant's photo; otherwise the product's own cover photo comes first.
  const image =
    (showVariant ? undefined : product.cardImage) ??
    variant.images[0] ??
    product.variants.find((v) => v.images.length)?.images[0];
  const colorIds = productColors(product);
  const href = productPath(product, showVariant ? variant : undefined);
  const details = showVariant ? variantSummary(product, variant) : sizeSummary(product);
  const price = showVariant ? formatPrice(variantPrice(product, variant)) : priceSummary(product);

  const rotating = !!frames && frames.length > 1;
  const imageClass = `object-cover ${soldOut ? "opacity-70" : ""}`;
  const titleLinkClass = "after:absolute after:inset-0 focus-visible:outline-none";
  const track = { "data-track": "product_card", "data-product": product.slug, "data-list": list };

  const card = (
    <article className="group relative flex h-full flex-col" {...track}>
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
          {rotating ? (
            <RotatingImage sizes={sizes} priority={priority} className={imageClass} />
          ) : (
            <SmartImage
              src={image}
              alt={variantImageAlt(product, variant)}
              kind={placeholderKind(product.category)}
              sizes={sizes}
              priority={priority}
              className={imageClass}
            />
          )}
        </div>
        {soldOut && <SoldOutBadge className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3" />}
        {rotating && <RotationDots className="absolute bottom-3 left-3 z-[2] drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]" />}
      </div>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">{seriesLabel(product)}</p>
        <h3 className="mt-1 text-base font-medium leading-snug text-ink">
          {rotating ? (
            <RotationLink className={titleLinkClass} data-card-link="">
              {product.name}
            </RotationLink>
          ) : (
            <Link href={href} className={titleLinkClass} data-card-link="">
              {product.name}
            </Link>
          )}
        </h3>
        {details && <p className="mt-1 text-sm text-muted">{details}</p>}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-3">
          <p className="text-[0.9375rem] font-medium text-ink">{price}</p>
          {colorIds.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="sr-only">Colours: {colorIds.map((c) => colors[c].label).join(", ")}</span>
              {colorIds.map((c) => (
                <span
                  key={c}
                  title={colors[c].label}
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 rounded-full border border-ink/15 ${showVariant && variant.color === c ? "ring-1 ring-ink ring-offset-2 ring-offset-canvas" : ""}`}
                  style={{ backgroundColor: colors[c].swatch }}
                />
              ))}
            </div>
          )}
        </div>
        {/* Condition is shown on the product page; it is not repeated here as one label for every item. */}
        <p className={`mt-1.5 flex items-center gap-1.5 text-sm ${soldOut ? "text-sold" : "text-ok"}`}>
          <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${soldOut ? "bg-sold" : "bg-ok"}`} />
          {soldOut ? "Sold out" : "Available"}
        </p>
        {rotating && !soldOut && (
          // Above the card's stretched link, so it opens WhatsApp instead of the product page.
          <RotationWhatsApp className={buttonClasses("secondary", "md", "relative z-10 mt-4 w-full")}>
            Ask on WhatsApp
          </RotationWhatsApp>
        )}
      </div>
      {/* Whole-card focus ring, since the link covers the card */}
      <span
        className="pointer-events-none absolute -inset-1.5 rounded-[calc(var(--radius-card)+4px)] ring-ink group-has-[a[data-card-link]:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );

  return rotating ? (
    <RotationScope frames={frames} delay={rotationDelay} className="h-full">
      {card}
    </RotationScope>
  ) : (
    card
  );
}

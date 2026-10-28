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

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
          <SmartImage
            src={image}
            alt={variantImageAlt(product, variant)}
            kind={placeholderKind(product.category)}
            sizes={sizes}
            priority={priority}
            className={`object-cover ${soldOut ? "opacity-70" : ""}`}
          />
        </div>
        {soldOut && <SoldOutBadge className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3" />}
      </div>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent-strong sm:text-xs">{seriesLabel(product)}</p>
        <h3 className="mt-1 text-[0.9375rem] font-medium leading-snug text-ink sm:text-base">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        {details && <p className="mt-1 text-[0.8125rem] text-muted sm:text-sm">{details}</p>}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-3">
          <p className="text-sm font-medium text-ink">{price}</p>
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
        <p className="mt-1 text-[0.8125rem] text-muted">
          {product.condition}
          {!soldOut && <span className="text-ok"> · Available</span>}
        </p>
      </div>
      {/* Whole-card focus ring, since the link covers the card */}
      <span
        className="pointer-events-none absolute -inset-1.5 rounded-[calc(var(--radius-card)+4px)] ring-ink group-has-[a:focus-visible]:ring-2"
        aria-hidden="true"
      />
    </article>
  );
}

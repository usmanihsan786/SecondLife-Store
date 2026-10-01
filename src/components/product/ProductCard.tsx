import Link from "next/link";
import { colors } from "@/data/options";
import {
  priceSummary,
  productColors,
  seriesLabel,
  sizeSummary,
  variantImageAlt,
  variantPrice,
  formatPrice,
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
};

export function ProductCard({ product, variant, soldOut, showVariant = false, priority }: Props) {
  // A card for a specific filtered variant shows that variant's photo; otherwise the product's own cover photo comes first.
  const image =
    (showVariant ? undefined : product.cardImage) ??
    variant.images[0] ??
    product.variants.find((v) => v.images.length)?.images[0];
  const colorIds = productColors(product);
  const href = showVariant ? `/products/${product.slug}?variant=${variant.id}` : `/products/${product.slug}`;
  const details = showVariant ? variantSummary(product, variant) : sizeSummary(product);
  const price = showVariant ? formatPrice(variantPrice(product, variant)) : priceSummary(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line/70 bg-paper shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgb(74_54_40/0.06),0_14px_32px_-12px_rgb(74_54_40/0.22)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <div className="absolute inset-0 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
          <SmartImage
            src={image}
            alt={variantImageAlt(product, variant)}
            kind={placeholderKind(product.category)}
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
          />
        </div>
        {soldOut && <SoldOutBadge className="absolute left-3 top-3" />}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">{seriesLabel(product)}</p>
          <h3 className="mt-1 text-[1.0625rem] font-medium leading-snug text-ink">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>
          {details && <p className="mt-1 text-sm text-muted">{details}</p>}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line/70 pt-3">
          <p className="text-[0.9375rem] font-medium text-espresso">{price}</p>
          {colorIds.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="sr-only">Colours: {colorIds.map((c) => colors[c].label).join(", ")}</span>
              {colorIds.map((c) => (
                <span
                  key={c}
                  title={colors[c].label}
                  aria-hidden="true"
                  className={`h-4 w-4 rounded-full border border-ink/15 ${showVariant && variant.color === c ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : ""}`}
                  style={{ backgroundColor: colors[c].swatch }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-[0.8125rem] text-muted">{product.condition}</p>
      </div>
      {/* Whole-card focus ring, since the link covers the card */}
      <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-accent-strong ring-offset-2 group-has-[a:focus-visible]:ring-2" aria-hidden="true" />
    </article>
  );
}

"use client";

import { colors, sizes } from "@/data/options";
import { orderedVariants } from "@/lib/filters";
import { formatPrice, variantPrice } from "@/lib/product-utils";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  product: ResolvedProduct;
  selectedId: string;
  onSelect: (variant: ResolvedVariant) => void;
};

/**
 * Every real colour and size of a product as a visual tile (its own photo, colour, size, stock and price), next to
 * the colour and size buttons. Choosing a tile selects that exact variant, like choosing its colour and size.
 */
export function VariantTiles({ product, selectedId, onSelect }: Props) {
  if (product.variants.length < 2) return null;
  const variants = orderedVariants(product);
  const kind = placeholderKind(product.category);

  return (
    <section aria-labelledby="variant-tiles-heading" className="mt-9 border-t border-line pt-7">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="variant-tiles-heading" className="text-xs font-medium uppercase tracking-[0.14em] text-ink">
          Available sizes &amp; colours
        </h2>
        <p className="text-sm text-muted">
          {variants.filter((v) => v.availability === "available").length} of {variants.length} available
        </p>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2">
        {variants.map((v) => {
          const selected = v.id === selectedId;
          const soldOut = v.availability !== "available";
          const sizeName = v.size ? product.sizeNames?.[v.size] : undefined;
          // Only a verified (numeric) price is shown on a tile; "Ask for price" is already next to the WhatsApp button.
          const price = variantPrice(product, v);
          return (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => onSelect(v)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-[var(--radius-control)] border p-2 text-left transition-colors ${
                  selected ? "border-ink bg-paper ring-1 ring-ink" : "border-line bg-paper hover:border-line-strong"
                }`}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-2">
                  <SmartImage src={v.images[0]} alt="" kind={kind} sizes="56px" className={`object-cover ${soldOut ? "opacity-60" : ""}`} />
                </span>
                <span className="min-w-0 text-sm leading-snug">
                  {v.color && (
                    <span className="flex items-center gap-1.5 text-ink">
                      <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full border border-ink/15" style={{ backgroundColor: colors[v.color].swatch }} />
                      {colors[v.color].label}
                    </span>
                  )}
                  {v.size && (
                    <span className="block font-medium text-ink">
                      {sizeName ? sizes[v.size].short : sizes[v.size].label}
                      {sizeName && <span className="font-normal text-muted"> {sizeName}</span>}
                    </span>
                  )}
                  <span className={`block text-[0.8125rem] ${soldOut ? "font-medium text-sold" : "text-ok"}`}>{soldOut ? "Sold out" : "Available"}</span>
                  {typeof price === "number" && <span className="block text-[0.8125rem] font-medium text-ink">{formatPrice(price)}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

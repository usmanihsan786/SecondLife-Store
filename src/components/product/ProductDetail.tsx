"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { colors, series, sizes } from "@/data/options";
import type { ColorId, SizeId } from "@/data/options";
import {
  colorLabel,
  defaultVariant,
  findVariant,
  formatPrice,
  isFullySoldOut,
  productColors,
  productPath,
  productSizes,
  variantFromParams,
  variantImageAlt,
  variantPrice,
  variantSummary,
} from "@/lib/product-utils";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { AvailabilityBadge } from "./Badges";
import { ProductGallery } from "./ProductGallery";
import { ProductInquiry } from "./ProductInquiry";
import { VariantSelector } from "./VariantSelector";

const noopSubscribe = () => () => {};

export function ProductDetail({ product }: { product: ResolvedProduct }) {
  // Open a specific variant from a link such as ?color=brown&size=160x200. Invalid values are ignored.
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const initial = variantFromParams(product, new URLSearchParams(search)) ?? defaultVariant(product);

  // The customer's choices. null means "not chosen yet", so the initial variant above is used.
  const [selectedColor, setSelectedColor] = useState<ColorId | undefined | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeId | undefined | null>(null);
  const color = selectedColor === null ? initial.color : selectedColor;
  const size = selectedSize === null ? initial.size : selectedSize;

  // The active variant is always the product variant matching the selected colour + size.
  const variant = findVariant(product, color, size) ?? initial;

  const ctaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const rememberInUrl = (next?: ResolvedVariant) => {
    if (!next) return;
    // Same link format as the WhatsApp message, so a copied address bar opens this exact variant.
    window.history.replaceState(window.history.state, "", productPath(product, next));
  };

  const chooseColor = (nextColor: ColorId) => {
    // Keep the current size if that combination exists, otherwise move to the first size this colour comes in.
    const sameColor = product.variants.filter((v) => v.color === nextColor);
    const nextSize = sameColor.some((v) => v.size === size)
      ? size
      : (sameColor.find((v) => v.availability === "available") ?? sameColor[0])?.size;
    setSelectedColor(nextColor);
    setSelectedSize(nextSize);
    rememberInUrl(findVariant(product, nextColor, nextSize));
  };

  const chooseSize = (nextSize: SizeId) => {
    setSelectedColor(color);
    setSelectedSize(nextSize);
    rememberInUrl(findVariant(product, color, nextSize));
  };

  // Show the phone sticky bar only once the main button has scrolled off the top, so it never covers the options.
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    const observer = new IntersectionObserver(([entry]) =>
      setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  // Lets fixed elements elsewhere (the floating WhatsApp button, the footer spacing) make room for the sticky bar.
  useEffect(() => {
    document.body.toggleAttribute("data-sticky-bar", showStickyBar);
    return () => document.body.removeAttribute("data-sticky-bar");
  }, [showStickyBar]);

  const soldOut = variant.availability === "sold-out";
  const summary = variantSummary(product, variant);
  const price = formatPrice(variantPrice(product, variant));
  const kind = placeholderKind(product.category);
  const colorIds = productColors(product);
  const sizeIds = productSizes(product);

  return (
    <>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery key={variant.id} images={variant.images} alt={variantImageAlt(product, variant)} kind={kind} />
        </div>

        <div className="min-w-0">
          <Link
            href={`/shop?series=${product.series}`}
            className="text-xs font-medium uppercase tracking-[0.16em] text-accent-strong hover:text-espresso"
          >
            {series[product.series].label} series
          </Link>
          <h1 className="mt-2 font-display text-[1.875rem] font-semibold leading-[1.15] text-ink sm:text-[2.25rem]">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span>{product.condition}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/50" />
            <span>Preloved, genuine IKEA</span>
          </div>
          <p className="mt-5 text-xl font-medium text-espresso" aria-live="polite">
            {price}
          </p>

          <div className="mt-7 border-t border-line pt-7">
            <VariantSelector
              product={product}
              selectedColor={color}
              selectedSize={size}
              onColorChange={chooseColor}
              onSizeChange={chooseSize}
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3" aria-live="polite">
            <AvailabilityBadge availability={variant.availability} />
            <p className="text-sm text-muted">
              {soldOut
                ? isFullySoldOut(product)
                  ? "All options of this item are currently sold out."
                  : `${summary ? `${summary} is` : "This option is"} sold out. Other options may be available.`
                : summary
                  ? `${summary} is available.`
                  : "This item is available."}
            </p>
          </div>

          <p className="mt-6 whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base">
            {product.description}
          </p>
          {variant.variantDescription && (
            <p className="mt-4 whitespace-pre-line rounded-lg border-l-2 border-accent bg-paper px-4 py-3 text-[0.9375rem] leading-relaxed text-ink/85">
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">
                About this {[colorLabel(variant.color), variant.size ? sizes[variant.size].short : undefined].filter(Boolean).join(" ") || "item"}
              </span>
              {variant.variantDescription}
            </p>
          )}

          <div ref={ctaRef} className="mt-7">
            <ProductInquiry product={product} variant={variant} />
            <p className="mt-3 text-center text-sm text-muted">
              We reply on WhatsApp. Ask us about available delivery options in the UAE.
            </p>
          </div>

          <section aria-labelledby="details-heading" className="mt-10 border-t border-line pt-7">
            <h2 id="details-heading" className="text-sm font-medium uppercase tracking-[0.14em] text-ink">
              Details
            </h2>
            <dl className="mt-4 divide-y divide-line/70 text-[0.9375rem]">
              <DetailRow label="Series">{series[product.series].label}</DetailRow>
              <DetailRow label="Condition">{product.condition}</DetailRow>
              {product.includes && product.includes.length > 0 && (
                <DetailRow label="Includes">
                  <ul>
                    {product.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </DetailRow>
              )}
              {colorIds.length > 0 && (
                <DetailRow label="Colours">{colorIds.map((c) => colors[c].label).join(", ")}</DetailRow>
              )}
              {sizeIds.length > 0 && (
                <DetailRow label="Sizes">
                  {sizeIds
                    .map((s) => (product.sizeNames?.[s] ? `${sizes[s].label} (${product.sizeNames[s]})` : sizes[s].label))
                    .join(", ")}
                </DetailRow>
              )}
            </dl>
            <p className="mt-5 rounded-lg bg-sand/70 p-4 text-sm leading-relaxed text-muted">
              This is preloved furniture. We select pieces in good condition, and the photos show the item for each
              option. If you would like more photos or measurements, just ask us on WhatsApp.
            </p>
          </section>
        </div>
      </div>

      {/* Phone-only sticky inquiry bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-sheet)] backdrop-blur-sm transition-[transform,opacity] duration-300 lg:hidden ${
          showStickyBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        aria-hidden={!showStickyBar}
        inert={!showStickyBar}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{product.name}</p>
            <p className="truncate text-xs text-muted">{[summary, soldOut ? "Sold out" : price].filter(Boolean).join(" · ")}</p>
          </div>
          <div className="shrink-0">
            <ProductInquiry product={product} variant={variant} compact />
          </div>
        </div>
      </div>
    </>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

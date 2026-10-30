"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { categories, colors, series, sizes } from "@/data/options";
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
import { VariantTiles } from "./VariantTiles";

const noopSubscribe = () => () => {};
/** The phone header's height (h-16) plus a little room: content under it is out of sight. */
const HEADER_OFFSET = 72;

const inlineLink = "underline decoration-accent underline-offset-4 hover:decoration-ink";

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

  // One product_view per page load; variant_select for each colour or size the visitor picks.
  useEffect(() => {
    trackEvent("product_view", { product_slug: product.slug, page_path: window.location.pathname });
  }, [product.slug]);
  const trackVariant = (next?: ResolvedVariant) =>
    next && trackEvent("variant_select", { product_slug: product.slug, variant: next.id, availability: next.availability });

  const chooseColor = (nextColor: ColorId) => {
    // Keep the current size if that combination exists, otherwise move to the first size this colour comes in.
    const sameColor = product.variants.filter((v) => v.color === nextColor);
    const nextSize = sameColor.some((v) => v.size === size)
      ? size
      : (sameColor.find((v) => v.availability === "available") ?? sameColor[0])?.size;
    setSelectedColor(nextColor);
    setSelectedSize(nextSize);
    rememberInUrl(findVariant(product, nextColor, nextSize));
    trackVariant(findVariant(product, nextColor, nextSize));
  };

  const chooseSize = (nextSize: SizeId) => {
    setSelectedColor(color);
    setSelectedSize(nextSize);
    rememberInUrl(findVariant(product, color, nextSize));
    trackVariant(findVariant(product, color, nextSize));
  };

  // A tile picks one exact variant. On phones the gallery is above the fold line, so bring it back into view.
  const galleryRef = useRef<HTMLDivElement>(null);
  const chooseVariant = (next: ResolvedVariant) => {
    setSelectedColor(next.color);
    setSelectedSize(next.size);
    rememberInUrl(next);
    trackVariant(next);
    const gallery = galleryRef.current;
    if (gallery && gallery.getBoundingClientRect().top < 0) {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gallery.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };

  // Show the phone sticky bar only once the main button has scrolled off the top, so it never covers the options.
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    // The top margin skips the strip behind the sticky header: a button hidden under it counts as scrolled away.
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0)),
      { rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px` },
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
  const rawPrice = variantPrice(product, variant);
  const price = formatPrice(rawPrice);
  const kind = placeholderKind(product.category);
  const colorIds = productColors(product);
  const sizeIds = productSizes(product);
  const isBed = product.category === "beds" || product.category === "storage-beds";
  const hasMattress = product.includes?.some((item) => /mattress/i.test(item)) ?? false;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 xl:gap-20">
        <div ref={galleryRef} className="min-w-0 scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            key={variant.id}
            images={variant.images}
            notes={variant.imageAlts}
            alt={variantImageAlt(product, variant)}
            kind={kind}
          />
        </div>

        <div className="min-w-0">
          <Link
            href={series[product.series].href}
            className="inline-flex min-h-8 items-center text-xs font-medium uppercase tracking-[0.16em] text-accent-strong hover:text-ink"
          >
            {series[product.series].label} series
          </Link>
          <h1 className="mt-1 font-display text-[2.125rem] leading-[1.06] text-ink sm:text-[2.75rem]">Used {product.name}</h1>
          <ul className="mt-4 flex flex-wrap gap-2 text-[0.8125rem] text-ink">
            <li className="rounded-full bg-surface-2 px-3 py-1">{product.condition}</li>
            <li className="rounded-full bg-surface-2 px-3 py-1">Used, genuine IKEA</li>
            {hasMattress && <li className="rounded-full bg-surface-2 px-3 py-1">Mattress included</li>}
          </ul>

          <div className="mt-6" aria-live="polite">
            <p className="text-[1.375rem] font-medium leading-tight text-ink">{price}</p>
            {typeof rawPrice !== "number" && (
              <p className="mt-1 text-sm text-muted">Message us for the price of the exact size and colour you choose.</p>
            )}
          </div>

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

          <div ref={ctaRef} className="mt-6" data-cta="product_inquiry" data-hide-floating="">
            <ProductInquiry product={product} variant={variant} />
            <a
              href={`tel:${siteConfig.phoneLink}`}
              className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 text-[0.9375rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              <PhoneIcon size={16} />
              Or call {siteConfig.phoneDisplay}
            </a>
            <p className="mt-1 text-center text-sm text-muted">We reply on WhatsApp. Ask us about available delivery options in the UAE.</p>
          </div>

          <VariantTiles product={product} selectedId={variant.id} onSelect={chooseVariant} />

          <div className="mt-9 border-t border-line pt-7">
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink">About this item</h2>
            <p className="mt-3 whitespace-pre-line text-[0.9375rem] leading-[1.7] text-ink/85 sm:text-base">{product.description}</p>
            {variant.variantDescription && (
              <p className="mt-4 whitespace-pre-line border-l-2 border-accent bg-surface px-4 py-3 text-[0.9375rem] leading-relaxed text-ink/85">
                <span className="block text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">
                  About this {[colorLabel(variant.color), variant.size ? sizes[variant.size].short : undefined].filter(Boolean).join(" ") || "item"}
                </span>
                {variant.variantDescription}
              </p>
            )}
          </div>

          <section aria-labelledby="details-heading" className="mt-9 border-t border-line pt-7">
            <h2 id="details-heading" className="text-xs font-medium uppercase tracking-[0.14em] text-ink">
              Details
            </h2>
            <dl className="mt-3 divide-y divide-line text-[0.9375rem]">
              <DetailRow label="Series">{series[product.series].label}</DetailRow>
              <DetailRow label="Category">{categories[product.category].label}</DetailRow>
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
              {colorIds.length > 0 && <DetailRow label="Colours">{colorIds.map((c) => colors[c].label).join(", ")}</DetailRow>}
              {sizeIds.length > 0 && (
                <DetailRow label={isBed ? "Mattress sizes" : "Sizes"}>
                  {sizeIds
                    .map((s) => (product.sizeNames?.[s] ? `${sizes[s].label} (${product.sizeNames[s]})` : sizes[s].label))
                    .join(", ")}
                </DetailRow>
              )}
              <DetailRow label="Measurements">Ask us for the exact measurements of this item.</DetailRow>
            </dl>
          </section>

          <section aria-labelledby="before-heading" className="mt-9 rounded-[var(--radius-card)] bg-surface p-5 sm:p-6">
            <h2 id="before-heading" className="font-display text-[1.5rem] leading-tight text-ink">
              Before you buy
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This is used furniture. We select pieces in good condition, and the photos show the item for each option. As with
              any used furniture, there may be light signs of use.
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ink">
              <Check>Ask us for extra photos or close-ups of anything you want to check.</Check>
              <Check>
                Confirm the measurements fit your room
                {isBed && (
                  <>
                    {" "}(see our{" "}
                    <Link href="/guides/ikea-bed-sizes-uae" className={inlineLink}>
                      IKEA bed size guide
                    </Link>
                    )
                  </>
                )}
                .
              </Check>
              <Check>
                Tell us your area so we can confirm the{" "}
                <Link href="/delivery-areas" className={inlineLink}>
                  delivery options
                </Link>
                .
              </Check>
            </ul>
          </section>
        </div>
      </div>

      {/* Phone-only sticky inquiry bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-sheet)] backdrop-blur-sm transition-[transform,opacity] duration-300 lg:hidden ${
          showStickyBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        aria-hidden={!showStickyBar}
        inert={!showStickyBar}
        data-cta="sticky_bar"
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

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

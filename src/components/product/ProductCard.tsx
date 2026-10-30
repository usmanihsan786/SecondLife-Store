import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { colors, sizes } from "@/data/options";
import {
  formatPrice,
  priceSummary,
  productColors,
  productPath,
  seriesLabel,
  sizeSummary,
  variantImageAlt,
  variantPrice,
} from "@/lib/product-utils";
import { productInquiryMessage, similarItemsMessage, whatsappUrl } from "@/lib/whatsapp";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  RotatingImage,
  RotationDetail,
  RotationDots,
  RotationLink,
  RotationScope,
  RotationWhatsApp,
  type RotationFrame,
} from "@/components/ui/AutoRotate";
import { buttonClasses } from "@/components/ui/button";
import { SoldOutBadge } from "./Badges";

type Props = {
  product: ResolvedProduct;
  /** The variant whose photo and details the card shows. */
  variant: ResolvedVariant;
  soldOut: boolean;
  /**
   * A card for one exact variant (colour + size): its own photos only, its colour and size, its price, stock and
   * WhatsApp message, and a link that opens the product page on that variant.
   */
  showVariant?: boolean;
  priority?: boolean;
  /** Passed to the photo so the browser downloads the right width for the grid it sits in. */
  sizes?: string;
  /**
   * Optional photo rotation across a product's variants (homepage featured cards). The first frame must be the card's
   * normal photo. The card's link and size line follow the photo on screen. Not used for variant cards.
   */
  frames?: RotationFrame[];
  rotationDelay?: number;
  /** Where the card is shown, for analytics (e.g. "home_featured", "catalog", "related"). */
  list?: string;
};

/** "160 × 200 cm" plus the friendly name when the product has one, e.g. "160 × 200 cm · Queen". */
function sizeText(product: ResolvedProduct, variant: ResolvedVariant) {
  if (!variant.size) return undefined;
  const name = product.sizeNames?.[variant.size];
  const label = sizes[variant.size].label;
  return name && name !== label ? `${label} · ${name}` : label;
}

/**
 * Photo-first product card: no box, no shadow. The whole card is one link (the title's link stretches over it).
 * Product cards show the range of sizes and colours; variant cards show one exact colour and size.
 */
export function ProductCard({
  product,
  variant,
  soldOut,
  showVariant = false,
  priority,
  sizes: imageSizes = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw",
  frames,
  rotationDelay = 0,
  list = "catalog",
}: Props) {
  // A variant card only ever shows that variant's own photos: never another colour's or size's, never the cover photo.
  const image = showVariant
    ? variant.images[0]
    : (product.cardImage ?? variant.images[0] ?? product.variants.find((v) => v.images.length)?.images[0]);
  const href = productPath(product, showVariant ? variant : undefined);
  const alt = variantImageAlt(product, variant);
  const message = soldOut ? similarItemsMessage(product, variant) : productInquiryMessage(product, variant);

  // Variant cards rotate through the photos of that same colour and size only, all opening the same page.
  const ownFrames: RotationFrame[] | undefined =
    showVariant && variant.images.length > 1
      ? variant.images.map((src, i) => ({ src, alt: variantImageAlt(product, variant, i), href, inquiry: message }))
      : undefined;
  const rotation = showVariant ? ownFrames : frames;
  const rotating = !!rotation && rotation.length > 1;
  // Product cards with a cross-variant rotation follow the photo with their link; variant cards keep one link.
  const followsPhoto = rotating && !showVariant;

  const imageClass = `object-cover ${soldOut ? "opacity-70" : ""}`;
  const titleLinkClass = "after:absolute after:inset-0 focus-visible:outline-none";
  const track = {
    "data-track": "product_card",
    "data-product": product.slug,
    "data-list": list,
    ...(showVariant ? { "data-variant": variant.id } : {}),
  };
  const colorIds = productColors(product);
  const title = showVariant ? (product.shortName ?? product.name) : product.name;

  const card = (
    <article className="group @container relative flex h-full flex-col" {...track}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 min-[360px]:aspect-square">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
          {rotating ? (
            <RotatingImage sizes={imageSizes} priority={priority} className={imageClass} />
          ) : (
            <SmartImage src={image} alt={alt} kind={placeholderKind(product.category)} sizes={imageSizes} priority={priority} className={imageClass} />
          )}
        </div>
        {soldOut && <SoldOutBadge className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3" />}
        {rotating && <RotationDots className="absolute bottom-3 left-3 z-[2] drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]" />}
      </div>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        {/* Variant cards name the model in the title, so the series label would only repeat it. */}
        {!showVariant && <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">{seriesLabel(product)}</p>}
        <h3 className="text-base font-medium leading-snug text-ink">
          {followsPhoto ? (
            <RotationLink className={titleLinkClass} data-card-link="" draggable={false}>
              {title}
            </RotationLink>
          ) : (
            <Link href={href} className={titleLinkClass} data-card-link="" draggable={false}>
              {title}
            </Link>
          )}
        </h3>

        {showVariant ? (
          <dl className="mt-1.5 space-y-0.5 text-sm text-ink">
            {variant.color && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Colour</dt>
                <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full border border-ink/15" style={{ backgroundColor: colors[variant.color].swatch }} />
                <dd>{colors[variant.color].label}</dd>
              </div>
            )}
            {variant.size && (
              <div>
                <dt className="sr-only">Size</dt>
                <dd className="font-medium">{sizeText(product, variant)}</dd>
              </div>
            )}
          </dl>
        ) : rotating ? (
          <p className="mt-1 text-sm text-muted">
            <RotationDetail fallback={sizeSummary(product)} />
          </p>
        ) : (
          sizeSummary(product) && <p className="mt-1 text-sm text-muted">{sizeSummary(product)}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3">
          <p className="text-[0.9375rem] font-medium text-ink">{showVariant ? formatPrice(variantPrice(product, variant)) : priceSummary(product)}</p>
          {showVariant ? (
            // Condition is shown on the product page; it is not repeated here as one label for every item.
            <p className={`flex items-center gap-1.5 text-sm ${soldOut ? "font-medium text-sold" : "text-ok"}`}>
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${soldOut ? "bg-sold" : "bg-ok"}`} />
              {soldOut ? "Sold out" : "Available"}
            </p>
          ) : (
            colorIds.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="sr-only">Colours: {colorIds.map((c) => colors[c].label).join(", ")}</span>
                {colorIds.map((c) => (
                  <span key={c} title={colors[c].label} aria-hidden="true" className="h-3.5 w-3.5 rounded-full border border-ink/15" style={{ backgroundColor: colors[c].swatch }} />
                ))}
              </div>
            )
          )}
        </div>
        {!showVariant && (
          <p className={`mt-1.5 flex items-center gap-1.5 text-sm ${soldOut ? "font-medium text-sold" : "text-ok"}`}>
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${soldOut ? "bg-sold" : "bg-ok"}`} />
            {soldOut ? "Sold out" : "Available"}
          </p>
        )}

        {/* Above the card's stretched link, so it opens WhatsApp instead of the product page. */}
        {showVariant ? (
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            aria-label={`${soldOut ? "Ask for similar to" : "Ask on WhatsApp about"} ${[title, variant.color && colors[variant.color].label, sizeText(product, variant)].filter(Boolean).join(", ")}`}
            className={buttonClasses("secondary", "sm", `relative z-10 mt-3.5 w-full gap-1.5 ${soldOut ? "text-muted" : ""}`)}
          >
            <WhatsAppIcon size={17} />
            {/* Narrow two-column cards on phones get the short label; the link's accessible name is always complete. */}
            {soldOut ? (
              "Ask for similar"
            ) : (
              <span>
                <span className="hidden @[13.5rem]:inline">Ask on </span>WhatsApp
              </span>
            )}
          </a>
        ) : (
          followsPhoto &&
          !soldOut && (
            <RotationWhatsApp className={buttonClasses("secondary", "sm", "relative z-10 mt-3.5 w-full gap-1.5")}>
              <span>
                <span className="hidden @[13.5rem]:inline">Ask on </span>WhatsApp
              </span>
            </RotationWhatsApp>
          )
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
    <RotationScope frames={rotation} delay={rotationDelay} className="h-full">
      {card}
    </RotationScope>
  ) : (
    card
  );
}

import { siteConfig } from "@/config/site";
import { colors, sizes } from "@/data/options";
import { absoluteUrl, productPath } from "@/lib/product-utils";
import type { Product, ProductVariant } from "@/types/product";

/** The product fields a message needs. Works with both the raw data in products.ts and resolved products. */
type MessageProduct = Pick<Product, "name" | "shortName" | "slug" | "sizeNames" | "variants">;

export const defaultWhatsAppMessage =
  "Hello, I'm interested in your preloved IKEA furniture. Could you tell me what is currently available?";

/** The message is always URL-encoded here, so callers pass plain text. */
export function whatsappUrl(message: string = defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * The item block shared by product messages:
 *
 *   IKEA MALM Bed
 *   Color: Brown
 *   Size: 160 × 200 cm
 *
 *   Product:
 *   https://…/products/ikea-malm-bed?color=brown&size=160x200
 *
 * Colour and size lines are left out when they do not apply.
 */
function itemDetails(product: MessageProduct, variant?: ProductVariant) {
  const sizeName = variant?.size ? product.sizeNames?.[variant.size] : undefined;
  return [
    product.shortName ?? product.name,
    ...(variant?.color ? [`Color: ${colors[variant.color].label}`] : []),
    ...(variant?.size ? [`Size: ${sizes[variant.size].label}${sizeName ? ` (${sizeName})` : ""}`] : []),
    "",
    "Product:",
    absoluteUrl(productPath(product, variant)),
  ];
}

export function productInquiryMessage(product: MessageProduct, variant?: ProductVariant) {
  return ["Hello, I'm interested in this item:", "", ...itemDetails(product, variant), "", "Is it still available?"].join("\n");
}

export function similarItemsMessage(product: MessageProduct, variant?: ProductVariant) {
  return [
    "Hello, I saw that this item is sold out:",
    "",
    ...itemDetails(product, variant),
    "",
    "Do you have anything similar available?",
  ].join("\n");
}

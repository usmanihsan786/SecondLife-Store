import { siteConfig } from "@/config/site";
import { colors, sizes } from "@/data/options";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";

export const defaultWhatsAppMessage =
  "Hello, I'm interested in your preloved IKEA furniture. Could you tell me what is currently available?";

export function whatsappUrl(message: string = defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function describe(product: ResolvedProduct, variant?: ResolvedVariant) {
  const details = [
    variant?.color ? colors[variant.color].label : undefined,
    variant?.size ? sizes[variant.size].short.replace(/ /g, "") : undefined,
  ].filter(Boolean);
  return [product.shortName ?? product.name, ...details].join(", ");
}

export function productInquiryMessage(product: ResolvedProduct, variant?: ResolvedVariant) {
  return `Hello, I'm interested in the ${describe(product, variant)}. Is it still available?`;
}

export function similarItemsMessage(product: ResolvedProduct, variant?: ResolvedVariant) {
  return `Hello, I saw that the ${describe(product, variant)} is sold out. Do you have anything similar available?`;
}

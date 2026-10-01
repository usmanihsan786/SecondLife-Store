import { buttonClasses } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { productInquiryMessage, similarItemsMessage } from "@/lib/whatsapp";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";

type Props = { product: ResolvedProduct; variant: ResolvedVariant; compact?: boolean };

/** The main call to action. Switches to a sold-out state when the selected variant is sold out. */
export function ProductInquiry({ product, variant, compact = false }: Props) {
  const size = compact ? "md" : "lg";
  if (variant.availability === "sold-out") {
    const similar = (
      <WhatsAppButton message={similarItemsMessage(product, variant)} variant="secondary" size={size} className="w-full">
        Ask about similar items
      </WhatsAppButton>
    );
    // The sticky bar already says "Sold out", so it only needs the alternative action.
    if (compact) return similar;
    return (
      <div className="flex flex-col gap-2.5">
        <button type="button" disabled className={buttonClasses("primary", size, "w-full")}>
          Currently sold out
        </button>
        {similar}
      </div>
    );
  }
  return (
    <WhatsAppButton message={productInquiryMessage(product, variant)} size={size} className="w-full">
      Ask about this item
    </WhatsAppButton>
  );
}

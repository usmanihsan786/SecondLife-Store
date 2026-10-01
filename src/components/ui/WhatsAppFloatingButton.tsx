"use client";

import type { MouseEvent } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { products } from "@/data/products";
import { defaultVariant, variantFromParams } from "@/lib/product-utils";
import { productInquiryMessage, similarItemsMessage, whatsappUrl } from "@/lib/whatsapp";

const DEFAULT_MESSAGE = "Hello, I'm interested in your preloved furniture. Can you help me?";

/**
 * On a product page, the message for the colour and size on screen.
 * The product page keeps its selection in the address bar (?color=…&size=…), so it is read from there
 * at click time instead of sharing state with the page.
 */
function currentProductMessage() {
  const slug = window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1];
  const product = slug ? products.find((p) => p.slug === decodeURIComponent(slug)) : undefined;
  if (!product || product.variants.length === 0) return undefined;
  const variant = variantFromParams(product, new URLSearchParams(window.location.search)) ?? defaultVariant(product);
  return variant.availability === "sold-out" ? similarItemsMessage(product, variant) : productInquiryMessage(product, variant);
}

/** Round WhatsApp button fixed to the bottom-right corner of every page. */
export function WhatsAppFloatingButton() {
  const updateLink = (e: MouseEvent<HTMLAnchorElement>) => {
    // Set just before WhatsApp opens, so it always matches what the visitor is looking at.
    e.currentTarget.href = whatsappUrl(currentProductMessage() ?? DEFAULT_MESSAGE);
  };

  return (
    <a
      href={whatsappUrl(DEFAULT_MESSAGE)}
      onClick={updateLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      // Below lg, when a product page's sticky inquiry bar is showing (body[data-sticky-bar]), the button moves up above it.
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 rounded-full transition-[bottom] duration-300 focus-visible:outline-none md:right-6 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] max-lg:in-data-sticky-bar:bottom-[calc(5.25rem+env(safe-area-inset-bottom))]!"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg bg-espresso px-3 py-1.5 text-sm font-medium text-paper opacity-0 shadow-[var(--shadow-card)] transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
      >
        WhatsApp us
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-6px_rgb(37_211_102/0.55),0_2px_6px_rgb(37_33_30/0.18)] transition-[scale,box-shadow,background-color] duration-200 ease-out group-hover:scale-110 group-hover:bg-[#1FBF5B] group-hover:shadow-[0_12px_28px_-6px_rgb(37_211_102/0.65),0_4px_10px_rgb(37_33_30/0.22),0_0_0_6px_rgb(37_211_102/0.14)] group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-accent-strong group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas motion-reduce:transition-none md:h-[60px] md:w-[60px]">
        {/* Soft light that sweeps across now and then; styles in globals.css (hidden with reduced motion). */}
        <span aria-hidden="true" className="whatsapp-shine" />
        <WhatsAppIcon size={28} className="relative" />
      </span>
    </a>
  );
}

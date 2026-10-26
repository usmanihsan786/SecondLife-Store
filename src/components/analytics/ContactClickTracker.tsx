"use client";

import { useEffect } from "react";
import { currentProductSlug, trackEvent } from "@/lib/analytics";

/**
 * Records every WhatsApp, phone and email link click on the site as an analytics event:
 * whatsapp_click, phone_click or email_click, with where on the page it was (cta_location),
 * the page path and, on product pages, the product. A click is an enquiry started, not a confirmed sale.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = href.startsWith("https://wa.me/")
        ? "whatsapp_click"
        : href.startsWith("tel:")
          ? "phone_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : null;
      if (!name) return;
      const location =
        link.closest<HTMLElement>("[data-cta]")?.dataset.cta ??
        (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page");
      trackEvent(name, { cta_location: location, page_path: window.location.pathname, product_slug: currentProductSlug() });
    };
    // Bubble phase, so links that build their href on click (the floating WhatsApp button) are already updated.
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

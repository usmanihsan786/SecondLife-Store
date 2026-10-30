"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { currentProductSlug, trackEvent } from "@/lib/analytics";

/**
 * Site-wide analytics, with one listener and one observer for the whole page:
 * - whatsapp_click / phone_click / email_click: every contact link, with where on the page it was (cta_location),
 *   the page path and, on product pages, the product. A click is an enquiry started, not a confirmed sale.
 * - product_card_click: a product card that opens the product page (list: home_featured, catalog, related).
 *   A WhatsApp button inside a card counts only as whatsapp_click, never also as a card click.
 * - category_click: a homepage category tile.
 * - product_impression: a product card at least half on screen, once per product per page view.
 */
export function ContactClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const contact = href.startsWith("https://wa.me/")
        ? "whatsapp_click"
        : href.startsWith("tel:")
          ? "phone_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : null;
      if (contact) {
        const location =
          link.closest<HTMLElement>("[data-cta]")?.dataset.cta ??
          (link.closest("[data-track=product_card]") ? "product_card" : null) ??
          (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page");
        const slug = link.closest<HTMLElement>("[data-product]")?.dataset.product ?? currentProductSlug();
        trackEvent(contact, { cta_location: location, page_path: window.location.pathname, product_slug: slug });
        return;
      }
      const card = link.closest<HTMLElement>("[data-track=product_card]");
      if (card) {
        trackEvent("product_card_click", { product_slug: card.dataset.product, list: card.dataset.list, page_path: window.location.pathname });
        return;
      }
      const category = link.closest<HTMLElement>("[data-track=category]");
      if (category) trackEvent("category_click", { category: category.dataset.category, page_path: window.location.pathname });
    };
    // Bubble phase, so links that build their href on click (the floating WhatsApp button) are already updated.
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Product impressions, re-observed on every page.
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const key = `${el.dataset.list}:${el.dataset.product}`;
          if (seen.has(key)) continue;
          seen.add(key);
          observer.unobserve(el);
          trackEvent("product_impression", { product_slug: el.dataset.product, list: el.dataset.list, page_path: window.location.pathname });
        }
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-track=product_card]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

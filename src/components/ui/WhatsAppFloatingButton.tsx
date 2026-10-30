"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { products } from "@/data/products";
import { defaultVariant, variantFromParams } from "@/lib/product-utils";
import { productInquiryMessage, similarItemsMessage, whatsappUrl } from "@/lib/whatsapp";

const DEFAULT_MESSAGE = "Hello, I'm interested in your used IKEA furniture. Can you help me?";

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

/**
 * On phones and tablets the button steps aside so it never covers what the visitor is reading:
 * it hides while scrolling down, and while another WhatsApp button is on screen (elements marked
 * data-hide-floating: the hero buttons, the product enquiry button, the footer) or the product page's sticky
 * enquiry bar is showing. It comes back when the visitor scrolls up or stops. Desktop keeps it in place.
 */
function useStepAside() {
  const pathname = usePathname();
  const [scrollingDown, setScrollingDown] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let idle = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) setScrollingDown(y > lastY && y > 160);
      lastY = y;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setScrollingDown(false), 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  // Re-run on every page: each page has its own marked elements.
  useEffect(() => {
    const visible = new Set<Element>();
    // The top margin skips the strip behind the sticky header (h-16), so a marked button hidden under it doesn't count.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setCovered(visible.size > 0);
      },
      { rootMargin: "-72px 0px 0px 0px" },
    );
    document.querySelectorAll("[data-hide-floating]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return scrollingDown || covered;
}

/** Round WhatsApp button fixed to the bottom-right corner of every page. */
export function WhatsAppFloatingButton() {
  const away = useStepAside();
  const updateLink = (e: MouseEvent<HTMLAnchorElement>) => {
    // Set just before WhatsApp opens, so it always matches what the visitor is looking at.
    e.currentTarget.href = whatsappUrl(currentProductMessage() ?? DEFAULT_MESSAGE);
  };

  return (
    <a
      href={whatsappUrl(DEFAULT_MESSAGE)}
      onClick={updateLink}
      data-cta="floating"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      // Below lg it steps aside (see useStepAside); with a product page's sticky bar showing, the bar's own WhatsApp
      // button is the only one, so this one hides.
      className={`group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 rounded-full transition-[opacity,translate] duration-300 focus-visible:outline-none md:right-6 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] max-lg:in-data-sticky-bar:pointer-events-none max-lg:in-data-sticky-bar:translate-y-24 max-lg:in-data-sticky-bar:opacity-0 ${
        away ? "max-lg:pointer-events-none max-lg:translate-y-24 max-lg:opacity-0" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-[var(--radius-control)] bg-ink px-3 py-1.5 text-sm font-medium text-paper opacity-0 shadow-[var(--shadow-card)] transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block"
      >
        WhatsApp us
      </span>
      <span className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_8px_20px_-6px_rgb(37_211_102/0.55),0_2px_6px_rgb(37_33_30/0.18)] transition-[scale,box-shadow,background-color] duration-200 ease-out group-hover:scale-105 group-hover:bg-[#1FBF5B] group-hover:shadow-[0_12px_28px_-6px_rgb(37_211_102/0.65),0_4px_10px_rgb(37_33_30/0.22),0_0_0_6px_rgb(37_211_102/0.14)] group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-ink group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-canvas motion-reduce:transition-none md:h-[60px] md:w-[60px]">
        <WhatsAppIcon size={28} />
      </span>
    </a>
  );
}

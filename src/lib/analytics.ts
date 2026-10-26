/**
 * Conversion events, ready for Google Analytics 4 / Google Tag Manager.
 * Events are pushed to window.dataLayer (read by GTM) and sent with gtag() when GA4 is installed.
 * Until either is added to the site, this does nothing. Never put names, phone numbers or message text in params.
 */
type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...clean });
  window.gtag?.("event", name, clean);
}

/** The product slug when the visitor is on a product page, e.g. "ikea-malm-bed". */
export function currentProductSlug() {
  const match = window.location.pathname.match(/^\/products\/([^/]+)/);
  return match?.[1];
}

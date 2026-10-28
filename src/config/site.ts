/**
 * Central business settings.
 * Every value marked PLACEHOLDER must be replaced before the site goes live.
 */

// The official business phone and WhatsApp number, in international format.
// This is the ONLY place the number is typed: the shown number, tap-to-call links,
// WhatsApp links and structured data are all derived from it below.
const PHONE = "+971553267566";

const phoneDigits = PHONE.replace(/\D/g, "");
// "+971553267566" → "+971 55 326 7566"
const phoneDisplay = `+${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 5)} ${phoneDigits.slice(5, 8)} ${phoneDigits.slice(8)}`;

export const siteConfig = {
  // The store name, typed once. Used for the header/footer logo, inner page titles ("… | name"),
  // link previews, the copyright line and the site name in structured data.
  // ⚠️ DRAFT – pending trademark clearance: "IKEA" is a registered trademark of Inter IKEA Systems B.V.
  // Do not publish this branch until the name is cleared (see seo-audit/REBRAND-RISK-AND-MIGRATION.md).
  name: "IKEA Used Furniture",
  tagline: "Genuine used IKEA furniture in Dubai & the UAE",

  // Derived from PHONE above; change the number there, not here.
  // WhatsApp: digits only, e.g. https://wa.me/971553267566
  whatsappNumber: phoneDigits,
  // As shown on the site, e.g. "+971 55 326 7566".
  phoneDisplay,
  // Tap-to-call and structured data, e.g. tel:+971553267566
  phoneLink: PHONE,

  // ✏️ Your real contact email, e.g. "info@yourdomain.ae". Leave "" to hide every email link on the site
  // (footer, Contact page, "Send by email" button). It was the placeholder hello@example.com until Oct 2026.
  email: "" as string,

  // PLACEHOLDER: Instagram profile URL. Set to "" to hide the Instagram link.
  instagramUrl: "",

  // Your OWN Google Business Profile, used for the "Read our customer reviews on Google" links.
  // Leave "" until this business has its own profile: showing another business's reviews as ours would mislead customers.
  googleReviewsUrl: "",

  // ✏️ CONFIRM: your public Facebook page. Shown in structured data (sameAs) only when set.
  // Left empty on purpose: facebook.com/ikeausedfurniturebedsofa showed "This content isn't available"
  // to logged-out visitors on 23 Oct 2026. Fill it in once the page is public.
  facebookUrl: "",

  // The address the site is published at (no trailing slash). Used for product links in
  // WhatsApp messages, link previews (Open Graph), the sitemap and search engines.
  url: "https://www.ikeiausedfurniture.ae",

  serviceArea: "United Arab Emirates",
  currency: "AED",

  // Shown wherever a price has not been entered yet.
  priceFallback: "Ask for price",

  // Brand images. The header/footer logo is this mark plus the store name set in the site's own fonts.
  // width/height are each file's real pixel size; update them if you replace a file.
  logo: {
    // Square house-and-lamp mark (also the favicon artwork). Used in the logo and as the Organization logo.
    mark: "/images/brand/mark.png",
    markSize: 512,
    // Link-preview image for pages without a photo of their own (WhatsApp, Facebook, X…).
    share: "/images/brand/share.png",
    shareWidth: 1200,
    shareHeight: 630,
  },
} as const;

/** Header links on desktop. The logo links home. */
export const mainNav = [
  { label: "Shop all", href: "/shop" },
  { label: "Beds", href: "/beds" },
  { label: "Daybeds", href: "/daybeds" },
  { label: "Sofa Beds", href: "/sofa-beds" },
  { label: "Storage Beds", href: "/storage-beds" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
] as const;

/** Phone menu: shopping links first, then information pages. */
export const shopNav = [
  { label: "Shop all furniture", href: "/shop" },
  { label: "Used IKEA beds", href: "/beds" },
  { label: "Used IKEA daybeds", href: "/daybeds" },
  { label: "Used IKEA sofa beds", href: "/sofa-beds" },
  { label: "Ottoman storage beds", href: "/storage-beds" },
] as const;

export const infoNav = [
  { label: "Home", href: "/" },
  { label: "Buying guides", href: "/guides" },
  { label: "Delivery & areas", href: "/delivery-areas" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

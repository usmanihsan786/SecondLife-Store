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
  // Your business name (used for the logo alt text, footer, page titles and link previews).
  name: "SecondLife",
  tagline: "Used IKEA Furniture in the UAE",

  // Derived from PHONE above; change the number there, not here.
  // WhatsApp: digits only, e.g. https://wa.me/971553267566
  whatsappNumber: phoneDigits,
  // As shown on the site, e.g. "+971 55 326 7566".
  phoneDisplay,
  // Tap-to-call and structured data, e.g. tel:+971553267566
  phoneLink: PHONE,

  // PLACEHOLDER: contact email.
  email: "hello@example.com",

  // PLACEHOLDER: Instagram profile URL. Set to "" to hide the Instagram link.
  instagramUrl: "",

  // ✏️ CONFIRM: your Google Business Profile. Used for the "Read our Google reviews" links.
  // Set to "" to hide them. Better: replace with the profile's full Google Maps link (Business Profile → Share).
  googleReviewsUrl: "https://share.google/gXVPryfmEhJFmsG8R",

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
  priceFallback: "Contact for price",

  // The logo, used in the header, footer and as the link-preview image (WhatsApp, Facebook…).
  // width/height are the file's real pixel size; update them if you replace the file.
  logo: {
    main: "/images/brand/logo.png",
    width: 1254,
    height: 1254,
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Beds", href: "/beds" },
  { label: "Daybeds", href: "/daybeds" },
  { label: "Sofa Beds", href: "/sofa-beds" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

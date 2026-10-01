/**
 * Central business settings.
 * Every value marked PLACEHOLDER must be replaced before the site goes live.
 */
export const siteConfig = {
  // Your business name (used for the logo alt text, footer, page titles and link previews).
  name: "SecondLife",
  tagline: "The Pre-Owned Furniture Store",

  // PLACEHOLDER: your WhatsApp number in international format, digits only, no "+" or spaces.
  // Example: "971501234567"
  whatsappNumber: "971553267566",

  // PLACEHOLDER: phone number exactly as it should be shown on the site.
  phoneDisplay: "+971 55 326 7566",
  // PLACEHOLDER: the same phone number for tap-to-call links (keep the "+").
  phoneLink: "+971553267566",

  // PLACEHOLDER: contact email.
  email: "hello@example.com",

  // PLACEHOLDER: Instagram profile URL. Set to "" to hide the Instagram link.
  instagramUrl: "",

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

/**
 * Central business settings.
 * Every value marked PLACEHOLDER must be replaced before the site goes live.
 */
export const siteConfig = {
  // PLACEHOLDER: your business name (used for the logo alt text, footer and metadata).
  name: "Preloved Furniture UAE",

  // PLACEHOLDER: your WhatsApp number in international format, digits only, no "+" or spaces.
  // Example: "971501234567"
  whatsappNumber: "971XXXXXXXXX",

  // PLACEHOLDER: phone number exactly as it should be shown on the site.
  phoneDisplay: "+971 XX XXX XXXX",
  // PLACEHOLDER: the same phone number for tap-to-call links (keep the "+").
  phoneLink: "+971XXXXXXXXX",

  // PLACEHOLDER: contact email.
  email: "hello@example.com",

  // PLACEHOLDER: Instagram profile URL. Set to "" to hide the Instagram link.
  instagramUrl: "",

  // PLACEHOLDER: the address the site will be published at (no trailing slash).
  url: "https://www.example.com",

  serviceArea: "United Arab Emirates",
  currency: "AED",

  // Shown wherever a price has not been entered yet.
  priceFallback: "Contact for price",

  // Paths for the logo you supply. See OWNER-GUIDE.md.
  logo: {
    main: "/images/brand/logo.png",
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

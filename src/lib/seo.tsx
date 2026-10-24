import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/product-utils";

/** The homepage's exact search title (also its Open Graph and X title). Nothing is added to it. */
export const HOME_TITLE = "IKEA Used Furniture";

export const HOME_DESCRIPTION =
  "IKEA Used Furniture. Shop genuine used IKEA beds, daybeds, sofa beds and more in Dubai and across the UAE. Contact us on WhatsApp for availability.";

/** Link-preview image used wherever a page has no photo of its own. */
export const defaultShareImage = {
  url: siteConfig.logo.main,
  width: siteConfig.logo.width,
  height: siteConfig.logo.height,
  alt: `${siteConfig.name} - ${siteConfig.tagline}`,
};

/** Structured data script. `<` is escaped so the JSON can never close the script tag early. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for a trail of site paths. Home is added first automatically. */
export function breadcrumbJsonLd(trail: Crumb[]) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : siteConfig.url,
    })),
  };
}

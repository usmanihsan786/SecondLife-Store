import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/product-utils";

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

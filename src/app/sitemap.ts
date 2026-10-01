import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/beds", "/daybeds", "/sofa-beds", "/about", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...getProducts().map((p) => ({ url: `${siteConfig.url}/products/${p.slug}` })),
  ];
}

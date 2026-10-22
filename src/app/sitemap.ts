import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { guides } from "@/data/guides";
import { getProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/shop", "/beds", "/daybeds", "/sofa-beds", "/storage-beds", "/ikea-brimnes", "/ikea-hemnes",
    "/delivery-areas", "/guides", "/about", "/contact",
  ];
  return [
    ...pages.map((path) => ({ url: `${siteConfig.url}${path}` })),
    ...getProducts().map((p) => ({ url: `${siteConfig.url}/products/${p.slug}` })),
    ...guides.map((g) => ({ url: `${siteConfig.url}/guides/${g.slug}`, lastModified: g.updated })),
  ];
}

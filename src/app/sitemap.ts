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
    // Product photos are listed as image sitemap entries so Google can find the real stock photos.
    ...getProducts().map((p) => ({
      url: `${siteConfig.url}/products/${p.slug}`,
      images: [...new Set([p.cardImage, ...p.variants.flatMap((v) => v.images)].filter((src): src is string => Boolean(src)))]
        .slice(0, 20)
        .map((src) => (/^https?:\/\//.test(src) ? src : `${siteConfig.url}${src}`)),
    })),
    ...guides.map((g) => ({ url: `${siteConfig.url}/guides/${g.slug}`, lastModified: g.updated })),
  ];
}

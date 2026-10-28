import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root. A stray package-lock.json in the parent folder otherwise makes Next guess the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Let phones and other devices on the local network load the dev server's scripts
  // (e.g. http://192.168.1.20:3000). Without this, Next.js blocks them, the page never
  // hydrates, and every button (colours, sizes, filters, menu) stops responding.
  // Development only: this has no effect on the production build.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    localPatterns: [{ pathname: "/images/**" }],
  },
  // Addresses from the site's previous version that Google still shows (Search Console, Oct 2026).
  // They returned 404; these permanent (308) redirects send visitors and their search history to the matching
  // page today. The non-www host is redirected to www by Vercel before these rules run.
  async redirects() {
    return [
      { source: "/collections/beds", destination: "/beds", permanent: true },
      // The old listing was the BRIMNES queen bed: today's BRIMNES bed in white, 160 × 200 cm ("Queen").
      {
        source: "/collections/ikea-brimness-queen-bed",
        destination: "/products/ikea-brimnes-bed?color=white&size=160x200",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

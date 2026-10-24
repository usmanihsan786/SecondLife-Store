import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { siteConfig } from "@/config/site";
import { defaultShareImage, HOME_TITLE } from "@/lib/seo";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

// Site-wide defaults only. metadataBase turns every relative URL below into https://www.ikeiausedfurniture.ae/…
// The homepage sets its own exact title, description and social titles in app/page.tsx. No page-specific title,
// description or URL lives here, so other pages never inherit the homepage's.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.logo.main],
  },
};

/**
 * Site-wide structured data: who runs the site and what the site is.
 * Only real business details go here. Add the email once the placeholder in site.ts is replaced,
 * and add Instagram / Google Business Profile links to sameAs when they exist.
 */
// Public profiles of this business. Empty values are skipped.
const sameAs = [siteConfig.instagramUrl, siteConfig.facebookUrl].filter(Boolean);

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo.main}`,
      description: "Independent reseller of used, genuine IKEA furniture in the UAE. Not affiliated with or endorsed by IKEA.",
      telephone: siteConfig.phoneLink,
      // ✏️ CONFIRM: add the cities or emirates you deliver to (e.g. { "@type": "City", name: "Dubai" }) once confirmed.
      areaServed: { "@type": "Country", name: siteConfig.serviceArea },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      // Google's documented fallback: the lowercase domain as the last alternate name.
      alternateName: ["ikeiausedfurniture.ae"],
      url: siteConfig.url,
      inLanguage: "en-AE",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} antialiased`} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-espresso focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}

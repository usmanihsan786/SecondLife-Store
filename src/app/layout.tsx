import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { siteConfig } from "@/config/site";
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

const description =
  "Genuine second-hand IKEA beds with mattress, daybeds and sofa beds in excellent condition: MALM, BRIMNES, HEMNES and FRIHETEN. Real photos of every size. Message us on WhatsApp.";
const homeTitle = `Used IKEA Furniture in UAE – Beds, Daybeds & Sofa Beds | ${siteConfig.name}`;
const shareTitle = homeTitle;
const shareImage = {
  url: siteConfig.logo.main,
  width: siteConfig.logo.width,
  height: siteConfig.logo.height,
  alt: `${siteConfig.name} - ${siteConfig.tagline}`,
};

// Site-wide defaults. metadataBase turns every relative URL below into https://www.ikeiausedfurniture.ae/…
// Product pages override the title, description and image with their own product data.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
    title: shareTitle,
    description,
    url: siteConfig.url,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: [siteConfig.logo.main],
  },
};

/**
 * Site-wide structured data: who runs the site and what the site is.
 * Only real business details go here. Add the email once the placeholder in site.ts is replaced,
 * and add Instagram / Google Business Profile links to sameAs when they exist.
 */
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
      areaServed: { "@type": "Country", name: siteConfig.serviceArea },
      ...(siteConfig.instagramUrl ? { sameAs: [siteConfig.instagramUrl] } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
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

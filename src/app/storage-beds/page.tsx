import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

// The frame brand of the ottoman bed is still being confirmed, so this page does not call the frames IKEA.
export const metadata: Metadata = {
  title: "Used Hydraulic Ottoman Storage Beds with IKEA Mattress",
  description: "Second-hand hydraulic ottoman storage beds sold with an IKEA mattress, in Queen 160 and King 180 cm, white or black. The base lifts up for storage underneath.",
  alternates: { canonical: "/storage-beds" },
};

export default async function StorageBedsPage({ searchParams }: PageProps<"/storage-beds">) {
  return (
    <CatalogPage
      title="Ottoman Storage Beds with Mattress"
      eyebrow="Used storage beds"
      intro={<p>Hydraulic lift-up beds with storage underneath, sold together with an IKEA mattress.</p>}
      breadcrumb={[
        { name: "Used IKEA Beds", path: "/beds" },
        { name: "Storage Beds", path: "/storage-beds" },
      ]}
      products={getProducts().filter((p) => p.category === "storage-beds")}
      searchParams={await searchParams}
    >
      <ContentSections
        sections={[
          {
            heading: "Why choose an ottoman bed",
            body: (
              <p>
                The base of a hydraulic ottoman bed lifts up, giving you a large storage space under the
                mattress for bedding, luggage and seasonal clothes. That makes it useful in UAE apartments with limited
                wardrobe space. Prefer a classic frame? See our <Link href="/beds">used IKEA beds</Link>.
              </p>
            ),
          },
        ]}
      />
      <Faq
        items={[
          {
            question: "Which sizes are available?",
            answer: <p>Queen (160 × 200 cm) and King (180 × 200 cm), in white or black, each with an IKEA mattress.</p>,
          },
          faqDelivery,
          faqHowToBuy,
        ]}
      />
      <LinkCards
        title="Also available"
        links={[
          { href: "/products/ikea-malm-bed", label: "IKEA MALM bed" },
          { href: "/products/ikea-brimnes-bed", label: "IKEA BRIMNES bed" },
          { href: "/guides/ikea-bed-sizes-uae", label: "IKEA bed sizes in cm" },
        ]}
      />
    </CatalogPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA Sofa Beds – FRIHETEN with Storage, UAE",
  description: "Second-hand IKEA FRIHETEN sofa beds with storage, in gray and beige. Seating every day and a bed for guests. Ask about availability in the UAE on WhatsApp.",
  alternates: { canonical: "/sofa-beds" },
};

export default async function SofaBedsPage({ searchParams }: PageProps<"/sofa-beds">) {
  return (
    <CatalogPage
      title="Second-hand IKEA Sofa Beds"
      intro={<p>Seating for every day and a bed for guests, with storage built in. Genuine used IKEA FRIHETEN sofa beds in gray and beige.</p>}
      breadcrumb={[{ name: "Used IKEA Sofa Beds", path: "/sofa-beds" }]}
      products={getProducts().filter((p) => p.category === "sofa-beds")}
      searchParams={await searchParams}
    >
      <ContentSections
        sections={[
          {
            heading: "IKEA FRIHETEN sofa bed with storage",
            body: (
              <p>
                <Link href="/products/ikea-friheten-sofa-bed">IKEA FRIHETEN</Link> is a sofa that converts into a bed and
                has a storage space for bedding. It is a practical choice for a living room that sometimes has to host
                guests. Choose gray or beige to see photos of that sofa bed.
              </p>
            ),
          },
          {
            heading: "Sofa bed or daybed?",
            body: (
              <p>
                A sofa bed is a sofa first; a daybed is a bed first. If someone will sleep on it every night, a{" "}
                <Link href="/daybeds">daybed with two mattresses</Link> may suit you better. Read our{" "}
                <Link href="/guides/ikea-daybed-vs-sofa-bed">IKEA daybed vs sofa bed guide</Link>.
              </p>
            ),
          },
        ]}
      />
      <Faq
        items={[
          {
            question: "Does the FRIHETEN sofa bed have storage?",
            answer: <p>Yes. FRIHETEN has a storage space, useful for bedding and pillows.</p>,
          },
          faqGenuine,
          faqDelivery,
          faqHowToBuy,
        ]}
      />
      <LinkCards
        title="Also available"
        links={[
          { href: "/daybeds", label: "Used IKEA daybeds" },
          { href: "/beds", label: "Used IKEA beds" },
          { href: "/guides/buying-used-ikea-furniture-uae", label: "Buying used IKEA furniture" },
        ]}
      />
    </CatalogPage>
  );
}

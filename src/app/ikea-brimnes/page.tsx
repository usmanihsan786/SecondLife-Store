import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA BRIMNES Beds & Daybed – UAE",
  description: "Second-hand IKEA BRIMNES furniture in white: BRIMNES beds with an IKEA mattress in Double, Queen and King, and the BRIMNES daybed with two mattresses.",
  alternates: { canonical: "/ikea-brimnes" },
};

export default function BrimnesPage() {
  return (
    <CatalogPage
      title="Used IKEA BRIMNES Beds & Daybed"
      eyebrow="IKEA BRIMNES range"
      intro={<p>Genuine second-hand IKEA BRIMNES furniture in white, with a bright, simple look.</p>}
      breadcrumb={[{ name: "IKEA BRIMNES", path: "/ikea-brimnes" }]}
      products={getProducts().filter((p) => p.series === "brimnes")}
    >
      <ContentSections
        sections={[
          {
            heading: "BRIMNES bed or BRIMNES daybed?",
            body: (
              <ul>
                <li>
                  <Link href="/products/ikea-brimnes-bed">IKEA BRIMNES bed</Link>: Double (140 × 200 cm), Queen (160 × 200
                  cm) or King (180 × 200 cm), sold with an IKEA mattress.
                </li>
                <li>
                  <Link href="/products/ikea-brimnes-daybed">IKEA BRIMNES daybed</Link>: a sofa by day and a bed at night,
                  with two IKEA mattresses.
                </li>
              </ul>
            ),
          },
          {
            heading: "About the IKEA BRIMNES range",
            body: (
              <p>
                BRIMNES is IKEA&apos;s white range with clean, practical shapes. Some BRIMNES versions have drawers or a
                headboard with storage, so ask us which features the piece you like has. See how it compares in our{" "}
                <Link href="/guides/ikea-malm-vs-brimnes-vs-hemnes">MALM vs BRIMNES vs HEMNES guide</Link>.
              </p>
            ),
          },
        ]}
      />
      <Faq items={[faqGenuine, faqDelivery, faqHowToBuy]} />
      <LinkCards
        title="Other IKEA ranges"
        links={[
          { href: "/products/ikea-malm-bed", label: "IKEA MALM" },
          { href: "/ikea-hemnes", label: "IKEA HEMNES" },
          { href: "/products/ikea-friheten-sofa-bed", label: "IKEA FRIHETEN" },
        ]}
      />
    </CatalogPage>
  );
}

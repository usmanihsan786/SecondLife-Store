import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA HEMNES Daybed & Bed – White and Gray, UAE",
  description: "Second-hand IKEA HEMNES furniture: the HEMNES daybed with two IKEA mattresses in white or gray, plus HEMNES beds with an IKEA mattress when in stock.",
  alternates: { canonical: "/ikea-hemnes" },
};

export default async function HemnesPage({ searchParams }: PageProps<"/ikea-hemnes">) {
  return (
    <CatalogPage
      title="Used IKEA HEMNES Daybed & Bed"
      eyebrow="IKEA HEMNES range"
      intro={<p>Genuine second-hand IKEA HEMNES furniture with a classic, traditional look, in white or gray.</p>}
      breadcrumb={[{ name: "IKEA HEMNES", path: "/ikea-hemnes" }]}
      products={getProducts().filter((p) => p.series === "hemnes")}
      searchParams={await searchParams}
    >
      <ContentSections
        sections={[
          {
            heading: "HEMNES daybed or HEMNES bed?",
            body: (
              <ul>
                <li>
                  <Link href="/products/ikea-hemnes-daybed">IKEA HEMNES daybed</Link>: seating by day and a bed at night,
                  with two IKEA mattresses, in white or gray.
                </li>
                <li>
                  <Link href="/products/ikea-hemnes-bed">IKEA HEMNES bed</Link>: Queen and King, in white or gray, sold
                  with an IKEA mattress. Message us to check when it is back in stock.
                </li>
              </ul>
            ),
          },
          {
            heading: "About the IKEA HEMNES range",
            body: (
              <p>
                HEMNES has a traditional style with panelled details that suits classic and family homes. The daybed is
                especially popular for guest rooms. Compare it with other ranges in our{" "}
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
          { href: "/ikea-brimnes", label: "IKEA BRIMNES" },
          { href: "/products/ikea-friheten-sofa-bed", label: "IKEA FRIHETEN" },
        ]}
      />
    </CatalogPage>
  );
}

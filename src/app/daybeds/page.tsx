import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA Daybeds with 2 Mattresses – BRIMNES & HEMNES",
  description: "Second-hand IKEA BRIMNES and HEMNES daybeds, each with two IKEA mattresses. A sofa by day and a bed at night. Ask about availability in the UAE on WhatsApp.",
  alternates: { canonical: "/daybeds" },
};

export default async function DaybedsPage({ searchParams }: PageProps<"/daybeds">) {
  return (
    <CatalogPage
      title="Used IKEA Daybeds with Two Mattresses"
      intro={
        <p>
          A sofa by day and a bed at night. Our genuine second-hand IKEA BRIMNES and HEMNES daybeds each come with two
          IKEA mattresses.
        </p>
      }
      breadcrumb={[{ name: "Used IKEA Daybeds", path: "/daybeds" }]}
      products={getProducts().filter((p) => p.category === "daybeds")}
      searchParams={await searchParams}
    >
      <ContentSections
        sections={[
          {
            heading: "IKEA BRIMNES or HEMNES daybed?",
            body: (
              <ul>
                <li>
                  <Link href="/products/ikea-brimnes-daybed">IKEA BRIMNES daybed</Link>: white, with a bright and simple
                  look that suits modern rooms.
                </li>
                <li>
                  <Link href="/products/ikea-hemnes-daybed">IKEA HEMNES daybed</Link>: a classic, traditional style, in
                  white or gray.
                </li>
              </ul>
            ),
          },
          {
            heading: "Who a daybed suits",
            body: (
              <p>
                A daybed is a good fit for guest rooms, kids&apos; rooms, studios and smaller UAE apartments where one room
                has to work as a lounge and a bedroom. Because you sleep on real mattresses, it is comfortable for
                everyday use. Still deciding? Compare options in our{" "}
                <Link href="/guides/ikea-daybed-vs-sofa-bed">IKEA daybed vs sofa bed guide</Link>.
              </p>
            ),
          },
        ]}
      />
      <Faq
        items={[
          {
            question: "Do the daybeds come with mattresses?",
            answer: <p>Yes. Each daybed includes two IKEA mattresses.</p>,
          },
          {
            question: "Can a daybed be used as a double bed?",
            answer: <p>IKEA BRIMNES and HEMNES daybeds are designed to pull out so the two mattresses lie side by side. Ask us to confirm the sizes for the item you want.</p>,
          },
          faqGenuine,
          faqDelivery,
          faqHowToBuy,
        ]}
      />
      <LinkCards
        title="Also available"
        links={[
          { href: "/beds", label: "Used IKEA beds", description: "Single to king, with an IKEA mattress" },
          { href: "/sofa-beds", label: "Used IKEA sofa beds", description: "FRIHETEN with storage" },
          { href: "/ikea-hemnes", label: "All IKEA HEMNES" },
          { href: "/ikea-brimnes", label: "All IKEA BRIMNES" },
        ]}
      />
    </CatalogPage>
  );
}

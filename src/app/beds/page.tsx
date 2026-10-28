import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  // Search Console (Oct 2026): bed searches use "for sale", the city and the size ("used double bed for sale in dubai").
  title: "Used IKEA Beds for Sale in Dubai & UAE, with Mattress",
  description: "Second-hand IKEA MALM, BRIMNES and HEMNES beds for sale in Dubai and the UAE, each with an IKEA mattress. Single, double, queen and king, with real photos.",
  alternates: { canonical: "/beds" },
};

export default function BedsPage() {
  return (
    <CatalogPage
      title="Used IKEA Beds with Mattress"
      intro={
        <p>
          Genuine second-hand IKEA beds for sale, each sold together with an IKEA mattress: MALM, BRIMNES and HEMNES in
          single, double, queen and king sizes, plus hydraulic ottoman storage beds, for customers in Dubai and across the
          UAE. Pick a size and colour to see that bed.
        </p>
      }
      breadcrumb={[{ name: "Used IKEA Beds", path: "/beds" }]}
      products={getProducts().filter((p) => p.category === "beds" || p.category === "storage-beds")}
    >
      <ContentSections
        sections={[
          {
            heading: "Shop used IKEA beds by size",
            body: (
              <>
                <p>IKEA beds in the UAE use European sizes. The size is the mattress size, width × length:</p>
                <ul>
                  <li><Link href="/beds?size=90x200">Used IKEA single bed, 90 × 200 cm</Link>: MALM</li>
                  <li><Link href="/beds?size=140x200">Used IKEA double bed, 140 × 200 cm</Link>: MALM and BRIMNES</li>
                  <li><Link href="/beds?size=160x200">Used IKEA queen bed, 160 × 200 cm</Link>: MALM and BRIMNES</li>
                  <li><Link href="/beds?size=180x200">Used IKEA king bed, 180 × 200 cm</Link>: MALM and BRIMNES</li>
                </ul>
                <p>Each product page shows which colours and sizes are available now.</p>
                <p>
                  Not sure which size fits your room? Read our <Link href="/guides/ikea-bed-sizes-uae">IKEA bed size guide</Link>.
                </p>
              </>
            ),
          },
          {
            heading: "Shop by IKEA range",
            body: (
              <ul>
                <li><Link href="/products/ikea-malm-bed">IKEA MALM bed</Link>: simple, modern frame in white, black and brown, from single to king.</li>
                <li><Link href="/products/ikea-brimnes-bed">IKEA BRIMNES bed</Link>: bright white, in Double, Queen and King.</li>
                <li><Link href="/products/ikea-hemnes-bed">IKEA HEMNES bed</Link>: classic style in white or gray (currently sold out; ask us when it is back).</li>
                <li><Link href="/storage-beds">Hydraulic ottoman storage beds</Link>: the base lifts up for storage underneath.</li>
              </ul>
            ),
          },
          {
            heading: "Every bed comes with a mattress",
            body: (
              <p>
                Each bed is sold together with an IKEA mattress of the right size, so it is ready to sleep on. Our
                furniture is used, not new: we check its condition before listing it and photograph our own stock.
                Compare the ranges in our <Link href="/guides/ikea-malm-vs-brimnes-vs-hemnes">MALM vs BRIMNES vs HEMNES guide</Link>.
              </p>
            ),
          },
        ]}
      />
      <Faq
        items={[
          {
            question: "Do your used IKEA beds include a mattress?",
            answer: <p>Yes. Every bed on this page is sold together with an IKEA mattress in the same size as the frame.</p>,
          },
          {
            question: "What is the difference between queen and king?",
            answer: <p>In IKEA sizes, queen is 160 × 200 cm and king is 180 × 200 cm.</p>,
          },
          faqGenuine,
          faqDelivery,
          faqHowToBuy,
        ]}
      />
      <LinkCards
        title="Also available"
        links={[
          { href: "/daybeds", label: "Used IKEA daybeds", description: "A sofa by day, a bed at night" },
          { href: "/sofa-beds", label: "Used IKEA sofa beds", description: "FRIHETEN with storage" },
          { href: "/guides/buying-used-ikea-furniture-uae", label: "Buying used IKEA furniture", description: "What to check before you buy" },
        ]}
      />
    </CatalogPage>
  );
}

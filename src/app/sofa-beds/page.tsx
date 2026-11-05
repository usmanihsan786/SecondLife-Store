import type { Metadata } from "next";
import Link from "next/link";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { faqDelivery, faqGenuine, faqHowToBuy } from "@/data/faq";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  // Search Console (Oct–Nov 2026): this page is reached by "used sofa bed" and "used sofa bed for sale in dubai".
  title: "Used IKEA Sofa Beds for Sale in Dubai & UAE – FRIHETEN",
  description: "Second-hand IKEA FRIHETEN corner sofa cum bed with storage for sale in Dubai and the UAE, in gray and beige, with real photos of each sofa. Ask on WhatsApp.",
  alternates: { canonical: "/sofa-beds" },
};

export default function SofaBedsPage() {
  return (
    <CatalogPage
      title="Second-hand IKEA Sofa Beds"
      intro={<p>Seating for every day and a bed for guests, with storage built in. Genuine used IKEA FRIHETEN corner sofa beds, also called a sofa cum bed, in gray and beige.</p>}
      breadcrumb={[{ name: "Used IKEA Sofa Beds", path: "/sofa-beds" }]}
      products={getProducts().filter((p) => p.category === "sofa-beds")}
    >
      <ContentSections
        sections={[
          {
            heading: "IKEA FRIHETEN corner sofa cum bed with storage",
            body: (
              <p>
                Our <Link href="/products/ikea-friheten-sofa-bed">IKEA FRIHETEN</Link> is the corner (L-shape) version: the
                chaise lifts up to reveal storage for bedding, and the seat pulls out into a bed. It is a practical choice
                for a living room that sometimes has to host guests. Choose gray or beige to see photos of that sofa
                cum bed.
              </p>
            ),
          },
          {
            heading: "Buying a used IKEA sofa bed in Dubai and the UAE",
            body: (
              <>
                <p>
                  Each colour has its own photos of the actual sofa bed, so you can see the one you would get: the{" "}
                  <Link href="/products/ikea-friheten-sofa-bed?color=gray">used IKEA FRIHETEN sofa bed in gray</Link> or the{" "}
                  <Link href="/products/ikea-friheten-sofa-bed?color=beige">used IKEA FRIHETEN sofa bed in beige</Link>.
                </p>
                <p>
                  Before you decide, ask us on WhatsApp for close-ups of the cover and the pull-out bed, the measurements, and
                  the delivery cost and timing for your area. We deliver across the UAE, from Dubai, Sharjah and Ajman to Abu
                  Dhabi and the northern emirates. See <Link href="/delivery-areas">delivery across the UAE</Link>.
                </p>
              </>
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
            answer: <p>Yes. The chaise of our FRIHETEN corner sofa bed lifts up to give you storage for bedding and pillows.</p>,
          },
          {
            question: "Is a sofa bed the same as a sofa cum bed?",
            answer: <p>Yes. &quot;Sofa cum bed&quot; is another name for a sofa bed: a sofa that converts into a bed.</p>,
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

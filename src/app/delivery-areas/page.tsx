import type { Metadata } from "next";
import Link from "next/link";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { categoryLinks, faqGenuine, faqHowToBuy } from "@/data/faq";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

/**
 * One page for location searches, instead of near-identical city pages (which Google treats as doorway pages).
 * Confirmed by the owner (6 Nov 2026): delivery across the whole UAE, all seven emirates. Fees and timings are not
 * published yet, so customers ask for them on WhatsApp; never state a price, a time or free delivery here unless confirmed.
 */
const emirates = ["Dubai", "Sharjah", "Ajman", "Abu Dhabi", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

export const metadata: Metadata = {
  title: "Used IKEA Furniture in Dubai, Sharjah, Ajman & Abu Dhabi",
  description: "Genuine used IKEA beds, daybeds and sofa beds, delivered to all seven emirates: Dubai, Sharjah, Ajman, Abu Dhabi and the rest of the UAE. Ask on WhatsApp for cost and timing.",
  alternates: { canonical: "/delivery-areas" },
};

const trail = [{ name: "Delivery & Areas", path: "/delivery-areas" }];

export default function DeliveryAreasPage() {
  return (
    <>
      <PageHeader
        trail={trail}
        eyebrow="Delivery & areas"
        title="Used IKEA Furniture, Delivered Across the UAE"
        description={
          <>
            <p>
              We are based in the UAE and sell genuine second-hand IKEA beds, daybeds and sofa beds, and we deliver to all
              seven emirates. Tell us your area on WhatsApp and we will confirm the delivery cost and timing for the item
              you want.
            </p>
            <ul aria-label="Emirates we deliver to" className="mt-5 flex flex-wrap gap-2">
              {emirates.map((e) => (
                <li key={e} className="rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-sm text-ink">
                  {e}
                </li>
              ))}
            </ul>
          </>
        }
        actions={<WhatsAppButton>Ask about delivery cost and timing</WhatsAppButton>}
      />
      <Container className="space-y-16 py-14 sm:py-20">
        <ContentSections
          sections={[
            {
              heading: "Used IKEA furniture in Dubai",
              body: (
                <p>
                  Furnishing an apartment or villa in Dubai? Browse our <Link href="/beds">used IKEA beds with mattress</Link>,{" "}
                  <Link href="/daybeds">IKEA daybeds</Link> and <Link href="/sofa-beds">IKEA sofa beds</Link>. We deliver
                  across Dubai; send us your area and we will confirm the cost and timing.
                </p>
              ),
            },
            {
              heading: "Second-hand IKEA furniture in Sharjah and Ajman",
              body: (
                <p>
                  We deliver to Sharjah and Ajman. Send us your area for the cost and timing. Popular choices for family
                  homes are the{" "}
                  <Link href="/products/ikea-hemnes-daybed">IKEA HEMNES daybed</Link> for guest rooms and the{" "}
                  <Link href="/products/ikea-malm-bed">IKEA MALM bed</Link> in every size from single to king.
                </p>
              ),
            },
            {
              heading: "Used IKEA furniture in Abu Dhabi",
              body: (
                <p>
                  We deliver to Abu Dhabi too. Message us with your area and the item you like, and we will confirm the
                  delivery cost and timing before you decide.
                </p>
              ),
            },
            {
              heading: "Ras Al Khaimah, Fujairah and Umm Al Quwain",
              body: (
                <p>
                  We deliver to the northern emirates as well, so customers in Ras Al Khaimah, Fujairah and Umm Al Quwain can
                  order the same beds, daybeds and sofa beds. Ask us on WhatsApp for the cost and timing to your area.
                </p>
              ),
            },
            {
              heading: "How buying works",
              body: (
                <ul className="space-y-1">
                  <li>Choose a piece, colour and size on our website.</li>
                  <li>Tap the WhatsApp button. Your message includes the exact item.</li>
                  <li>We confirm availability, send extra photos if you want them and tell you the delivery cost and timing.</li>
                </ul>
              ),
            },
          ]}
        />
        <Faq items={[faqHowToBuy, faqGenuine]} />
        <LinkCards title="Shop used IKEA furniture" links={categoryLinks} />
      </Container>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

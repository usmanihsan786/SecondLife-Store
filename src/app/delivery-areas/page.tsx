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
 * ✏️ CONFIRM: this page makes no delivery promise. Once you confirm the areas you deliver to (and any fees, timings
 * or assembly), replace the "ask us" wording with those facts.
 */
export const metadata: Metadata = {
  title: "Used IKEA Furniture in Dubai, Sharjah, Ajman & Abu Dhabi",
  description: "Looking for used IKEA furniture in Dubai, Sharjah, Ajman or Abu Dhabi? Browse genuine second-hand IKEA beds, daybeds and sofa beds and ask us about delivery to your area.",
  alternates: { canonical: "/delivery-areas" },
};

const trail = [{ name: "Delivery & Areas", path: "/delivery-areas" }];

export default function DeliveryAreasPage() {
  return (
    <>
      <PageHeader
        trail={trail}
        eyebrow="Delivery & areas"
        title="Used IKEA Furniture in the UAE: Ask About Your Area"
        description={
          <p>
            We are based in the UAE and sell genuine second-hand IKEA beds, daybeds and sofa beds. Tell us your area on
            WhatsApp and we will tell you whether we can deliver the item you want, and how.
          </p>
        }
        actions={<WhatsAppButton>Ask about delivery to your area</WhatsAppButton>}
      />
      <Container className="space-y-16 py-14 sm:py-20">
        <ContentSections
          sections={[
            {
              heading: "Used IKEA furniture in Dubai",
              body: (
                <p>
                  Furnishing an apartment or villa in Dubai? Browse our <Link href="/beds">used IKEA beds with mattress</Link>,{" "}
                  <Link href="/daybeds">IKEA daybeds</Link> and <Link href="/sofa-beds">IKEA sofa beds</Link>, then send us
                  your area and we will tell you what delivery options there are.
                </p>
              ),
            },
            {
              heading: "Second-hand IKEA furniture in Sharjah and Ajman",
              body: (
                <p>
                  In Sharjah or Ajman? Send us your area before you decide. Popular choices for family homes are the{" "}
                  <Link href="/products/ikea-hemnes-daybed">IKEA HEMNES daybed</Link> for guest rooms and the{" "}
                  <Link href="/products/ikea-malm-bed">IKEA MALM bed</Link> in every size from single to king.
                </p>
              ),
            },
            {
              heading: "Used IKEA furniture in Abu Dhabi",
              body: (
                <p>
                  In Abu Dhabi? Message us with your area before you decide, and we will tell you whether we can deliver
                  the exact item.
                </p>
              ),
            },
            {
              heading: "Other emirates",
              body: (
                <p>
                  Live in Al Ain, Ras Al Khaimah, Fujairah or Umm Al Quwain? Ask us on WhatsApp. We will tell you honestly
                  whether we can deliver to you.
                </p>
              ),
            },
            {
              heading: "How buying works",
              body: (
                <ul className="space-y-1">
                  <li>Choose a piece, colour and size on our website.</li>
                  <li>Tap the WhatsApp button. Your message includes the exact item.</li>
                  <li>We confirm availability, send extra photos if you want them and tell you the delivery options.</li>
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

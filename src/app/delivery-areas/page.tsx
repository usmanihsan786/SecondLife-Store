import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { categoryLinks, faqGenuine, faqHowToBuy } from "@/data/faq";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

/**
 * One page for every area served, instead of near-identical city pages (which Google treats as doorway pages).
 * ✏️ Only list areas you really deliver to. Add delivery times, fees or assembly details here once they are fixed.
 */
export const metadata: Metadata = {
  title: "Used IKEA Furniture in Dubai, Sharjah, Ajman & Abu Dhabi",
  description: "We sell genuine used IKEA beds, daybeds and sofa beds to customers in Dubai, Sharjah, Ajman, Abu Dhabi and across the UAE. See how buying and delivery work.",
  alternates: { canonical: "/delivery-areas" },
};

const trail = [{ name: "Areas We Serve", path: "/delivery-areas" }];

export default function DeliveryAreasPage() {
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />
          <SectionHeading
            as="h1"
            eyebrow="Areas we serve"
            title="Used IKEA Furniture Across the UAE"
            description={
              <p>
                We sell genuine second-hand IKEA beds, daybeds and sofa beds to customers in Dubai, Sharjah, Ajman, Abu
                Dhabi and other parts of the UAE. Tell us your area on WhatsApp and we will confirm the delivery options
                for the item you want.
              </p>
            }
          />
          <div className="mt-6">
            <WhatsAppButton>Ask about delivery to your area</WhatsAppButton>
          </div>
        </Container>
      </div>
      <Container className="space-y-14 py-12 sm:py-16">
        <ContentSections
          sections={[
            {
              heading: "Used IKEA furniture in Dubai",
              body: (
                <p>
                  Furnishing an apartment or villa in Dubai? Browse our <Link href="/beds">used IKEA beds with mattress</Link>,{" "}
                  <Link href="/daybeds">IKEA daybeds</Link> and <Link href="/sofa-beds">IKEA sofa beds</Link>, then send us
                  your area so we can confirm delivery.
                </p>
              ),
            },
            {
              heading: "Second-hand IKEA furniture in Sharjah and Ajman",
              body: (
                <p>
                  Customers in Sharjah and Ajman can order the same stock. Popular choices for family homes are the{" "}
                  <Link href="/products/ikea-hemnes-daybed">IKEA HEMNES daybed</Link> for guest rooms and the{" "}
                  <Link href="/products/ikea-malm-bed">IKEA MALM bed</Link> in every size from single to king.
                </p>
              ),
            },
            {
              heading: "Used IKEA furniture in Abu Dhabi",
              body: (
                <p>
                  We also serve customers in Abu Dhabi. Because it is further away, message us before you decide so we
                  can confirm delivery options for the exact item.
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
                  <li>We confirm availability, send extra photos if you want them and agree delivery with you.</li>
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

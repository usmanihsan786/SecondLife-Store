import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Us",
  description: "We offer quality preloved IKEA furniture in the UAE, helping customers find well-kept IKEA beds, daybeds and sofa beds at more affordable prices.",
  alternates: { canonical: "/about" },
};

const points = [
  {
    title: "What we sell",
    text: "Preloved genuine IKEA beds, mattresses, daybeds, sofa beds and storage beds from ranges such as MALM, BRIMNES, HEMNES and FRIHETEN.",
  },
  {
    title: "How we choose",
    text: "We look for furniture that has been well kept, check its condition, and only list pieces we are happy to sell.",
  },
  {
    title: "How to buy",
    text: "Pick the colour and size you like on the website, then message us on WhatsApp. We will confirm availability and answer any questions, including delivery options in the UAE.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="About us"
            title="Well-kept IKEA furniture, at a fairer price"
            description={
              <p>
                We provide quality preloved IKEA furniture in the UAE, helping customers find well-kept IKEA furniture
                at more affordable prices.
              </p>
            }
          />
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="space-y-4 text-base leading-relaxed text-ink/85">
            <p>
              Good furniture does not need to be brand new. Many IKEA pieces are built to last for years, and a bed or
              sofa bed that has been looked after can serve a new home just as well.
            </p>
            <p>
              We are an independent business. We are not part of IKEA and are not affiliated with or endorsed by IKEA.
              We resell genuine IKEA products that have had a previous owner, and we describe them honestly.
            </p>
          </div>

          <ol className="space-y-4">
            {points.map((point, i) => (
              <li key={point.title} className="flex gap-4 rounded-[var(--radius-card)] border border-line/70 bg-paper p-5 shadow-[var(--shadow-card)]">
                <span className="font-display text-2xl font-semibold leading-none text-accent" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-base font-medium text-ink">{point.title}</h2>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-col gap-3 min-[420px]:flex-row">
          <Link href="/shop" className={buttonClasses("primary", "lg")}>
            Shop Furniture
          </Link>
          <WhatsAppButton variant="secondary">Contact on WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </>
  );
}

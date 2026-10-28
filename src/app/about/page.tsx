import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us – Independent Used IKEA Furniture Reseller",
  description: "We offer quality used IKEA furniture in the UAE, helping customers find well-kept IKEA beds, daybeds and sofa beds at more affordable prices.",
  alternates: { canonical: "/about" },
};

const points = [
  {
    title: "What we sell",
    text: "Used, genuine IKEA beds, mattresses, daybeds, sofa beds and storage beds from ranges such as MALM, BRIMNES, HEMNES and FRIHETEN.",
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
      <PageHeader
        eyebrow="About us"
        title="Well-kept IKEA furniture, at a fairer price"
        description={
          <p>
            We provide quality second-hand IKEA furniture in the UAE, helping customers find well-kept IKEA furniture at
            more affordable prices.
          </p>
        }
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="max-w-xl space-y-4 text-base leading-[1.75] text-ink/85 sm:text-[1.0625rem]">
            <p>
              Good furniture does not need to be brand new. Many IKEA pieces are built to last for years, and a bed or
              sofa bed that has been looked after can serve a new home just as well.
            </p>
            <p>
              {siteConfig.name} is an independent business. We are not part of IKEA and are not affiliated with, sponsored
              or endorsed by IKEA.
              We resell genuine IKEA products that have had a previous owner, and we describe them honestly.
            </p>
          </div>

          <ol className="border-t border-line">
            {points.map((point, i) => (
              <li key={point.title} className="flex gap-5 border-b border-line py-6">
                <span className="w-8 shrink-0 font-display text-[2rem] leading-none text-accent" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-[1.0625rem] font-medium text-ink">{point.title}</h2>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 min-[420px]:flex-row">
          <Link href="/shop" className={buttonClasses("primary", "lg")}>
            Shop Furniture
          </Link>
          <WhatsAppButton variant="secondary">Contact on WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </>
  );
}

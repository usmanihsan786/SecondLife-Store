import type { Metadata } from "next";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us on WhatsApp, by phone or by email about preloved IKEA beds, daybeds and sofa beds in the UAE.",
  alternates: { canonical: "/contact" },
};

const rowClass = "flex min-h-14 items-center gap-4 rounded-lg px-1 transition-colors hover:text-espresso";

export default function ContactPage() {
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="We are happy to help"
            description={<p>The quickest way to reach us is WhatsApp. Ask about a piece, a size or a colour, or about delivery options in the UAE.</p>}
          />
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <WhatsAppButton className="w-full sm:w-auto">Message us on WhatsApp</WhatsAppButton>

            <ul className="mt-8 divide-y divide-line border-y border-line text-[0.9375rem]">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  <WhatsAppIcon size={20} className="shrink-0 text-accent-strong" />
                  <span>
                    <span className="block text-sm text-muted">WhatsApp</span>
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneLink}`} className={rowClass}>
                  <PhoneIcon size={20} className="shrink-0 text-accent-strong" />
                  <span>
                    <span className="block text-sm text-muted">Phone</span>
                    {siteConfig.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={rowClass}>
                  <MailIcon size={20} className="shrink-0 text-accent-strong" />
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">Email</span>
                    <span className="break-all">{siteConfig.email}</span>
                  </span>
                </a>
              </li>
              <li className={`${rowClass} hover:text-inherit`}>
                <MapPinIcon size={20} className="shrink-0 text-accent-strong" />
                <span>
                  <span className="block text-sm text-muted">Service area</span>
                  Customers across the {siteConfig.serviceArea}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line/70 bg-paper p-5 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">Send us a message</h2>
            <p className="mt-1 mb-6 text-[0.9375rem] text-muted">Tell us what you are looking for and we will get back to you.</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}

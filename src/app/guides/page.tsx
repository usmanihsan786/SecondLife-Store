import type { Metadata } from "next";
import { Breadcrumbs, LinkCards } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guides } from "@/data/guides";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Used IKEA Furniture Buying Guides",
  description: "Practical guides to buying used IKEA furniture in the UAE: IKEA bed sizes in cm, MALM vs BRIMNES vs HEMNES, daybed or sofa bed, and what to check before you buy.",
  alternates: { canonical: "/guides" },
};

const trail = [{ name: "Guides", path: "/guides" }];

export default function GuidesPage() {
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />
          <SectionHeading
            as="h1"
            eyebrow="Guides"
            title="Used IKEA furniture buying guides"
            description={<p>Sizes, comparisons and what to check before you buy second-hand IKEA furniture.</p>}
          />
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <LinkCards title="All guides" links={guides.map((g) => ({ href: `/guides/${g.slug}`, label: g.title, description: g.description }))} />
      </Container>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

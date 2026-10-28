import type { Metadata } from "next";
import { GuideCards } from "@/components/home/Sections";
import { PageHeader } from "@/components/ui/PageHeader";
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
      <PageHeader
        trail={trail}
        eyebrow="Guides"
        title="Used IKEA furniture buying guides"
        description={<p>Sizes, comparisons and what to check before you buy second-hand IKEA furniture.</p>}
      />
      <GuideCards title="All guides" eyebrow="Read" showAllLink={false} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

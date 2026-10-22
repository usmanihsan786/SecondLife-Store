import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { getGuide, guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/product-utils";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { type: "article", siteName: siteConfig.name, title: guide.title, description: guide.description, url: absoluteUrl(path) },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  const trail = [
    { name: "Guides", path: "/guides" },
    { name: guide.title, path },
  ];

  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />
          <SectionHeading as="h1" eyebrow="Buying guide" title={guide.title} description={<p>{guide.intro}</p>} />
        </Container>
      </div>
      <Container className="space-y-14 py-12 sm:py-16">
        <ContentSections sections={guide.sections} />
        {guide.faq && <Faq items={guide.faq} />}
        <LinkCards title="Shop and read next" links={guide.related} />
        <div className="rounded-2xl bg-espresso px-6 py-8 text-center sm:px-12">
          <p className="font-display text-2xl font-semibold text-paper">Have a question about a piece?</p>
          <p className="mx-auto mt-2 max-w-xl text-[0.9375rem] text-paper/80">Ask us for extra photos, measurements or delivery details.</p>
          <div className="mt-5 flex justify-center">
            <WhatsAppButton variant="light">Message Us on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          url: absoluteUrl(path),
          dateModified: guide.updated,
          author: { "@id": `${siteConfig.url}/#organization` },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

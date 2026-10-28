import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentSections, Faq, LinkCards } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { getGuide, guides } from "@/data/guides";
import { existingImage } from "@/lib/catalog";
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
      <PageHeader trail={trail} eyebrow="Buying guide" title={guide.title} description={<p>{guide.intro}</p>} />
      <Container className="space-y-16 py-14 sm:py-20">
        <ContentSections sections={guide.sections} />
        {guide.faq && <Faq items={guide.faq} />}
        <LinkCards title="Shop and read next" links={guide.related} />
        <div className="rounded-[var(--radius-card)] bg-ink px-6 py-10 text-center sm:px-12">
          <p className="font-display text-[2rem] leading-tight text-white">Have a question about a piece?</p>
          <p className="mx-auto mt-2 max-w-xl text-[0.9375rem] text-white/75">Ask us for extra photos, measurements or delivery details.</p>
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
          // Only real data: the go-live date and your own photo, once they exist.
          ...(guide.published ? { datePublished: guide.published } : {}),
          ...(guide.image && existingImage(guide.image) ? { image: [absoluteUrl(guide.image)] } : {}),
          author: { "@id": `${siteConfig.url}/#organization` },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

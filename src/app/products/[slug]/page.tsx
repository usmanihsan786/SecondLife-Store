import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/options";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { filterProducts, emptyFilters } from "@/lib/filters";
import { defaultVariant, isFullySoldOut, sizeSummary, variantPrice } from "@/lib/product-utils";
import type { ResolvedProduct } from "@/types/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const size = sizeSummary(product);
  const singleSize = size && !size.includes(" to ") && !size.includes(",") ? ` ${size.replace(/ × /g, "×").replace(" cm", "")}` : "";
  const image = defaultVariant(product)?.images[0];
  return {
    title: `${product.name}${singleSize}`,
    description: `${product.shortDescription} ${product.condition}. Ask us on WhatsApp about availability in the UAE.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

/** Product structured data. Offers are only included once a real numeric price has been entered. */
function productJsonLd(product: ResolvedProduct) {
  const prices = product.variants.map((v) => variantPrice(product, v)).filter((p): p is number => typeof p === "number");
  const image = product.variants.flatMap((v) => v.images).slice(0, 6).map((src) => `${siteConfig.url}${src}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "IKEA" },
    category: categories[product.category].label,
    url: `${siteConfig.url}/products/${product.slug}`,
    ...(image.length ? { image } : {}),
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: siteConfig.currency,
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: product.variants.length,
            itemCondition: "https://schema.org/UsedCondition",
            availability: isFullySoldOut(product) ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = filterProducts(
    getProducts().filter((p) => p.id !== product.id && (p.category === product.category || p.series === product.series)),
    emptyFilters,
  ).slice(0, 3);

  return (
    <>
      <Container className="pb-28 pt-4 sm:pt-6 lg:pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted sm:mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><Link href="/" className="hover:text-espresso">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={categories[product.category].href} className="hover:text-espresso">{categories[product.category].label}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 truncate text-ink">{product.name}</li>
          </ol>
        </nav>

        <ProductDetail product={product} />

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-12 sm:mt-20">
            <SectionHeading title="You may also like" />
            <div className="mt-8">
              <ProductGrid items={related} />
            </div>
          </section>
        )}
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

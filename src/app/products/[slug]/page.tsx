import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { Breadcrumbs, LinkCards, type PageLink } from "@/components/content/ContentBlocks";
import { categories, series, sizes, type CategoryId } from "@/data/options";
import { existingImage, getProductBySlug, getProducts } from "@/lib/catalog";
import { filterProducts, emptyFilters } from "@/lib/filters";
import { absoluteUrl, colorLabel, defaultVariant, productPath, sizeSummary, variantPrice } from "@/lib/product-utils";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import type { ResolvedProduct, ResolvedVariant } from "@/types/product";

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
  // Link previews (WhatsApp, Facebook, X…) need full https:// addresses, so everything below is absolute.
  const url = absoluteUrl(productPath(product));
  const shareTitle = `${product.name} | ${siteConfig.name}`;
  const image = previewImage(product);
  return {
    title: product.seoTitle ?? `${product.name}${singleSize}`,
    description: `${product.shortDescription} ${product.condition}. Ask us on WhatsApp about availability in the UAE.`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: shareTitle,
      description: product.shortDescription,
      url,
      images: image ? [{ url: absoluteUrl(image), alt: product.name }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: shareTitle,
      description: product.shortDescription,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

/**
 * The photo used in link previews: the product's card photo, else the first photo of the variant
 * shown by default, else any photo of the product, else the brand share image (the site-wide preview image).
 */
function previewImage(product: ResolvedProduct) {
  return (
    product.cardImage ??
    defaultVariant(product)?.images[0] ??
    product.variants.find((v) => v.images.length)?.images[0] ??
    existingImage(siteConfig.logo.share) ??
    undefined
  );
}

/**
 * Product structured data, or null when there is nothing valid to publish.
 *
 * Google's Product snippets need `offers`, `review` or `aggregateRating`; merchant listings need an `Offer` with a
 * price above zero and a currency (Google Search Central, product-snippet and merchant-listing docs, Sep 2026).
 * This site has no reviews, and an offer is only ever built from a real numeric price. So until at least one
 * variant has a price, the Product block is left out rather than published as an "invalid item". The page is
 * still fully indexable; the breadcrumb, organization and website markup stay.
 *
 * With prices: one `Offer` per priced variant, each linking to that colour and size. A product with one variant is
 * a `Product`; one with several is a `ProductGroup` with a `Product` per variant (Google's product-variant markup,
 * which merchant listings accept, unlike `AggregateOffer`).
 */
function productJsonLd(product: ResolvedProduct) {
  const priced = product.variants.filter((v) => {
    const price = variantPrice(product, v);
    return typeof price === "number" && price > 0;
  });
  if (priced.length === 0) return null;

  const abs = (src: string) => (/^https?:\/\//.test(src) ? src : `${siteConfig.url}${src}`);
  // Variant photos first; the product's cover photo (also our own stock) when a variant has none.
  const photos = (v?: ResolvedVariant) => {
    const list = v?.images.length ? v.images : product.variants.flatMap((x) => x.images);
    const all = list.length ? list : product.cardImage ? [product.cardImage] : [];
    return all.slice(0, 6).map(abs);
  };
  const offer = (v: ResolvedVariant) => ({
    "@type": "Offer",
    url: absoluteUrl(productPath(product, v)),
    price: variantPrice(product, v),
    priceCurrency: siteConfig.currency,
    availability: v.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    itemCondition: "https://schema.org/UsedCondition",
  });
  // `brand: null` in products.ts means the brand is not confirmed, so none is claimed.
  const brand = product.brand === null ? {} : { brand: { "@type": "Brand", name: product.brand ?? "IKEA" } };
  const common = {
    "@context": "https://schema.org",
    name: product.name,
    description: product.description,
    ...brand,
    category: categories[product.category].label,
  };
  const withImage = (images: string[]) => (images.length ? { image: images } : {});

  if (product.variants.length === 1) {
    const v = priced[0];
    return { ...common, "@type": "Product", url: absoluteUrl(productPath(product)), ...withImage(photos(v)), offers: offer(v) };
  }
  const variesBy = [
    ...(product.variants.some((v) => v.color) ? ["https://schema.org/color"] : []),
    ...(product.variants.some((v) => v.size) ? ["https://schema.org/size"] : []),
  ];
  return {
    ...common,
    "@type": "ProductGroup",
    productGroupID: product.slug,
    url: absoluteUrl(productPath(product)),
    variesBy,
    hasVariant: priced.map((v) => ({
      "@type": "Product",
      name: [product.name, colorLabel(v.color), v.size ? sizes[v.size].label : undefined].filter(Boolean).join(", "),
      sku: `${product.slug}-${v.id}`,
      description: v.variantDescription ?? product.description,
      ...brand,
      ...(v.color ? { color: colorLabel(v.color) } : {}),
      ...(v.size ? { size: sizes[v.size].label } : {}),
      ...withImage(photos(v)),
      offers: offer(v),
    })),
  };
}

/** Categories shoppers compare with each other, used to fill the "You may also like" section. */
const alternativeCategories: Partial<Record<CategoryId, CategoryId[]>> = {
  daybeds: ["sofa-beds"],
  "sofa-beds": ["daybeds"],
  beds: ["storage-beds"],
  "storage-beds": ["beds"],
};

/** Links that help shoppers (and Google) move from a product to its range, category and buying help. */
function helpfulLinks(product: ResolvedProduct): PageLink[] {
  const range = series[product.series];
  const links: PageLink[] = [
    { href: categories[product.category].href, label: `All ${categories[product.category].label.toLowerCase()}` },
  ];
  if (range.href !== productPath(product) && range.href !== categories[product.category].href) {
    links.push({ href: range.href, label: product.series === "ottoman" ? range.label : `All IKEA ${range.label}` });
  }
  if (product.category === "beds" || product.category === "storage-beds") {
    links.push({ href: "/guides/ikea-bed-sizes-uae", label: "IKEA bed sizes in cm" });
  } else {
    links.push({ href: "/guides/ikea-daybed-vs-sofa-bed", label: "IKEA daybed or sofa bed?" });
  }
  links.push({ href: "/delivery-areas", label: "Delivery and areas", description: "Ask about delivery to your area" });
  return links;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Same category or series first, then the usual alternative (a daybed or a sofa bed, a bed frame or a storage bed),
  // so products that are the only one of their kind still point shoppers somewhere useful.
  const others = getProducts().filter((p) => p.id !== product.id);
  const close = others.filter((p) => p.category === product.category || p.series === product.series);
  const alternatives = others.filter((p) => !close.includes(p) && alternativeCategories[product.category]?.includes(p.category));
  const related = [...filterProducts(close, emptyFilters), ...filterProducts(alternatives, emptyFilters)].slice(0, 4);

  const productSchema = productJsonLd(product);

  const trail = [
    { name: categories[product.category].label, path: categories[product.category].href },
    { name: product.name, path: productPath(product) },
  ];

  return (
    <>
      <Container className="pb-28 pt-4 sm:pt-6 lg:pb-20">
        <div className="mb-5 sm:mb-7">
          <Breadcrumbs trail={trail} />
        </div>

        <ProductDetail product={product} />

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-12 sm:mt-24 sm:pt-16">
            <SectionHeading eyebrow="Related" title="You may also like" />
            <div className="mt-8">
              <ProductGrid items={related} columns="wide" />
            </div>
          </section>
        )}

        <div className="mt-16 border-t border-line pt-12 sm:pt-16">
          <LinkCards title="Helpful links" links={helpfulLinks(product)} />
        </div>
      </Container>
      {productSchema && <JsonLd data={productSchema} />}
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionHeading } from "@/components/ui/SectionHeading";
import { getProducts } from "@/lib/catalog";
import { emptyFilters, filterVariants } from "@/lib/filters";
import { productPath } from "@/lib/product-utils";

/**
 * Every real size and colour on the homepage, one card each: the available ones grouped by IKEA model, then a separate,
 * clearly labelled sold-out section. Each card shows only that variant's own photos (or an honest placeholder) and
 * opens the product page on that exact colour and size.
 */
export function VariantCollection() {
  const products = getProducts();
  const groups = products
    .map((product) => {
      const all = filterVariants([product], emptyFilters);
      return { product, available: all.filter((i) => !i.soldOut) };
    })
    .filter((g) => g.available.length > 0);
  if (groups.length === 0) return null;
  const total = groups.reduce((n, g) => n + g.available.length, 0);
  const soldOut = filterVariants(products, { ...emptyFilters, availability: ["sold-out"] });

  return (
    <section className="border-t border-line py-12 sm:py-20" aria-label="Shop IKEA furniture by size and colour">
      <Container>
        <SectionHeading
          eyebrow="Every size and colour"
          title="Shop IKEA furniture by size & colour"
          description={
            <p>
              All {total} sizes and colours available now, each on its own card. Tap one to open that exact colour and
              size, or ask about it on WhatsApp.
            </p>
          }
          action={<ArrowLink href="/shop">Shop with filters</ArrowLink>}
        />

        <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16">
          {groups.map(({ product, available }) => (
            <div key={product.id}>
              <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-3 sm:mb-6">
                <h3 className="font-display text-[1.375rem] leading-tight text-ink sm:text-[1.625rem]">
                  <Link href={productPath(product)} className="hover:underline hover:decoration-line-strong hover:underline-offset-4">
                    {product.shortName ?? product.name}
                  </Link>
                </h3>
                <p className="shrink-0 text-sm text-muted">
                  {available.length} {available.length === 1 ? "option" : "options"}
                </p>
              </div>
              <ProductGrid items={available} columns="variants" priorityCount={0} list="home_variants" />
            </div>
          ))}
        </div>

        {soldOut.length > 0 && (
          <div className="mt-14 rounded-[var(--radius-card)] bg-surface px-4 py-8 sm:mt-20 sm:px-8 sm:py-10">
            <div className="mb-5 flex flex-col gap-2 border-b border-line pb-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-sold">Sold out</p>
                <h3 className="mt-1.5 font-display text-[1.375rem] leading-tight text-ink sm:text-[1.625rem]">Previously available</h3>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                  These {soldOut.length} sizes and colours have sold. Ask us on WhatsApp for something similar, or to hear
                  when one is back.
                </p>
              </div>
              <p className="shrink-0 text-sm text-muted">
                {soldOut.length} {soldOut.length === 1 ? "option" : "options"}
              </p>
            </div>
            <ProductGrid items={soldOut} columns="variants" priorityCount={0} list="home_sold_out" />
          </div>
        )}
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { ArrowLink, SectionHeading } from "@/components/ui/SectionHeading";
import { series, type SeriesId } from "@/data/options";
import { getProducts } from "@/lib/catalog";
import { emptyFilters, filterVariants } from "@/lib/filters";

/** How each IKEA range is named on the homepage, in shopping order. */
const groupTitles: Record<SeriesId, string> = {
  malm: "IKEA MALM Beds",
  brimnes: "IKEA BRIMNES Beds & Daybed",
  hemnes: "IKEA HEMNES Beds & Daybeds",
  friheten: "IKEA FRIHETEN Sofa Beds",
  ottoman: "IKEA Ottoman Storage Beds",
};

const pill =
  "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong bg-paper px-4 text-sm text-ink transition-colors hover:border-ink";

/**
 * Every real size and colour on the homepage, one card each, grouped by IKEA range in ordinary vertical grids:
 * the available ones first, then a clearly labelled sold-out section. Each card shows only that variant's own photos
 * (or an honest placeholder) and opens the product page on that exact colour and size.
 */
export function VariantCollection() {
  const products = getProducts();
  const all = filterVariants(products, emptyFilters);
  const groups = (Object.keys(groupTitles) as SeriesId[])
    .map((id) => {
      const items = all.filter((i) => i.product.series === id);
      return { id, available: items.filter((i) => !i.soldOut), soldOut: items.filter((i) => i.soldOut).length };
    })
    .filter((g) => g.available.length > 0);
  const soldOut = all.filter((i) => i.soldOut);
  const available = all.length - soldOut.length;
  if (all.length === 0) return null;

  return (
    <section className="border-t border-line py-12 sm:py-20" aria-label="Explore IKEA furniture by size and colour">
      <Container>
        <SectionHeading
          eyebrow="Every size and colour"
          title="Explore IKEA furniture by size & colour"
          description={
            <p>
              {available} sizes and colours available now across {groups.length} IKEA ranges, each on its own card. Tap one
              to open that exact colour and size, or ask about it on WhatsApp.
            </p>
          }
          action={<ArrowLink href="/shop">Shop with filters</ArrowLink>}
        />

        {/* Jump links wrap onto new lines; nothing here scrolls sideways. */}
        <nav aria-label="Jump to an IKEA range" className="mt-7">
          <ul className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.id}>
                <a href={`#range-${g.id}`} className={pill}>
                  {series[g.id].label}
                  <span className="text-muted">{g.available.length}</span>
                </a>
              </li>
            ))}
            {soldOut.length > 0 && (
              <li>
                <a href="#previously-available" className={pill}>
                  Sold out
                  <span className="text-muted">{soldOut.length}</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-20">
          {groups.map((g) => (
            <section key={g.id} id={`range-${g.id}`} aria-labelledby={`range-${g.id}-title`} className="scroll-mt-24">
              <div className="mb-6 grid gap-3 border-t border-ink/80 pt-5 sm:mb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
                <div>
                  <h3 id={`range-${g.id}-title`} className="font-display text-[1.625rem] leading-[1.1] text-ink sm:text-[2rem]">
                    {groupTitles[g.id]}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">{series[g.id].blurb}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <p className="text-muted">
                    <span className="font-medium text-ink">{g.available.length}</span> available
                    {g.soldOut > 0 && (
                      <>
                        {" · "}
                        <a href="#previously-available" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
                          {g.soldOut} sold out
                        </a>
                      </>
                    )}
                  </p>
                  <ArrowLink href={series[g.id].href}>View {series[g.id].label}</ArrowLink>
                </div>
              </div>
              <ProductGrid items={g.available} columns="variants" priorityCount={0} list="home_variants" />
            </section>
          ))}
        </div>

        {soldOut.length > 0 && (
          <section
            id="previously-available"
            aria-labelledby="previously-available-title"
            className="mt-16 scroll-mt-24 rounded-[var(--radius-card)] bg-surface px-4 py-8 sm:mt-24 sm:px-8 sm:py-10"
          >
            <div className="mb-6 grid gap-3 border-b border-line pb-5 sm:mb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-sold">Sold out</p>
                <h3 id="previously-available-title" className="mt-1.5 font-display text-[1.625rem] leading-[1.1] text-ink sm:text-[2rem]">
                  Previously available
                </h3>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                  These {soldOut.length} sizes and colours have sold. Ask us on WhatsApp for something similar, or to hear
                  when one is back.
                </p>
              </div>
              <Link href="/shop?availability=available" className="text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                Shop what is available
              </Link>
            </div>
            <ProductGrid items={soldOut} columns="variants" priorityCount={0} list="home_sold_out" />
          </section>
        )}
      </Container>
    </section>
  );
}

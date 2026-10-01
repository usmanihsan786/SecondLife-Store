import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildFilterGroups, filtersFromParams } from "@/lib/filters";
import type { ResolvedProduct } from "@/types/product";
import { CatalogView } from "./CatalogView";

type Props = {
  title: string;
  intro: string;
  products: ResolvedProduct[];
  searchParams: Record<string, string | string[] | undefined>;
};

/** Page shell shared by /shop, /beds, /daybeds and /sofa-beds. */
export function CatalogPage({ title, intro, products, searchParams }: Props) {
  const groups = buildFilterGroups(products);
  const initialFilters = filtersFromParams(searchParams, groups);
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-8 sm:py-12">
          <SectionHeading as="h1" eyebrow="Preloved IKEA furniture" title={title} description={<p>{intro}</p>} />
        </Container>
      </div>
      <Container className="py-8 sm:py-10">
        <CatalogView products={products} groups={groups} initialFilters={initialFilters} />
      </Container>
    </>
  );
}

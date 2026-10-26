import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/ContentBlocks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildFilterGroups } from "@/lib/filters";
import { breadcrumbJsonLd, JsonLd, type Crumb } from "@/lib/seo";
import type { ResolvedProduct } from "@/types/product";
import { CatalogView } from "./CatalogView";

type Props = {
  title: string;
  intro: ReactNode;
  products: ResolvedProduct[];
  /** Breadcrumb trail after Home, ending with this page. */
  breadcrumb: Crumb[];
  eyebrow?: string;
  /** Buying information, FAQs and links shown under the product grid. */
  children?: ReactNode;
};

/** Page shell shared by /shop, the category pages and the range pages. */
export function CatalogPage({ title, intro, products, breadcrumb, eyebrow = "Second-hand IKEA furniture", children }: Props) {
  const groups = buildFilterGroups(products);
  return (
    <>
      <div className="border-b border-line/70 bg-sand/50">
        <Container className="py-8 sm:py-12">
          <Breadcrumbs trail={breadcrumb} />
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={<div className="space-y-2">{intro}</div>} />
        </Container>
      </div>
      <Container className="py-8 sm:py-10">
        <CatalogView products={products} groups={groups} />
      </Container>
      {children && (
        <div className="border-t border-line/70">
          <Container className="space-y-14 py-12 sm:py-16">{children}</Container>
        </div>
      )}
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
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

/** Every catalog page, so shoppers can hop between them from the top of any listing. */
const shortcuts = [
  { label: "All", href: "/shop" },
  { label: "Beds", href: "/beds" },
  { label: "Daybeds", href: "/daybeds" },
  { label: "Sofa beds", href: "/sofa-beds" },
  { label: "Storage beds", href: "/storage-beds" },
  { label: "BRIMNES", href: "/ikea-brimnes" },
  { label: "HEMNES", href: "/ikea-hemnes" },
];

/** Page shell shared by /shop, the category pages and the range pages. */
export function CatalogPage({ title, intro, products, breadcrumb, eyebrow = "Second-hand IKEA furniture", children }: Props) {
  const groups = buildFilterGroups(products);
  const current = breadcrumb[breadcrumb.length - 1]?.path;
  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} description={intro} trail={breadcrumb}>
        <nav aria-label="Furniture categories" className="-mx-4 mt-7 sm:mx-0">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:flex-wrap sm:px-0">
            {shortcuts.map((s) => {
              const active = s.href === current;
              return (
                <li key={s.href} className="shrink-0">
                  <Link
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-colors ${
                      active ? "border-ink bg-ink text-white" : "border-line-strong bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHeader>
      <Container className="py-8 sm:py-12">
        <CatalogView products={products} groups={groups} />
      </Container>
      {children && (
        <div className="border-t border-line">
          <Container className="space-y-16 py-14 sm:py-20">{children}</Container>
        </div>
      )}
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
    </>
  );
}

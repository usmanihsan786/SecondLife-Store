import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { LinkCards } from "@/components/content/ContentBlocks";
import { categoryLinks } from "@/data/faq";
import { guideLinks } from "@/data/guides";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop All Used IKEA Furniture – Dubai & UAE",
  description:
    "Browse all our second-hand IKEA beds, daybeds, sofa beds and ottoman storage beds for Dubai and the UAE. Filter by IKEA range, colour, size and availability.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <CatalogPage
      title="Shop all used IKEA furniture"
      intro={<p>Every piece we currently list, from MALM and BRIMNES beds to HEMNES daybeds and FRIHETEN sofa beds. Filter by series, colour or size.</p>}
      breadcrumb={[{ name: "Shop", path: "/shop" }]}
      products={getProducts()}
      searchParams={await searchParams}
    >
      <LinkCards title="Shop by category" links={categoryLinks} />
      <LinkCards title="Buying guides" links={guideLinks} />
    </CatalogPage>
  );
}

import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Used IKEA Furniture in UAE",
  description:
    "Browse used IKEA beds, daybeds, sofa beds and ottoman storage beds in the UAE. Filter by series, colour, size and availability.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <CatalogPage
      title="Shop all used IKEA furniture"
      intro="Every piece we currently list, from MALM and BRIMNES beds to HEMNES daybeds and FRIHETEN sofa beds. Filter by series, colour or size."
      products={getProducts()}
      searchParams={await searchParams}
    />
  );
}

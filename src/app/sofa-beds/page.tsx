import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Preloved IKEA Sofa Beds",
  description: "Preloved IKEA FRIHETEN sofa beds with storage, in gray and beige, in the UAE.",
  alternates: { canonical: "/sofa-beds" },
};

export default async function SofaBedsPage({ searchParams }: PageProps<"/sofa-beds">) {
  return (
    <CatalogPage
      title="Sofa Beds"
      intro="Seating for every day and a bed for guests, with storage built in."
      products={getProducts().filter((p) => p.category === "sofa-beds")}
      searchParams={await searchParams}
    />
  );
}

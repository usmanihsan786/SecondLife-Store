import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Preloved IKEA Beds with Mattress",
  description: "Preloved IKEA MALM, BRIMNES and HEMNES beds and hydraulic ottoman storage beds with IKEA mattresses, in the UAE.",
  alternates: { canonical: "/beds" },
};

export default async function BedsPage({ searchParams }: PageProps<"/beds">) {
  return (
    <CatalogPage
      title="Beds"
      intro="Bed frames sold together with IKEA mattresses, including MALM, BRIMNES, HEMNES and hydraulic ottoman storage beds."
      products={getProducts().filter((p) => p.category === "beds" || p.category === "storage-beds")}
      searchParams={await searchParams}
    />
  );
}

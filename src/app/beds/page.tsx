import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA Beds with Mattress – Single to King, UAE",
  description: "Second-hand IKEA MALM, BRIMNES and HEMNES beds sold with an IKEA mattress, plus hydraulic ottoman storage beds. Single 90, double 140, queen 160 and king 180 cm. Real photos of each bed.",
  alternates: { canonical: "/beds" },
};

export default async function BedsPage({ searchParams }: PageProps<"/beds">) {
  return (
    <CatalogPage
      title="Used IKEA Beds with Mattress"
      intro="Bed frames sold together with IKEA mattresses, including MALM, BRIMNES, HEMNES and hydraulic ottoman storage beds."
      products={getProducts().filter((p) => p.category === "beds" || p.category === "storage-beds")}
      searchParams={await searchParams}
    />
  );
}

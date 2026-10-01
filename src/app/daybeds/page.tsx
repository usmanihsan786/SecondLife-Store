import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Preloved IKEA Daybeds",
  description: "Preloved IKEA BRIMNES and HEMNES daybeds, each including two IKEA mattresses, in the UAE.",
  alternates: { canonical: "/daybeds" },
};

export default async function DaybedsPage({ searchParams }: PageProps<"/daybeds">) {
  return (
    <CatalogPage
      title="Daybeds"
      intro="A sofa by day and a bed at night. Our BRIMNES and HEMNES daybeds each come with two IKEA mattresses."
      products={getProducts().filter((p) => p.category === "daybeds")}
      searchParams={await searchParams}
    />
  );
}

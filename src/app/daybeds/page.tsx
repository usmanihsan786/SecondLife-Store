import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA Daybeds with 2 Mattresses – BRIMNES & HEMNES",
  description: "Second-hand IKEA BRIMNES and HEMNES daybeds, each with two IKEA mattresses. A sofa by day and a bed at night. Ask about availability in the UAE on WhatsApp.",
  alternates: { canonical: "/daybeds" },
};

export default async function DaybedsPage({ searchParams }: PageProps<"/daybeds">) {
  return (
    <CatalogPage
      title="Used IKEA Daybeds with Two Mattresses"
      intro="A sofa by day and a bed at night. Our BRIMNES and HEMNES daybeds each come with two IKEA mattresses."
      products={getProducts().filter((p) => p.category === "daybeds")}
      searchParams={await searchParams}
    />
  );
}

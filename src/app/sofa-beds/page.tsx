import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used IKEA Sofa Beds – FRIHETEN with Storage, UAE",
  description: "Second-hand IKEA FRIHETEN sofa beds with storage, in gray and beige. Seating every day and a bed for guests. Ask about availability in the UAE on WhatsApp.",
  alternates: { canonical: "/sofa-beds" },
};

export default async function SofaBedsPage({ searchParams }: PageProps<"/sofa-beds">) {
  return (
    <CatalogPage
      title="Second-hand IKEA Sofa Beds"
      intro="Seating for every day and a bed for guests, with storage built in."
      products={getProducts().filter((p) => p.category === "sofa-beds")}
      searchParams={await searchParams}
    />
  );
}

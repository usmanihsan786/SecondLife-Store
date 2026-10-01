import type { CatalogItem } from "@/lib/filters";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ items, columns = "catalog" }: { items: CatalogItem[]; columns?: "catalog" | "wide" }) {
  const grid =
    columns === "wide" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3";
  return (
    <ul className={`grid grid-cols-1 gap-5 sm:gap-6 ${grid}`}>
      {items.map((item, i) => (
        <li key={item.product.id} className="animate-rise" style={{ animationDelay: `${Math.min(i, 6) * 40}ms` }}>
          <ProductCard
            product={item.product}
            variant={item.variant}
            soldOut={item.soldOut}
            showVariant={item.narrowed}
            priority={i < 2}
          />
        </li>
      ))}
    </ul>
  );
}

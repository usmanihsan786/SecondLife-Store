import type { CatalogItem } from "@/lib/filters";
import { ProductCard } from "./ProductCard";

type Columns = "catalog" | "wide";

const grids: Record<Columns, string> = {
  // Next to the filter sidebar: 2 columns on phones, 3 on desktop.
  catalog: "grid-cols-2 xl:grid-cols-3",
  // Full width (homepage, related items): 2, 3, then 4 columns.
  wide: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const imageSizes: Record<Columns, string> = {
  catalog: "(min-width: 1280px) 300px, (min-width: 1024px) 33vw, 50vw",
  wide: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
};

export function ProductGrid({ items, columns = "catalog" }: { items: CatalogItem[]; columns?: Columns }) {
  return (
    <ul className={`grid gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 ${grids[columns]}`}>
      {items.map((item, i) => (
        <li key={item.product.id}>
          <ProductCard
            product={item.product}
            variant={item.variant}
            soldOut={item.soldOut}
            showVariant={item.narrowed}
            priority={i < 2}
            sizes={imageSizes[columns]}
          />
        </li>
      ))}
    </ul>
  );
}

import type { RotationFrame } from "@/components/ui/AutoRotate";
import type { CatalogItem } from "@/lib/filters";
import { ProductCard } from "./ProductCard";

type Columns = "catalog" | "wide" | "featured" | "variants";

// Every grid scrolls with the page: no sideways shelves. Below 360px two columns are too narrow to read, so cards stack.
const grids: Record<Columns, string> = {
  // Next to the filter sidebar: 2 columns on phones, 3 on desktop.
  catalog: "grid-cols-1 min-[360px]:grid-cols-2 xl:grid-cols-3",
  // Full width (related items): 2, 3, then 4 columns.
  wide: "grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  // Homepage featured products: 2 columns on phones, 4 on desktop.
  featured: "grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4",
  // Homepage size & colour groups: 2, 3, then 4 columns.
  variants: "grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const imageSizes: Record<Columns, string> = {
  catalog: "(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 360px) 50vw, 100vw",
  wide: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw",
  featured: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 360px) 50vw, 100vw",
  variants: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw",
};

type Props = {
  items: CatalogItem[];
  columns?: Columns;
  /** Optional photo rotations by product id (homepage featured cards). */
  frames?: Record<string, RotationFrame[]>;
  /** How many of the first photos load with high priority. Use 0 when the grid is below the first screen. */
  priorityCount?: number;
  /** Where the grid is shown, for analytics. */
  list?: string;
};

export function ProductGrid({ items, columns = "catalog", frames, priorityCount = 2, list }: Props) {
  return (
    <ul className={`grid gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 ${grids[columns]}`}>
      {items.map((item, i) => (
        <li key={`${item.product.id}-${item.variant.id}`}>
          <ProductCard
            product={item.product}
            variant={item.variant}
            soldOut={item.soldOut}
            showVariant={item.narrowed}
            priority={i < priorityCount}
            list={list}
            sizes={imageSizes[columns]}
            frames={frames?.[item.product.id]}
            // Staggered so neighbouring cards never change at the same moment.
            rotationDelay={300 + (i % 6) * 650}
          />
        </li>
      ))}
    </ul>
  );
}

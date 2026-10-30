import type { RotationFrame } from "@/components/ui/AutoRotate";
import type { CatalogItem } from "@/lib/filters";
import { ProductCard } from "./ProductCard";

type Columns = "catalog" | "wide" | "shelf" | "variants";

// Below 380px two columns are too narrow to read, so cards stack.
const grids: Record<Columns, string> = {
  // Next to the filter sidebar: 2 columns on phones, 3 on desktop.
  catalog: "grid grid-cols-1 min-[380px]:grid-cols-2 xl:grid-cols-3",
  // Full width (related items): 2, 3, then 4 columns.
  wide: "grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  // Homepage: a swipeable shelf of large cards on phones (one card and a peek of the next), a grid from sm.
  shelf:
    "no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4",
  // Homepage size & colour rows: a swipeable row of variant cards on phones (with a peek of the next), a grid from sm.
  variants:
    "no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4 xl:grid-cols-5",
};

const shelfItem: Partial<Record<Columns, string>> = {
  shelf: "w-[84%] max-w-[22rem] shrink-0 snap-start sm:w-auto sm:max-w-none",
  variants: "w-[64%] max-w-[16rem] shrink-0 snap-start sm:w-auto sm:max-w-none",
};

const imageSizes: Record<Columns, string> = {
  catalog: "(min-width: 1280px) 300px, (min-width: 1024px) 33vw, 50vw",
  wide: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  shelf: "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 84vw",
  variants: "(min-width: 1280px) 240px, (min-width: 1024px) 23vw, (min-width: 640px) 31vw, 64vw",
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
    <ul className={`gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 ${grids[columns]}`}>
      {items.map((item, i) => (
        <li key={`${item.product.id}-${item.variant.id}`} className={shelfItem[columns]}>
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

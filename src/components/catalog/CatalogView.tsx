"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { CloseIcon } from "@/components/icons";
import { ProductGrid } from "@/components/product/ProductGrid";
import { buttonClasses } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  countActive,
  emptyFilters,
  filterVariants,
  filtersFromParams,
  filtersToQuery,
  type FilterGroup,
  type FilterKey,
  type Filters,
} from "@/lib/filters";
import type { ResolvedProduct } from "@/types/product";
import { FilterDrawer } from "./FilterDrawer";
import { FilterSidebar } from "./FilterSidebar";

type Props = {
  products: ResolvedProduct[];
  groups: FilterGroup[];
};

const noopSubscribe = () => () => {};

/**
 * Product listing with filters. Used by the Shop page and every category page.
 * The page is prerendered with every product (what search engines see). A shared filtered link such as
 * /beds?size=160x200 is applied in the browser, so the pages stay static and cacheable.
 */
export function CatalogView({ products, groups }: Props) {
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const fromUrl = useMemo(
    () => filtersFromParams(Object.fromEntries(new URLSearchParams(search)), groups),
    [search, groups],
  );
  // The customer's own choices. null means "not changed yet", so the filters from the URL are used.
  const [chosen, setFilters] = useState<Filters | null>(null);
  const filters = chosen ?? fromUrl;
  // One card per real colour + size, so every option is visible without opening the product page.
  const items = useMemo(() => filterVariants(products, filters), [products, filters]);
  const productCount = new Set(items.map((i) => i.product.id)).size;
  const activeCount = countActive(filters);

  const apply = (next: Filters) => {
    setFilters(next);
    // Keep the URL in step so a filtered view can be shared or bookmarked.
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${filtersToQuery(next)}`);
  };

  const toggle = (key: FilterKey, value: string) =>
    apply({
      ...filters,
      [key]: filters[key].includes(value) ? filters[key].filter((v) => v !== value) : [...filters[key], value],
    });

  const clear = () => apply(emptyFilters);

  const chips = groups.flatMap((g) =>
    g.options.filter((o) => filters[g.key].includes(o.value)).map((o) => ({ key: g.key, value: o.value, label: o.label })),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14">
      <FilterSidebar groups={groups} filters={filters} activeCount={activeCount} onToggle={toggle} onClear={clear} />

      <div className="min-w-0">
        <h2 className="sr-only">Available items</h2>
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-[0.9375rem] text-muted" aria-live="polite">
            <span className="font-medium text-ink">{items.length}</span> {items.length === 1 ? "size and colour" : "sizes and colours"}
            {productCount > 0 && (
              <>
                {" "}
                from <span className="font-medium text-ink">{productCount}</span> {productCount === 1 ? "product" : "products"}
              </>
            )}
            {activeCount > 0 && <span className="hidden sm:inline"> matching your filters</span>}
          </p>
          <FilterDrawer groups={groups} products={products} filters={filters} onApply={apply} />
        </div>

        {chips.length > 0 && (
          <ul className="-mt-1 mb-7 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {chips.map((chip) => (
              <li key={`${chip.key}-${chip.value}`}>
                <button
                  type="button"
                  onClick={() => toggle(chip.key, chip.value)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-surface-2 pl-3.5 pr-2.5 text-sm text-ink transition-colors hover:bg-line"
                >
                  {chip.label}
                  <CloseIcon size={14} className="text-muted" />
                  <span className="sr-only">Remove filter</span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={clear} className="min-h-9 px-2 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                Clear all
              </button>
            </li>
          </ul>
        )}

        {items.length > 0 ? (
          <ProductGrid items={items} />
        ) : (
          <EmptyState
            title="No furniture matches those filters"
            description="Try removing a filter, or message us. We may have what you are looking for."
            action={
              <>
                <button type="button" onClick={clear} className={buttonClasses("primary", "lg")}>
                  Clear filters
                </button>
                <WhatsAppButton variant="secondary">Ask us on WhatsApp</WhatsAppButton>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}

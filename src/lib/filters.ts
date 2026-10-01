import { categories, colors, series, sizes } from "@/data/options";
import type { Availability, ResolvedProduct, ResolvedVariant } from "@/types/product";

export type FilterKey = "series" | "category" | "color" | "size" | "availability";
export type Filters = Record<FilterKey, string[]>;

export const emptyFilters: Filters = { series: [], category: [], color: [], size: [], availability: [] };

export type FilterGroup = {
  key: FilterKey;
  label: string;
  options: { value: string; label: string; swatch?: string }[];
};

const availabilityLabels: Record<Availability, string> = { available: "Available", "sold-out": "Sold Out" };

/** Builds filter groups from the products themselves, so options never list something that does not exist. */
export function buildFilterGroups(products: ResolvedProduct[]): FilterGroup[] {
  const variants = products.flatMap((p) => p.variants);
  const has = <T extends string>(values: (T | undefined)[]) => new Set(values.filter(Boolean) as T[]);

  const usedSeries = has(products.map((p) => p.series));
  const usedCategories = has(products.map((p) => p.category));
  const usedColors = has(variants.map((v) => v.color));
  const usedSizes = has(variants.map((v) => v.size));

  const groups: FilterGroup[] = [
    {
      key: "series",
      label: "Series",
      options: Object.entries(series)
        .filter(([id]) => usedSeries.has(id as never))
        .map(([value, s]) => ({ value, label: s.label })),
    },
    {
      key: "category",
      label: "Category",
      options: Object.entries(categories)
        .filter(([id]) => usedCategories.has(id as never))
        .map(([value, c]) => ({ value, label: c.label })),
    },
    {
      key: "color",
      label: "Color",
      options: Object.entries(colors)
        .filter(([id]) => usedColors.has(id as never))
        .map(([value, c]) => ({ value, label: c.label, swatch: c.swatch })),
    },
    {
      key: "size",
      label: "Size",
      options: Object.entries(sizes)
        .filter(([id]) => usedSizes.has(id as never))
        .map(([value, s]) => ({ value, label: s.short })),
    },
    {
      key: "availability",
      label: "Availability",
      options: (Object.keys(availabilityLabels) as Availability[]).map((value) => ({
        value,
        label: availabilityLabels[value],
      })),
    },
  ];
  // A group with a single choice filters nothing useful (e.g. Category on the Daybeds page).
  return groups.filter((g) => g.key === "availability" || g.options.length > 1);
}

function variantMatches(v: ResolvedVariant, f: Filters) {
  return (
    (f.color.length === 0 || (v.color !== undefined && f.color.includes(v.color))) &&
    (f.size.length === 0 || (v.size !== undefined && f.size.includes(v.size))) &&
    (f.availability.length === 0 || f.availability.includes(v.availability))
  );
}

export type CatalogItem = {
  product: ResolvedProduct;
  /** The variant the card shows: the best match for the current filters. */
  variant: ResolvedVariant;
  /** True when every variant matching the filters is sold out. */
  soldOut: boolean;
  /** True when colour or size filters picked out specific variants. */
  narrowed: boolean;
};

export function filterProducts(products: ResolvedProduct[], f: Filters): CatalogItem[] {
  const narrowed = f.color.length > 0 || f.size.length > 0;
  const items: CatalogItem[] = [];
  for (const product of products) {
    if (f.series.length && !f.series.includes(product.series)) continue;
    if (f.category.length && !f.category.includes(product.category)) continue;
    const matches = product.variants.filter((v) => variantMatches(v, f));
    if (matches.length === 0) continue;
    const available = matches.find((v) => v.availability === "available");
    items.push({ product, variant: available ?? matches[0], soldOut: !available, narrowed });
  }
  // Keep sold-out items visible, but list them after available ones.
  return items.sort((a, b) => Number(a.soldOut) - Number(b.soldOut));
}

export const countActive = (f: Filters) => Object.values(f).reduce((n, values) => n + values.length, 0);

export function filtersFromParams(params: Record<string, string | string[] | undefined>, groups: FilterGroup[]) {
  const filters: Filters = { ...emptyFilters };
  for (const group of groups) {
    const raw = params[group.key];
    const values = (Array.isArray(raw) ? raw.join(",") : (raw ?? "")).split(",");
    const allowed = new Set(group.options.map((o) => o.value));
    filters[group.key] = [...new Set(values.filter((v) => allowed.has(v)))];
  }
  return filters;
}

export function filtersToQuery(f: Filters) {
  const params = new URLSearchParams();
  for (const [key, values] of Object.entries(f)) {
    if (values.length) params.set(key, values.join(","));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

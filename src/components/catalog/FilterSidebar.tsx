import type { FilterGroup, FilterKey, Filters } from "@/lib/filters";
import { FilterOptions } from "./FilterOptions";

type Props = {
  groups: FilterGroup[];
  filters: Filters;
  activeCount: number;
  onToggle: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function FilterSidebar({ groups, filters, activeCount, onToggle, onClear }: Props) {
  return (
    <aside aria-label="Filters" className="hidden lg:block">
      <div className="sticky top-24">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-medium text-ink">Filters</h2>
          {activeCount > 0 && (
            <button type="button" onClick={onClear} className="min-h-11 px-1 text-sm text-accent-strong underline-offset-4 hover:underline">
              Clear all
            </button>
          )}
        </div>
        <FilterOptions groups={groups} filters={filters} onToggle={onToggle} idPrefix="side" />
      </div>
    </aside>
  );
}

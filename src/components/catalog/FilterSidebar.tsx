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
      <div>
        <div className="mb-4 flex min-h-11 items-center justify-between border-b border-line pb-3">
          <h2 className="font-display text-[1.5rem] leading-none text-ink">Filter</h2>
          {activeCount > 0 && (
            <button type="button" onClick={onClear} className="min-h-11 px-1 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              Clear all
            </button>
          )}
        </div>
        <FilterOptions groups={groups} filters={filters} onToggle={onToggle} idPrefix="side" />
      </div>
    </aside>
  );
}

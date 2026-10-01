"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, FilterIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { countActive, emptyFilters, filterProducts, type FilterGroup, type FilterKey, type Filters } from "@/lib/filters";
import type { ResolvedProduct } from "@/types/product";
import { FilterOptions } from "./FilterOptions";

type Props = {
  groups: FilterGroup[];
  products: ResolvedProduct[];
  filters: Filters;
  onApply: (filters: Filters) => void;
};

/** Phone and tablet filters: a bottom sheet with its own draft selection, applied with one button. */
export function FilterDrawer({ groups, products, filters, onApply }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);
  const activeCount = countActive(filters);
  const draftResults = filterProducts(products, draft).length;

  // The <dialog> follows isFilterOpen. showModal() puts it in the top layer, above the sticky header.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isFilterOpen && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", ""); // very old browsers without <dialog> support
    } else if (!isFilterOpen && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [isFilterOpen]);

  const open = () => {
    setDraft(filters);
    setIsFilterOpen(true);
  };
  const close = () => setIsFilterOpen(false);

  const toggle = (key: FilterKey, value: string) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }));

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={open}
        className={buttonClasses("secondary", "md")}
        aria-haspopup="dialog"
        aria-expanded={isFilterOpen}
        aria-controls="filter-drawer"
      >
        <FilterIcon size={18} />
        Filters
        {activeCount > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-espresso px-1.5 text-xs text-paper">
            {activeCount}
            <span className="sr-only"> active</span>
          </span>
        )}
      </button>

      <dialog
        id="filter-drawer"
        ref={dialogRef}
        aria-labelledby="filter-drawer-title"
        className="drawer drawer-bottom"
        // Escape closes the dialog natively; keep state in step.
        onClose={() => setIsFilterOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mx-auto flex max-h-[88dvh] w-full max-w-2xl flex-col rounded-t-2xl bg-canvas">
          <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-2 sm:px-6">
            <h2 id="filter-drawer-title" className="text-lg font-medium text-ink">
              Filters
            </h2>
            <button type="button" onClick={close} className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-espresso hover:bg-sand">
              <CloseIcon size={22} />
              <span className="sr-only">Close filters</span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
            <FilterOptions groups={groups} filters={draft} onToggle={toggle} idPrefix="drawer" />
          </div>

          <div className="flex shrink-0 gap-3 border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            <button
              type="button"
              onClick={() => {
                // Reset the selection and the product grid right away; the sheet stays open for a new choice.
                setDraft(emptyFilters);
                onApply(emptyFilters);
              }}
              className={buttonClasses("secondary", "lg", "flex-1")}
              disabled={countActive(draft) === 0 && activeCount === 0}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                close();
              }}
              className={buttonClasses("primary", "lg", "flex-[1.6]")}
            >
              Show {draftResults} {draftResults === 1 ? "item" : "items"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

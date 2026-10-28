import { CheckIcon } from "@/components/icons";
import type { FilterGroup, FilterKey, Filters } from "@/lib/filters";

type Props = {
  groups: FilterGroup[];
  filters: Filters;
  onToggle: (key: FilterKey, value: string) => void;
  idPrefix: string;
};

/**
 * The filter groups shared by the desktop sidebar and the phone filter drawer.
 * Sizes are a compact grid of chips; every other group is a list of checkbox rows (colours with their swatch).
 */
export function FilterOptions({ groups, filters, onToggle, idPrefix }: Props) {
  return (
    <div className="divide-y divide-line">
      {groups.map((group) => {
        const chips = group.key === "size";
        return (
          <fieldset key={group.key} className="min-w-0 py-5 first:pt-0">
            <legend className="float-left mb-2 w-full text-xs font-medium uppercase tracking-[0.14em] text-ink">{group.label}</legend>
            <div className={`clear-both ${chips ? "grid grid-cols-2 gap-2 pt-1" : "flex flex-col"}`}>
              {group.options.map((option) => {
                const id = `${idPrefix}-${group.key}-${option.value}`;
                const checked = filters[group.key].includes(option.value);
                const input = (
                  <input
                    id={id}
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onToggle(group.key, option.value)}
                  />
                );
                if (chips) {
                  return (
                    <label
                      key={option.value}
                      htmlFor={id}
                      className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-control)] border px-2 text-sm tabular-nums transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink has-[:focus-visible]:ring-offset-2 ${
                        checked ? "border-ink bg-ink text-white" : "border-line-strong bg-paper text-ink hover:border-ink"
                      }`}
                    >
                      {input}
                      {option.label}
                    </label>
                  );
                }
                return (
                  <label
                    key={option.value}
                    htmlFor={id}
                    className="group/row flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-control)] text-[0.9375rem] text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink"
                  >
                    {input}
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                        checked ? "border-ink bg-ink text-white" : "border-line-strong bg-paper group-hover/row:border-ink"
                      }`}
                    >
                      {checked && <CheckIcon size={14} />}
                    </span>
                    {option.swatch && (
                      <span
                        className="h-4 w-4 shrink-0 rounded-full border border-ink/20"
                        style={{ backgroundColor: option.swatch }}
                        aria-hidden="true"
                      />
                    )}
                    <span className={checked ? "font-medium" : ""}>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

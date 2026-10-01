import { CheckIcon } from "@/components/icons";
import type { FilterGroup, FilterKey, Filters } from "@/lib/filters";

type Props = {
  groups: FilterGroup[];
  filters: Filters;
  onToggle: (key: FilterKey, value: string) => void;
  idPrefix: string;
};

/** The checkbox groups shared by the desktop sidebar and the phone filter drawer. */
export function FilterOptions({ groups, filters, onToggle, idPrefix }: Props) {
  return (
    <div className="divide-y divide-line">
      {groups.map((group) => (
        <fieldset key={group.key} className="min-w-0 py-5 first:pt-0">
          <legend className="float-left mb-3 w-full text-sm font-medium uppercase tracking-[0.12em] text-ink">
            {group.label}
          </legend>
          <div className="clear-both flex flex-wrap gap-2">
            {group.options.map((option) => {
              const id = `${idPrefix}-${group.key}-${option.value}`;
              const checked = filters[group.key].includes(option.value);
              return (
                <label
                  key={option.value}
                  htmlFor={id}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-strong has-[:focus-visible]:ring-offset-2 ${
                    checked
                      ? "border-espresso bg-espresso text-paper"
                      : "border-line bg-paper text-ink hover:border-espresso/50"
                  }`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => onToggle(group.key, option.value)}
                  />
                  {option.swatch && (
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-ink/20"
                      style={{ backgroundColor: option.swatch }}
                      aria-hidden="true"
                    />
                  )}
                  {option.label}
                  {checked && <CheckIcon size={15} />}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

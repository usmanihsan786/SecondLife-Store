"use client";

import { useRef } from "react";
import { CheckIcon } from "@/components/icons";

export type OptionState = "available" | "sold-out" | "unavailable";

export type Option = {
  value: string;
  label: string;
  sublabel?: string;
  swatch?: string;
  state: OptionState;
};

type Props = {
  legend: string;
  options: Option[];
  selected?: string;
  onChange: (value: string) => void;
};

/**
 * A row of selectable option buttons (colours or sizes).
 * Behaves as a radio group: click/tap selects, arrow keys move between enabled options.
 * "unavailable" options (combinations that do not exist) are disabled.
 */
export function OptionGroup({ legend, options, selected, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = options.find((o) => o.value === selected);
  const enabled = options.map((o, i) => (o.state === "unavailable" ? -1 : i)).filter((i) => i >= 0);
  const focusIndex = Math.max(options.findIndex((o) => o.value === selected), enabled[0] ?? 0);

  const move = (from: number, step: 1 | -1) => {
    if (enabled.length === 0) return;
    const pos = enabled.indexOf(from);
    const next = enabled[(pos + step + enabled.length) % enabled.length];
    refs.current[next]?.focus();
    onChange(options[next].value);
  };

  return (
    <div className="min-w-0">
      <p id={`${legend}-label`} className="mb-3 text-sm text-muted">
        <span className="font-medium text-ink">{legend}</span>
        {current && <span>: {current.label}</span>}
      </p>
      <div role="radiogroup" aria-labelledby={`${legend}-label`} className="flex flex-wrap gap-2.5">
        {options.map((option, i) => {
          const checked = option.value === selected;
          const disabled = option.state === "unavailable";
          const soldOut = option.state === "sold-out";
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              disabled={disabled}
              tabIndex={i === focusIndex ? 0 : -1}
              data-value={option.value}
              onClick={() => onChange(option.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  move(i, 1);
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  move(i, -1);
                }
              }}
              className={`relative inline-flex min-h-12 min-w-[4.5rem] touch-manipulation items-center gap-2.5 rounded-lg border px-3.5 py-2 text-left text-[0.9375rem] transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                checked
                  ? "border-espresso bg-paper font-medium text-ink shadow-[inset_0_0_0_1px_var(--color-espresso)]"
                  : disabled
                    ? "cursor-not-allowed border-dashed border-line bg-transparent text-muted/80"
                    : "cursor-pointer border-line bg-paper text-ink hover:border-espresso/50"
              }`}
            >
              {option.swatch && (
                <span
                  className={`h-5 w-5 shrink-0 rounded-full border border-ink/20 ${disabled ? "opacity-40" : ""}`}
                  style={{ backgroundColor: option.swatch }}
                  aria-hidden="true"
                />
              )}
              <span className="flex flex-col leading-tight">
                <span className={soldOut || disabled ? "line-through decoration-muted/60" : ""}>{option.label}</span>
                {(option.sublabel || soldOut || disabled) && (
                  <span className="mt-0.5 text-xs font-normal text-muted">
                    {[option.sublabel, soldOut ? "Sold out" : disabled ? "Not available" : undefined]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </span>
              {checked && <CheckIcon size={16} className="ml-auto shrink-0 text-espresso" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

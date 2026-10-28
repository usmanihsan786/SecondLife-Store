type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium text-center tracking-[0.005em] transition-[background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)] select-none active:translate-y-px disabled:cursor-not-allowed disabled:active:translate-y-0 aria-disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-action text-white hover:bg-action-hover disabled:bg-surface-2 disabled:text-muted aria-disabled:bg-surface-2 aria-disabled:text-muted",
  secondary: "border border-line-strong bg-paper text-ink hover:border-ink",
  ghost: "text-ink hover:bg-surface",
  light: "bg-white text-ink hover:bg-surface",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-3.5 text-sm",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-[0.9375rem] sm:text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

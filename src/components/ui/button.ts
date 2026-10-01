type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-center transition-colors duration-200 select-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-paper hover:bg-espresso-hover disabled:bg-linen disabled:text-muted aria-disabled:bg-linen aria-disabled:text-muted",
  secondary: "border border-espresso/30 bg-paper text-espresso hover:border-espresso hover:bg-sand",
  ghost: "text-espresso hover:bg-sand",
  light: "bg-paper text-espresso hover:bg-sand",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

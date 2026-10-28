import type { Availability } from "@/types/product";

/** Small label on a product photo. */
export function SoldOutBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-control)] bg-white/95 px-2 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-sold ${className}`}
    >
      Sold out
    </span>
  );
}

/** Availability with a coloured dot: green when available, neutral grey when sold out. */
export function AvailabilityBadge({ availability, size = "md" }: { availability: Availability; size?: "sm" | "md" }) {
  const available = availability === "available";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${size === "sm" ? "text-[0.8125rem]" : "rounded-full px-3 py-1 text-sm"} ${
        size === "sm" ? (available ? "text-ok" : "text-sold") : available ? "bg-ok-soft text-ok" : "bg-sold-soft text-sold"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-ok" : "bg-sold"}`} aria-hidden="true" />
      {available ? "Available" : "Sold out"}
    </span>
  );
}

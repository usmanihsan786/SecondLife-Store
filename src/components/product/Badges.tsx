import type { Availability } from "@/types/product";

export function SoldOutBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-ink/85 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-paper ${className}`}
    >
      Sold out
    </span>
  );
}

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  const available = availability === "available";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
        available ? "bg-ok-soft text-ok" : "bg-sold-soft text-sold"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${available ? "bg-ok" : "bg-sold"}`} aria-hidden="true" />
      {available ? "Available" : "Sold out"}
    </span>
  );
}

import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-line bg-paper/60 px-6 py-14 text-center">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-md text-[0.9375rem] text-muted">{description}</p>}
      {action && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{action}</div>}
    </div>
  );
}

"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const noopSubscribe = () => () => {};

/** True when the page was opened with ?preview=1 (or the older ?sales-preview=1). */
export function usePreviewFlag() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const q = new URLSearchParams(window.location.search);
      return q.has("preview") || q.has("sales-preview");
    },
    () => false,
  );
}

/**
 * Wraps sample content used to review a design before real data exists. It only ever receives samples on the
 * development server (the server passes nothing in production builds), and even there it shows them only with
 * ?preview=1, under an unmistakable label.
 */
export function DevPreview({ label, children }: { label: string; children: ReactNode }) {
  const on = usePreviewFlag();
  if (!on) return null;
  return (
    <div className="relative outline-2 -outline-offset-4 outline-dashed outline-accent/70">
      <p className="absolute left-1/2 top-3 z-20 inline-flex w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white shadow-sm">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        Development preview · {label}
      </p>
      {children}
    </div>
  );
}

import type { ReactNode } from "react";

/** The one content width used site-wide: 1320px max, 16px gutters on phones. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[82.5rem] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

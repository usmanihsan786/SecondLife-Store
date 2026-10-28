import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  action?: ReactNode;
};

/** Eyebrow + serif title + optional intro and link. The same rhythm on every page. */
export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", action }: Props) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between sm:gap-8"}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">{eyebrow}</p>}
        <Tag
          className={`font-display leading-[1.08] text-ink ${
            Tag === "h1" ? "text-[2.25rem] sm:text-[2.875rem] lg:text-[3.25rem]" : "text-[1.875rem] sm:text-[2.375rem]"
          }`}
        >
          {title}
        </Tag>
        {description && <div className="mt-3 text-[0.9375rem] leading-relaxed text-muted sm:text-base">{description}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** A quiet text link with an arrow, used for "View all" style actions next to headings. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-ink"
    >
      {children}
      <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

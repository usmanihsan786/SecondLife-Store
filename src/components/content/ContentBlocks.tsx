import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

export type ContentSection = { heading: string; body: ReactNode };
export type FaqItem = { question: string; answer: ReactNode };
export type PageLink = { href: string; label: string; description?: string };

const proseClass =
  "space-y-3 text-[0.9375rem] leading-relaxed text-ink/85 sm:text-base [&_a]:font-medium [&_a]:text-espresso [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-ink";

/** Text sections under a page's main content: one h2 per section. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">{section.heading}</h2>
          <div className={`mt-3 max-w-3xl ${proseClass}`}>{section.body}</div>
        </section>
      ))}
    </div>
  );
}

/** Questions and answers as native disclosure widgets, so they work without JavaScript. */
export function Faq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">{title}</h2>
      <div className="mt-4 max-w-3xl divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
              <h3>{item.question}</h3>
              <span aria-hidden="true" className="text-xl leading-none text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className={`pb-4 ${proseClass}`}>{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** A small grid of internal links, e.g. related categories or guides. */
export function LinkCards({ title, links }: { title: string; links: PageLink[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line/70 bg-paper p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[0_14px_32px_-12px_rgb(74_54_40/0.22)]"
            >
              <span className="flex items-center justify-between gap-2 font-medium text-ink">
                {link.label}
                <ArrowRightIcon size={18} className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
              </span>
              {link.description && <span className="mt-1 text-sm text-muted">{link.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Visible breadcrumb trail. Pair it with breadcrumbJsonLd() using the same items. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className="hover:text-espresso">Home</Link></li>
        {trail.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-ink">{crumb.name}</span>
            ) : (
              <Link href={crumb.path} className="hover:text-espresso">{crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

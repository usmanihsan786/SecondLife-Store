import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

export type ContentSection = { heading: string; body: ReactNode };
export type FaqItem = { question: string; answer: ReactNode };
export type PageLink = { href: string; label: string; description?: string };

const proseClass =
  "space-y-3 text-[0.9375rem] leading-[1.7] text-ink/85 sm:text-base [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-accent [&_a]:underline-offset-4 hover:[&_a]:decoration-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_li]:marker:text-accent [&_strong]:font-medium [&_strong]:text-ink";

const blockTitle = "font-display text-[1.75rem] leading-tight text-ink sm:text-[2rem]";

/** Text sections under a page's main content: one h2 per section, at a comfortable reading width. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="max-w-3xl space-y-10 sm:space-y-12">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className={blockTitle}>{section.heading}</h2>
          <div className={`mt-3 ${proseClass}`}>{section.body}</div>
        </section>
      ))}
    </div>
  );
}

/** Questions and answers as native disclosure widgets, so they work without JavaScript. */
export function Faq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="max-w-3xl">
      <h2 className={blockTitle}>{title}</h2>
      <div className="mt-5 border-t border-line">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-left text-base font-medium text-ink transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
              <h3>{item.question}</h3>
              <span
                aria-hidden="true"
                className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-current after:transition-transform after:duration-200 group-open:after:scale-y-0"
              />
            </summary>
            <div className={`max-w-2xl pb-5 pr-10 ${proseClass}`}>{item.answer}</div>
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
      <h2 className={blockTitle}>{title}</h2>
      <ul className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href} className="border-b border-line">
            <Link href={link.href} className="group flex h-full min-h-16 items-center justify-between gap-4 py-4">
              <span>
                <span className="block font-medium text-ink transition-colors group-hover:text-accent-strong">{link.label}</span>
                {link.description && <span className="mt-0.5 block text-sm text-muted">{link.description}</span>}
              </span>
              <ArrowRightIcon size={18} className="shrink-0 text-accent-strong transition-transform group-hover:translate-x-1" />
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
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-1.5">
        <li>
          <Link href="/" className="inline-flex min-h-8 items-center hover:text-ink">Home</Link>
        </li>
        {trail.map((crumb, i) => (
          <li key={crumb.path} className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden="true" className="text-line-strong">/</span>
            {i === trail.length - 1 ? (
              <span aria-current="page" className="truncate text-ink">{crumb.name}</span>
            ) : (
              <Link href={crumb.path} className="inline-flex min-h-8 items-center hover:text-ink">{crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

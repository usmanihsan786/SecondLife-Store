import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/content/ContentBlocks";
import { Container } from "./Container";

type Props = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  /** Breadcrumb trail after Home, ending with this page. Leave out for top-level pages. */
  trail?: { name: string; path: string }[];
  /** Buttons or links under the description. */
  actions?: ReactNode;
  /** Extra content inside the band, e.g. category shortcuts. */
  children?: ReactNode;
};

/** The title band at the top of every inner page: breadcrumbs, eyebrow, the page's h1 and its intro. */
export function PageHeader({ title, eyebrow, description, trail, actions, children }: Props) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="pb-8 pt-5 sm:pb-12 sm:pt-7">
        {trail && <Breadcrumbs trail={trail} />}
        <div className={`max-w-3xl ${trail ? "mt-5 sm:mt-8" : "mt-3 sm:mt-6"}`}>
          {eyebrow && <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">{eyebrow}</p>}
          <h1 className="font-display text-[2.25rem] leading-[1.06] text-ink sm:text-[2.875rem] lg:text-[3.25rem]">{title}</h1>
          {description && (
            <div className="mt-4 max-w-2xl space-y-2 text-[0.9375rem] leading-relaxed text-muted sm:text-[1.0625rem]">{description}</div>
          )}
          {actions && <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">{actions}</div>}
        </div>
        {children}
      </Container>
    </div>
  );
}

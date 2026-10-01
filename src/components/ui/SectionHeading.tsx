import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, align = "left", as: Tag = "h2", action }: Props) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">{eyebrow}</p>
        )}
        <Tag
          className={`font-display font-semibold leading-tight text-ink ${Tag === "h1" ? "text-[2rem] sm:text-[2.5rem]" : "text-[1.75rem] sm:text-[2.125rem]"}`}
        >
          {title}
        </Tag>
        {description && <div className="mt-3 text-[0.9375rem] text-muted sm:text-base">{description}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

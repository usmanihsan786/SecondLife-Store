import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { PlaceholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  title: string;
  description: string;
  href: string;
  image: string | null;
  kind: PlaceholderKind;
  meta?: string;
  className?: string;
  wide?: boolean;
};

export function CollectionCard({ title, description, href, image, kind, meta, className = "", wide = false }: Props) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line/70 bg-paper shadow-[var(--shadow-card)] transition-shadow hover:shadow-[0_14px_32px_-12px_rgb(74_54_40/0.22)] ${className}`}
    >
      <div className={`relative overflow-hidden bg-sand ${wide ? "aspect-[16/9] md:aspect-[4/3]" : "aspect-[4/3]"}`}>
        <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-[1.03]">
          <SmartImage src={image} alt="" kind={kind} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="flex items-center justify-between gap-2 font-display text-xl font-semibold leading-tight text-ink sm:text-[1.375rem]">
          {title}
          <ArrowRightIcon size={18} className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
        </h3>
        <p className="mt-1 hidden text-sm text-muted sm:block">{description}</p>
        {meta && <p className="mt-1 text-xs text-muted sm:mt-2">{meta}</p>}
      </div>
    </Link>
  );
}

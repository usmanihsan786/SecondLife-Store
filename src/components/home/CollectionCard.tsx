import Link from "next/link";
import type { PlaceholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  title: string;
  description: string;
  href: string;
  image: string | null;
  kind: PlaceholderKind;
  meta?: string;
};

/** A collection (IKEA series): portrait photo, the series name in the display serif, a line about it and its size. */
export function CollectionCard({ title, description, href, image, kind, meta }: Props) {
  return (
    <Link href={href} className="group flex h-full flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
          <SmartImage src={image} alt="" kind={kind} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, (min-width: 480px) 42vw, 68vw" />
        </div>
      </div>
      <h3 className="mt-4 font-display text-[1.625rem] leading-none text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-snug text-muted">{description}</p>
      {meta && (
        <p className="mt-3 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-ink">
          Browse {meta}
        </p>
      )}
    </Link>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { PlaceholderKind } from "@/components/ui/ImagePlaceholder";
import { RotatingImage, RotationScope, type RotationFrame } from "@/components/ui/AutoRotate";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  title: string;
  description: string;
  href: string;
  image: string | null;
  kind: PlaceholderKind;
  meta?: string;
  /** Optional photo rotation (real photos of this range); the link always stays the series page. */
  frames?: RotationFrame[];
  delay?: number;
};

/**
 * A collection (IKEA series). On phones: a list row with a square photo, so five ranges fit without a long swipe.
 * From md: a portrait card with the series name in the display serif.
 */
export function CollectionCard({ title, description, href, image, kind, meta, frames, delay = 0 }: Props) {
  const rotating = !!frames && frames.length > 1;
  const sizes = "(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 96px";
  const card = (
    <Link href={href} className="group flex items-center gap-4 py-3 active:opacity-90 md:h-full md:flex-col md:items-stretch md:gap-0 md:py-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-surface-2 md:aspect-[3/4] md:h-auto md:w-full">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
          {rotating ? <RotatingImage sizes={sizes} /> : <SmartImage src={image} alt="" kind={kind} sizes={sizes} />}
        </div>
      </div>
      <div className="min-w-0 flex-1 md:flex md:flex-1 md:flex-col">
        <h3 className="font-display text-[1.5rem] leading-none text-ink md:mt-4 md:text-[1.625rem]">{title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-muted md:mt-2">{description}</p>
        {meta && (
          <p className="mt-1.5 text-[0.8125rem] text-ink md:mt-3 md:text-sm md:font-medium md:underline md:decoration-line-strong md:underline-offset-4 md:group-hover:decoration-ink">
            <span className="md:hidden">{meta}</span>
            <span className="hidden md:inline">Browse {meta}</span>
          </p>
        )}
      </div>
      <ArrowRightIcon size={18} className="shrink-0 text-accent-strong md:hidden" />
    </Link>
  );
  return rotating ? (
    <RotationScope frames={frames} delay={delay} className="md:h-full">
      {card}
    </RotationScope>
  ) : (
    card
  );
}

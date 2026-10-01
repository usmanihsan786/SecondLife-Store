"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { PlaceholderKind } from "@/components/ui/ImagePlaceholder";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  images: string[];
  alt: string;
  kind: PlaceholderKind;
};

const arrowClass =
  "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-espresso shadow-[var(--shadow-card)] transition-opacity hover:bg-paper disabled:opacity-0 sm:inline-flex";

/** Swipeable on touch screens (native scroll snapping), with arrows and thumbnails on larger screens. */
export function ProductGallery({ images, alt, kind }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(i, track.children.length - 1));
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / Math.max(track.clientWidth, 1))));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (count === 0) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand">
        <ImagePlaceholder kind={kind} label={`${alt}. Photos coming soon`} />
      </div>
    );
  }

  return (
    <section aria-label="Product photos" className="animate-fade-in">
      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={count > 1 ? 0 : undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[var(--radius-card)] bg-sand"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] w-full shrink-0 snap-center snap-always"
              aria-hidden={i !== index ? true : undefined}
            >
              <SmartImage
                src={src}
                alt={count > 1 ? `${alt}, photo ${i + 1} of ${count}` : alt}
                kind={kind}
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className={`${arrowClass} left-3`}>
              <ChevronLeftIcon />
              <span className="sr-only">Previous photo</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              className={`${arrowClass} right-3`}
            >
              <ChevronRightIcon />
              <span className="sr-only">Next photo</span>
            </button>
            <p className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-0.5 text-xs text-paper sm:hidden" aria-live="polite">
              {index + 1} / {count}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <>
          {/* Dots on phones */}
          <div className="mt-3 flex justify-center gap-1 sm:hidden">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span className={`block h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-espresso" : "w-1.5 bg-espresso/25"}`} />
              </button>
            ))}
          </div>

          {/* Thumbnails on larger screens */}
          <ul className="mt-3 hidden grid-cols-5 gap-2.5 sm:grid">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 bg-sand transition-colors ${
                    i === index ? "border-espresso" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* The first thumbnail shares the main photo's src, so it must be eager too or Next flags the LCP image as lazy. */}
                  <SmartImage src={src} alt="" kind={kind} sizes="120px" priority={i === 0} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

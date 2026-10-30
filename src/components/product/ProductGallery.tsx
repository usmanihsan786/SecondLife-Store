"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { PlaceholderKind } from "@/components/ui/ImagePlaceholder";
import { usePhotosPaused } from "@/components/ui/AutoRotate";
import { SmartImage } from "@/components/ui/SmartImage";

type Props = {
  images: string[];
  alt: string;
  kind: PlaceholderKind;
  /** What each photo shows, in the same order as images. Added to that photo's alt text. */
  notes?: string[];
};

const roundButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-[var(--shadow-card)] transition-[opacity,background-color] hover:bg-white disabled:pointer-events-none disabled:opacity-0";

/** How long each photo stays before the gallery moves on by itself. */
const AUTOPLAY_MS = 3000;

/**
 * Swipeable on touch screens (native scroll snapping), with arrows and thumbnails on larger screens.
 * While on screen it moves to the next photo every few seconds; it stops for good as soon as the visitor touches,
 * clicks or uses the keyboard in the gallery, pauses on hover, and never moves with reduced motion, a hidden tab
 * or the page-wide "Pause photos" switch.
 * Photos are shown whole (object-contain), never cropped, so buyers see the complete item. Tapping the photo opens
 * a full-screen view.
 */
export function ProductGallery({ images, alt, kind, notes = [] }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const photoAlt = (i: number) =>
    [alt, notes[i], count > 1 ? `photo ${i + 1} of ${count}` : undefined].filter(Boolean).join(", ");

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

  const sectionRef = useRef<HTMLElement>(null);
  const pausedByVisitor = usePhotosPaused();
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || count < 2) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    const stop = () => setStopped(true);
    el.addEventListener("pointerdown", stop);
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("keydown", stop);
    el.addEventListener("wheel", stop, { passive: true });
    const onVisibility = () => setPageHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => {
      observer.disconnect();
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("keydown", stop);
      el.removeEventListener("wheel", stop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  useEffect(() => {
    if (count < 2 || stopped || hovered || !visible || pageHidden || reducedMotion || pausedByVisitor) return;
    const id = window.setTimeout(() => goTo((index + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [count, stopped, hovered, visible, pageHidden, reducedMotion, pausedByVisitor, index, goTo]);

  const openViewer = () => {
    const dialog = viewerRef.current;
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
  };

  if (count === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
        <ImagePlaceholder kind={kind} label={`${alt}. Photos coming soon`} />
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Product photos"
      className="animate-fade-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={count > 1 ? 0 : undefined}
          aria-label={count > 1 ? "Photos. Use the arrow keys to move between them." : undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[var(--radius-card)] bg-surface-2"
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-square w-full shrink-0 snap-center snap-always" aria-hidden={i !== index ? true : undefined}>
              <button
                type="button"
                onClick={openViewer}
                tabIndex={i === index ? 0 : -1}
                className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-4px]"
              >
                <span className="sr-only">Open photo {i + 1} full screen</span>
                <SmartImage
                  src={src}
                  alt={photoAlt(i)}
                  kind={kind}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority={i === 0}
                  // The next photo loads ahead of time, so moving to it never shows a blank frame.
                  eager={visible && i === (index + 1) % count}
                  className="object-contain"
                />
              </button>
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className={`${roundButton} absolute left-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex`}>
              <ChevronLeftIcon />
              <span className="sr-only">Previous photo</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              className={`${roundButton} absolute right-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex`}
            >
              <ChevronRightIcon />
              <span className="sr-only">Next photo</span>
            </button>
          </>
        )}
        <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium tabular-nums text-ink" aria-live="polite">
          {count > 1 ? `${index + 1} / ${count}` : "1 photo"}
          <span className="sr-only"> photos</span>
        </p>
      </div>

      {count > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto sm:gap-2.5">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative block h-16 w-16 overflow-hidden rounded-[var(--radius-control)] bg-surface-2 ring-offset-2 transition-[opacity,box-shadow] sm:h-20 sm:w-20 ${
                  i === index ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"
                }`}
              >
                {/* The first thumbnail shares the main photo's src, so it must be eager too or Next flags the LCP image as
                    lazy; low priority, so its small file doesn't compete with the main photo. */}
                <SmartImage src={src} alt="" kind={kind} sizes="80px" eager={i === 0} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Full-screen viewer */}
      <dialog
        ref={viewerRef}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) viewerRef.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(index + 1);
          if (e.key === "ArrowLeft") goTo(index - 1);
        }}
      >
        <div className="relative flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <p className="text-sm tabular-nums text-white/80">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => viewerRef.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <CloseIcon size={24} />
              <span className="sr-only">Close photo viewer</span>
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={() => viewerRef.current?.close()}>
            <Image src={images[index]} alt={photoAlt(index)} fill sizes="100vw" className="object-contain" />
          </div>
          {count > 1 && (
            <div className="flex shrink-0 items-center justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} className={roundButton}>
                <ChevronLeftIcon />
                <span className="sr-only">Previous photo</span>
              </button>
              <button type="button" onClick={() => goTo(index + 1)} disabled={index === count - 1} className={roundButton}>
                <ChevronRightIcon />
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}

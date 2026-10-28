"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** One photo in a rotation, with everything that must change together with it. */
export type RotationFrame = {
  src: string;
  alt: string;
  /** Where the card leads while this photo is shown, e.g. the product with this colour and size selected. */
  href: string;
  /** Short text that describes this photo, e.g. "Brown · 160 × 200". */
  detail?: string;
};

type RotationState = { frames: RotationFrame[]; index: number; preload: boolean; markLoaded: (src: string) => void };
const RotationContext = createContext<RotationState | null>(null);

function useRotation() {
  const ctx = useContext(RotationContext);
  if (!ctx) throw new Error("Rotating components must be inside <RotationScope>.");
  return ctx;
}

type ScopeProps = {
  frames: RotationFrame[];
  /** Time each photo stays on screen. */
  interval?: number;
  /** Extra wait before the first change, so cards next to each other do not change at the same moment. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Rotates a card's photo every few seconds. The first frame is what the server renders, so hydration is stable and
 * crawlers see the same image as before. The rotation only runs while the card is on screen, the tab is visible,
 * the pointer and keyboard focus are elsewhere, the next photo has loaded, and the visitor has not asked for
 * reduced motion.
 */
export function RotationScope({ frames, interval = 3000, delay = 0, className = "", children }: ScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  // Photos that have finished downloading. The rotation only moves on once the next photo is ready.
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const markLoaded = (src: string) => setLoaded((set) => (set.has(src) ? set : new Set(set).add(src)));
  const canRotate = frames.length > 1 && !reducedMotion;

  // Visibility of the card itself: no timers and no extra downloads for cards that are off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !canRotate) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [canRotate]);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.visibilityState === "hidden");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(query.matches);
    onMotion();
    query.addEventListener("change", onMotion);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      query.removeEventListener("change", onMotion);
    };
  }, []);

  // Wait for the browser to be idle after the page has loaded before fetching any second photo,
  // so the rotation never competes with the first, most important images.
  useEffect(() => {
    if (!canRotate || !visible || started) return;
    let idle = 0;
    let timer = 0;
    const begin = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
      if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setStarted(true));
      else timer = window.setTimeout(() => setStarted(true), 200);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [canRotate, visible, started]);

  const nextReady = loaded.has(frames[(index + 1) % frames.length]?.src);
  const paused = !canRotate || !started || !visible || hovered || focused || pageHidden || !nextReady;
  const firstChange = useRef(true);

  useEffect(() => {
    if (paused) return;
    const wait = interval + (firstChange.current ? delay : 0);
    const id = window.setTimeout(() => {
      firstChange.current = false;
      setIndex((i) => (i + 1) % frames.length);
    }, wait);
    return () => window.clearTimeout(id);
  }, [paused, index, interval, delay, frames.length]);

  return (
    <RotationContext.Provider value={{ frames, index, preload: started && canRotate, markLoaded }}>
      <div
        ref={ref}
        className={className}
        data-rotation=""
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        {children}
      </div>
    </RotationContext.Provider>
  );
}

type ImageProps = {
  sizes: string;
  /** Only for the page's main (LCP) image. Later frames are never high priority. */
  priority?: boolean;
  className?: string;
};

/**
 * The stacked photos of a rotation, filling their (relatively positioned) parent. Only the current photo and the
 * next one are in the page; the next is fetched quietly ahead of time, then cross-faded in, so there is never a
 * blank frame. Photos keep their aspect ratio (object-cover, like the static cards).
 */
export function RotatingImage({ sizes, priority = false, className = "object-cover" }: ImageProps) {
  const { frames, index, preload, markLoaded } = useRotation();
  const next = (index + 1) % frames.length;
  // The photo that was just shown stays underneath while the new one fades in on top of it.
  const [previous, setPrevious] = useState<number | null>(null);
  const shown = useRef(index);
  useEffect(() => {
    if (shown.current === index) return;
    setPrevious(shown.current);
    shown.current = index;
    const id = window.setTimeout(() => setPrevious(null), 700);
    return () => window.clearTimeout(id);
  }, [index]);

  const layers = [...new Set([previous, index, preload && frames.length > 1 ? next : null].filter((i): i is number => i !== null))];

  return (
    <>
      {layers.map((i) => {
        const frame = frames[i];
        const current = i === index;
        return (
          <Image
            key={frame.src}
            src={frame.src}
            alt={current ? frame.alt : ""}
            aria-hidden={current ? undefined : true}
            fill
            sizes={sizes}
            loading={i === 0 && priority ? "eager" : i === 0 ? "lazy" : "eager"}
            fetchPriority={i === 0 && priority ? "high" : i === 0 ? undefined : "low"}
            onLoad={() => markLoaded(frame.src)}
            className={`${className} transition-opacity duration-[600ms] ease-[var(--ease-out-soft)] ${
              current ? "z-[1] opacity-100" : i === previous ? "z-0 opacity-100" : "z-0 opacity-0"
            }`}
          />
        );
      })}
    </>
  );
}

/** A link whose destination follows the photo on screen (e.g. the product with the shown colour and size). */
export function RotationLink({ className, children }: { className?: string; children: ReactNode }) {
  const { frames, index } = useRotation();
  return (
    <Link href={frames[index].href} className={className}>
      {children}
    </Link>
  );
}

/** The text that describes the photo on screen. */
export function RotationDetail({ className }: { className?: string }) {
  const { frames, index } = useRotation();
  const detail = frames[index].detail;
  return detail ? <span className={className}>{detail}</span> : null;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/whatsapp";

/** One photo in a rotation, with everything that must change together with it. */
export type RotationFrame = {
  src: string;
  alt: string;
  /** Where the card leads while this photo is shown, e.g. the product with this colour and size selected. */
  href: string;
  /** Short text that describes this photo, e.g. "Brown · 160 × 200". */
  detail?: string;
  /** Prefilled WhatsApp message about the item in this photo. */
  inquiry?: string;
};

// ---------------------------------------------------------------------------------------------------------------
// One page-wide "pause photos" switch (WCAG 2.2.2: moving content must be possible to pause). Kept for the visit.

const PAUSE_KEY = "photos-paused";
const pauseListeners = new Set<() => void>();
let pausedByVisitor: boolean | null = null;

function readPaused() {
  if (pausedByVisitor === null) {
    try {
      pausedByVisitor = sessionStorage.getItem(PAUSE_KEY) === "1";
    } catch {
      pausedByVisitor = false;
    }
  }
  return pausedByVisitor;
}

function setPausedByVisitor(value: boolean) {
  pausedByVisitor = value;
  try {
    sessionStorage.setItem(PAUSE_KEY, value ? "1" : "0");
  } catch {
    // Storage can be unavailable (private mode); the switch still works for this page.
  }
  pauseListeners.forEach((l) => l());
}

export function usePhotosPaused() {
  return useSyncExternalStore(
    (listener) => {
      pauseListeners.add(listener);
      return () => pauseListeners.delete(listener);
    },
    readPaused,
    () => false,
  );
}

/** Small text button that pauses or resumes every photo rotation on the page. */
export function RotationPauseButton({ className = "" }: { className?: string }) {
  const paused = usePhotosPaused();
  return (
    <button
      type="button"
      onClick={() => setPausedByVisitor(!paused)}
      aria-pressed={paused}
      className={`inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink ${className}`}
    >
      <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full border border-line-strong">
        {paused ? (
          <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor"><path d="M3 1.5v9l7.5-4.5z" /></svg>
        ) : (
          <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" /></svg>
        )}
      </span>
      {paused ? "Play photos" : "Pause photos"}
    </button>
  );
}

// ---------------------------------------------------------------------------------------------------------------

type RotationState = {
  frames: RotationFrame[];
  index: number;
  preload: boolean;
  loaded: ReadonlySet<string>;
  markLoaded: (src: string) => void;
};
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
  /** Let touch users swipe left/right to change the photo. Only for cards that are not inside a horizontal shelf. */
  swipe?: boolean;
  className?: string;
  children: ReactNode;
};

/** After a swipe, the automatic rotation waits this long before carrying on. */
const MANUAL_HOLD = 6000;

/**
 * Rotates a card's photo every few seconds. The first frame is what the server renders, so hydration is stable and
 * crawlers see the same image as before. The rotation only runs while the card is on screen, the tab is visible,
 * the pointer and keyboard focus are elsewhere, the next photo has loaded, the visitor has not paused photos, and
 * the visitor has not asked for reduced motion.
 */
export function RotationScope({ frames, interval = 3000, delay = 0, swipe = false, className = "", children }: ScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const [holding, setHolding] = useState(false);
  const pausedByVisitor = usePhotosPaused();
  // Photos that have finished downloading. The rotation only moves on once the next photo is ready.
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const markLoaded = useCallback((src: string) => setLoaded((set) => (set.has(src) ? set : new Set(set).add(src))), []);
  const hasFrames = frames.length > 1;
  const autoplay = hasFrames && !reducedMotion && !pausedByVisitor;

  // Visibility of the card itself: no timers and no extra downloads for cards that are off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFrames) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasFrames]);

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
    if (!hasFrames || !visible || started) return;
    let idle = 0;
    let timer = 0;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    const begin = () => {
      if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setStarted(true));
      else timer = window.setTimeout(() => setStarted(true), 200);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [hasFrames, visible, started]);

  const nextReady = loaded.has(frames[(index + 1) % frames.length]?.src);
  const paused = !autoplay || !started || !visible || hovered || focused || pageHidden || holding || !nextReady;
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

  // Release a manual hold after a while.
  useEffect(() => {
    if (!holding) return;
    const id = window.setTimeout(() => setHolding(false), MANUAL_HOLD);
    return () => window.clearTimeout(id);
  }, [holding, index]);

  // Touch swipe: left/right changes the photo. A swipe never also counts as a tap on the card.
  useEffect(() => {
    const el = ref.current;
    if (!el || !swipe || !hasFrames) return;
    let x = 0;
    let y = 0;
    let swiped = false;
    const onStart = (e: TouchEvent) => {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      swiped = false;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x;
      const dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      swiped = true;
      setStarted(true);
      setHolding(true);
      setIndex((i) => (i + (dx < 0 ? 1 : -1) + frames.length) % frames.length);
    };
    const onClick = (e: MouseEvent) => {
      if (!swiped) return;
      swiped = false;
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("click", onClick, true);
    };
  }, [swipe, hasFrames, frames.length]);

  return (
    <RotationContext.Provider value={{ frames, index, preload: started && hasFrames, loaded, markLoaded }}>
      <div
        ref={ref}
        className={`${swipe && hasFrames ? "touch-pan-y" : ""} ${className}`}
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
 * next one are in the page; the next is fetched quietly ahead of time, then cross-faded in. The photo that was on
 * screen stays underneath until the new one has loaded, so there is never a blank frame.
 */
export function RotatingImage({ sizes, priority = false, className = "object-cover" }: ImageProps) {
  const { frames, index, preload, loaded, markLoaded } = useRotation();
  const next = (index + 1) % frames.length;
  const [previous, setPrevious] = useState<number | null>(null);
  const shown = useRef(index);
  useEffect(() => {
    if (shown.current === index) return;
    setPrevious(shown.current);
    shown.current = index;
  }, [index]);
  const currentLoaded = loaded.has(frames[index].src);
  useEffect(() => {
    if (previous === null || !currentLoaded) return;
    const id = window.setTimeout(() => setPrevious(null), 700);
    return () => window.clearTimeout(id);
  }, [previous, currentLoaded]);

  const layers = [...new Set([previous, index, preload ? next : null].filter((i): i is number => i !== null))];

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

/** Small position dots. Decorative (hidden from screen readers); the photo itself carries the alt text. */
export function RotationDots({ className = "" }: { className?: string }) {
  const { frames, index } = useRotation();
  if (frames.length < 2 || frames.length > 14) return null;
  return (
    <span aria-hidden="true" className={`pointer-events-none flex items-center gap-1 ${className}`}>
      {frames.map((f, i) => (
        <span
          key={f.src}
          className={`block h-1 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-3.5 bg-white" : "w-1 bg-white/60"}`}
        />
      ))}
    </span>
  );
}

/** A link whose destination follows the photo on screen (e.g. the product with the shown colour and size). */
export function RotationLink({
  className,
  children,
  ...rest
}: { className?: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { frames, index } = useRotation();
  return (
    <Link href={frames[index].href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** The text that describes the photo on screen. */
export function RotationDetail({ className, fallback }: { className?: string; fallback?: ReactNode }) {
  const { frames, index } = useRotation();
  const detail = frames[index].detail ?? fallback;
  return detail ? <span className={className}>{detail}</span> : null;
}

/** WhatsApp button whose message names the item in the photo on screen. */
export function RotationWhatsApp({ className, children }: { className?: string; children: ReactNode }) {
  const { frames, index } = useRotation();
  return (
    <a href={whatsappUrl(frames[index].inquiry)} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon size={17} />
      {children}
    </a>
  );
}

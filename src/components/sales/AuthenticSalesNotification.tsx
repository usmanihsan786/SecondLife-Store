"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePreviewFlag } from "@/components/dev/DevPreview";
import { CloseIcon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import type { SaleNotice } from "@/lib/sales";

const SHOWN_KEY = "sale-notice-shown";
const ENGAGED_AFTER_MS = 20_000;
const ENGAGED_SCROLL = 0.3;
const VISIBLE_MS = 5_000;

type Props = {
  /** Only real, published sales (from lib/sales.ts). Empty means nothing is ever shown. */
  notices: SaleNotice[];
  /**
   * Development only: a clearly labelled sample, shown with ?preview=1 on `next dev` so the design can be reviewed.
   * Production builds never receive it.
   */
  devSample?: SaleNotice;
};

function relativeDay(soldAt: string) {
  const days = Math.round((Date.now() - new Date(`${soldAt}T00:00:00Z`).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return "Recently";
}

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** Something on screen the notice must not interrupt: typing, choosing a colour/size, a menu, the sticky bar. */
function busy() {
  const el = document.activeElement;
  const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
  const choosing = !!el?.closest('[role="radiogroup"]');
  return typing || choosing || document.body.hasAttribute("data-sticky-bar") || !!document.querySelector("dialog[open]");
}

/**
 * A small "recently purchased" notice for verified sales only. At most one per visit, after the visitor has been on
 * the page for a while and scrolled, never while they are typing, choosing an option or using a menu. Visible for
 * five seconds (a thin bar shows the time left), dismissible. Bottom-left on desktop; on phones it sits above the
 * bottom safe area and stops short of the WhatsApp button's corner.
 */
export function AuthenticSalesNotification({ notices, devSample }: Props) {
  const preview = usePreviewFlag();
  const [notice, setNotice] = useState<SaleNotice | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const usePreview = preview && !!devSample;
    const candidate = usePreview ? devSample : notices[0];
    if (!candidate) return;
    try {
      if (!usePreview && sessionStorage.getItem(SHOWN_KEY)) return;
    } catch {
      // No storage: the per-visit limit then only applies to this page.
    }
    const start = Date.now();
    let shown = false;
    const tryShow = () => {
      if (shown || document.visibilityState === "hidden") return;
      const scrolled = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const engaged = usePreview
        ? Date.now() - start >= 1500
        : Date.now() - start >= ENGAGED_AFTER_MS && scrolled >= ENGAGED_SCROLL;
      if (!engaged || busy()) return;
      shown = true;
      try {
        if (!usePreview) sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {}
      setNotice(candidate);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    };
    const id = window.setInterval(tryShow, usePreview ? 300 : 2000);
    return () => window.clearInterval(id);
  }, [notices, devSample, preview]);

  // Hide after a few seconds, and remove it once the exit transition has finished.
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => window.clearTimeout(id);
  }, [visible]);
  useEffect(() => {
    if (visible || !notice) return;
    const id = window.setTimeout(() => setNotice(null), 500);
    return () => window.clearTimeout(id);
  }, [visible, notice]);

  if (!notice) return null;
  // The sample (and its label) only exist on the development server; production builds drop this branch.
  const isSample = process.env.NODE_ENV === "development" && notice === devSample;

  return (
    <aside
      aria-label="Recent purchase"
      data-sale-notice=""
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 z-30 w-[min(22rem,calc(100vw-5.25rem))] overflow-hidden rounded-xl border border-line/80 bg-white shadow-[0_1px_2px_rgb(32_35_32/0.06),0_18px_40px_-16px_rgb(32_35_32/0.35)] transition-[opacity,translate,scale] duration-500 ease-[var(--ease-out-soft)] motion-reduce:transition-none sm:left-5 md:bottom-6 md:left-6 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
      }`}
    >
      {isSample && (
        <p className="flex items-center gap-1.5 whitespace-nowrap bg-ink px-3 py-1.5 text-[0.75rem] font-medium text-white">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Preview · sample, not a real sale
        </p>
      )}
      <div className="flex items-center gap-2.5 p-2.5 pr-9 min-[360px]:gap-3 min-[360px]:p-3 min-[360px]:pr-10 sm:gap-3.5 sm:p-3.5 sm:pr-11">
        {notice.image && (
          <Link href={notice.href} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface-2 min-[360px]:h-14 min-[360px]:w-14 sm:h-16 sm:w-16" tabIndex={-1} aria-hidden="true">
            <Image src={notice.image} alt="" fill sizes="64px" className="object-cover" />
          </Link>
        )}
        <div className="min-w-0">
          <p className="text-[0.875rem] leading-snug text-ink sm:text-[0.9375rem]">
            <span className="font-semibold">{notice.who}</span> purchased {article(notice.productName)}{" "}
            <span className="font-medium">{notice.productName}</span>
          </p>
          <p className="mt-0.5 text-[0.8125rem] text-muted">
            {[notice.city, relativeDay(notice.soldAt)].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap text-[0.8125rem]">
            <span className="inline-flex items-center gap-1 font-medium text-ok">
              <span aria-hidden="true" className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ok text-white">
                <svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              Verified purchase
            </span>
            <Link href={notice.href} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              View product
            </Link>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          trackEvent("sales_notification_dismiss", { notice_id: notice.id, page_path: window.location.pathname });
        }}
        className={`absolute right-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink ${isSample ? "top-8" : "top-1.5"}`}
      >
        <CloseIcon size={16} />
        <span className="sr-only">Close</span>
      </button>
      {/* Time left before it closes by itself. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-surface-2">
        <span
          className="block h-full origin-left bg-accent motion-reduce:hidden"
          style={{ transform: visible ? "scaleX(0)" : "scaleX(1)", transition: visible ? `transform ${VISIBLE_MS}ms linear` : "none" }}
        />
      </span>
    </aside>
  );
}

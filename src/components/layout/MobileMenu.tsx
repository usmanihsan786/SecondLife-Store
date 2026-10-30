"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { infoNav, shopNav, siteConfig } from "@/config/site";
import { series } from "@/data/options";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { isActive } from "./NavLinks";

export function MobileMenu({ logo }: { logo: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => dialogRef.current?.close();

  // Close the menu after navigating.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => {
          const dialog = dialogRef.current;
          if (!dialog) return;
          if (typeof dialog.showModal === "function") dialog.showModal();
          else dialog.setAttribute("open", ""); // very old browsers without <dialog> support
          setOpen(true);
        }}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-ink transition-colors hover:bg-surface"
      >
        <MenuIcon size={24} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        className="drawer drawer-right"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col bg-canvas">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
            {logo}
            <button
              type="button"
              onClick={close}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-ink transition-colors hover:bg-surface"
            >
              <CloseIcon size={24} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
            <p className="px-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">Shop</p>
            <ul className="mt-2">
              {shopNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center justify-between px-1 font-display text-[1.5rem] leading-none transition-colors hover:text-accent-strong ${
                        active ? "text-accent-strong" : "text-ink"
                      }`}
                    >
                      {item.label}
                      <ArrowRightIcon size={18} className="text-line-strong" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-7 px-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">IKEA series</p>
            <ul className="mt-3 flex flex-wrap gap-2 px-1">
              {Object.values(series).map((range) => (
                <li key={range.href}>
                  <Link
                    href={range.href}
                    onClick={close}
                    aria-current={isActive(pathname, range.href) ? "page" : undefined}
                    className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-white"
                  >
                    {range.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 px-1 text-xs font-medium uppercase tracking-[0.16em] text-muted">Information</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {infoNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-12 items-center px-1 text-[0.9375rem] transition-colors hover:text-ink ${active ? "font-medium text-ink" : "text-ink/75"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg", "w-full")}>
              <WhatsAppIcon />
              Message us on WhatsApp
            </a>
            <a href={`tel:${siteConfig.phoneLink}`} className="mt-2 flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] text-ink">
              <PhoneIcon size={16} />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}

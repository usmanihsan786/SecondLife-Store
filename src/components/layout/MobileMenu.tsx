"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { mainNav, siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
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
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-espresso hover:bg-sand"
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
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-espresso hover:bg-sand"
            >
              <CloseIcon size={24} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-2 py-3">
            <ul>
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-13 items-center rounded-lg px-3 text-lg transition-colors hover:bg-sand ${
                        active ? "bg-sand font-medium text-espresso" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg", "w-full")}>
              <WhatsAppIcon />
              Message us on WhatsApp
            </a>
            <p className="mt-3 text-center text-sm text-muted">Serving customers across the {siteConfig.serviceArea}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

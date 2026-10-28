"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/site";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5 xl:gap-1.5">
        {mainNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center px-2.5 text-[0.9375rem] transition-colors after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-px after:origin-left after:bg-ink after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 xl:px-3 xl:after:inset-x-3 ${
                  active ? "font-medium text-ink after:scale-x-100" : "text-ink/75 after:scale-x-0"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

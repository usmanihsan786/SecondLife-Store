import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./NavLinks";

/** A thin strip of true, useful facts above the header. It scrolls away; the header below stays. */
function UtilityBar() {
  return (
    <div className="bg-ink text-white/85">
      <Container className="flex h-9 items-center justify-center gap-6 text-[0.8125rem] sm:justify-between">
        <p className="truncate">
          Genuine used IKEA furniture<span className="hidden sm:inline"> · Independent reseller in the {siteConfig.serviceArea}</span>
        </p>
        <div className="hidden items-center gap-5 sm:flex">
          <a href={`tel:${siteConfig.phoneLink}`} className="inline-flex min-h-9 items-center gap-1.5 transition-colors hover:text-white">
            <PhoneIcon size={14} />
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/delivery-areas" className="hidden min-h-9 items-center transition-colors hover:text-white md:inline-flex">
            Delivery enquiries across the UAE
          </Link>
        </div>
      </Container>
    </div>
  );
}

export function Header() {
  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/85">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-1">
            {/* Wrapped, because the button's own inline-flex would override "hidden". */}
            <div className="hidden xl:block">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "md")}>
                <WhatsAppIcon size={18} />
                WhatsApp us
              </a>
            </div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] text-ink transition-colors hover:bg-surface xl:hidden"
            >
              <WhatsAppIcon size={22} />
              <span className="sr-only">Message us on WhatsApp</span>
            </a>
            <MobileMenu logo={<Logo />} />
          </div>
        </Container>
      </header>
    </>
  );
}

import { WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { whatsappUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/95 backdrop-blur-sm supports-[backdrop-filter]:bg-canvas/85">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-1">
          <div className="hidden xl:block">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "md")}>
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-espresso hover:bg-sand xl:hidden"
          >
            <WhatsAppIcon size={22} />
            <span className="sr-only">Message us on WhatsApp</span>
          </a>
          <MobileMenu logo={<Logo />} />
        </div>
      </Container>
    </header>
  );
}

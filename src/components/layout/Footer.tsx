import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/options";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const linkClass = "inline-flex min-h-10 items-center text-[0.9375rem] text-muted transition-colors hover:text-espresso";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-sand/60">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo size="footer" />
            <p className="mt-4 text-[0.9375rem] text-muted">
              Quality preloved IKEA beds, mattresses, daybeds and sofa beds in the {siteConfig.serviceArea}.
            </p>
          </div>

          <nav aria-label="Shop">
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-ink">Shop</h2>
            <ul className="mt-3">
              <li>
                <Link href="/shop" className={linkClass}>All furniture</Link>
              </li>
              {Object.values(categories).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={linkClass}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information">
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-ink">Information</h2>
            <ul className="mt-3">
              <li><Link href="/about" className={linkClass}>About us</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-ink">Get in touch</h2>
            <ul className="mt-3">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneLink}`} className={`${linkClass} gap-2.5`}>
                  <PhoneIcon size={18} /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} gap-2.5 break-all`}>
                  <MailIcon size={18} className="shrink-0" /> {siteConfig.email}
                </a>
              </li>
              {siteConfig.instagramUrl && (
                <li>
                  <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                    <InstagramIcon size={18} /> Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[0.8125rem] text-muted sm:flex-row sm:justify-between sm:gap-6">
          <p>
            © {year} {siteConfig.name}. {siteConfig.serviceArea}.
          </p>
          <p className="sm:text-right">Independent reseller of preloved furniture. Not affiliated with or endorsed by IKEA.</p>
        </div>
      </Container>
    </footer>
  );
}

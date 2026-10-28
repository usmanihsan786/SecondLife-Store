import Link from "next/link";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/options";
import { guides } from "@/data/guides";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const linkClass = "inline-flex min-h-10 items-center text-[0.9375rem] text-muted transition-colors hover:text-ink";
const headingClass = "text-xs font-medium uppercase tracking-[0.16em] text-ink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="pt-14 pb-24 sm:pt-16 md:pb-28 max-lg:in-data-sticky-bar:pb-44!">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.25fr_1fr] lg:gap-12">
          <div className="max-w-sm">
            <Logo size="footer" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Genuine used IKEA beds, mattresses, daybeds and sofa beds for Dubai and the {siteConfig.serviceArea}.
              Real photos of our own stock, and answers on WhatsApp.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "md", "self-start")}>
                <WhatsAppIcon size={18} />
                WhatsApp us
              </a>
              <a href={`tel:${siteConfig.phoneLink}`} className={`${linkClass} gap-2 self-start text-ink`}>
                <PhoneIcon size={16} /> {siteConfig.phoneDisplay}
              </a>
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} gap-2 self-start break-all`}>
                  <MailIcon size={16} className="shrink-0" /> {siteConfig.email}
                </a>
              )}
              {siteConfig.instagramUrl && (
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2 self-start`}>
                  <InstagramIcon size={16} /> Instagram
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Shop">
            <h2 className={headingClass}>Shop</h2>
            <ul className="mt-3">
              <li>
                <Link href="/shop" className={linkClass}>All furniture</Link>
              </li>
              {Object.values(categories).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={linkClass}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Buying guides">
            <h2 className={headingClass}>Buying guides</h2>
            <ul className="mt-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className={`${linkClass} py-1.5 leading-snug`}>{g.navLabel ?? g.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information">
            <h2 className={headingClass}>Information</h2>
            <ul className="mt-3">
              <li><Link href="/delivery-areas" className={linkClass}>Delivery &amp; areas</Link></li>
              <li><Link href="/guides" className={linkClass}>All guides</Link></li>
              <li><Link href="/about" className={linkClass}>About us</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-muted lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0">
            © {year} {siteConfig.name}. {siteConfig.serviceArea}.
          </p>
          <p className="lg:text-right">
            {siteConfig.name} is an independent reseller of genuine used IKEA furniture. Not affiliated with, sponsored or
            endorsed by IKEA.
          </p>
        </div>
      </Container>
    </footer>
  );
}

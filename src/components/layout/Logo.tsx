import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type Props = { size?: "header" | "footer" };

/**
 * The store logo: the house-and-lamp mark from /public/images/brand/mark.png plus the store name
 * set in the site's heading font. The name comes from siteConfig.name, so renaming the store is a
 * one-line change and the logo is always crisp, light and readable on phones.
 * Original artwork only: no IKEA logo, typeface or blue/yellow colour scheme.
 */
export function Logo({ size = "header" }: Props) {
  const header = size === "header";
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-md" aria-label={`${siteConfig.name} home`}>
      <Image
        src={siteConfig.logo.mark}
        alt=""
        width={siteConfig.logo.markSize}
        height={siteConfig.logo.markSize}
        sizes={header ? "(min-width: 1024px) 48px, 40px" : "64px"}
        preload={header}
        loading={header ? "eager" : "lazy"}
        className={header ? "h-9 w-9 min-[360px]:h-10 min-[360px]:w-10 lg:h-12 lg:w-12" : "h-16 w-16"}
      />
      <span
        className={`font-display font-semibold leading-none tracking-[0.01em] text-espresso ${
          header
            ? "text-[1.0625rem] min-[360px]:text-[1.25rem] min-[400px]:text-[1.375rem] lg:text-[1.625rem]"
            : "text-[1.75rem]"
        }`}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}

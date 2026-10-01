import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { existingImage } from "@/lib/catalog";

type Props = { size?: "header" | "footer" };

/**
 * Shows your logo from /public/images/brand/logo.png (the file itself is never resized or edited).
 * The height is set per screen size and the width follows the logo's own proportions,
 * so it is never stretched or cropped. Its real pixel size lives in siteConfig.logo.
 */
export function Logo({ size = "header" }: Props) {
  const src = existingImage(siteConfig.logo.main);
  // Square logo. Header: 56px on phones and tablets, 64px from 1024px. Footer: 112px.
  const height = size === "header" ? "h-14 lg:h-16" : "h-28";

  return (
    <Link href="/" className="flex shrink-0 items-center rounded-md" aria-label={`${siteConfig.name} home`}>
      {src ? (
        <Image
          src={src}
          alt={siteConfig.name}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          sizes={size === "header" ? "(min-width: 1024px) 64px, 56px" : "112px"}
          preload={size === "header"}
          loading={size === "header" ? "eager" : "lazy"}
          className={`${height} w-auto max-w-none object-contain`}
        />
      ) : (
        // Placeholder until the real logo is added. Not a logo design.
        <span
          className={`flex ${height} w-36 items-center justify-center rounded-md border border-dashed border-accent/50 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted sm:w-40`}
        >
          Your logo
        </span>
      )}
    </Link>
  );
}

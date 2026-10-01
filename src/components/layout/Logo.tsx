import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { existingImage } from "@/lib/catalog";

type Props = { size?: "header" | "footer" };

// Pixel size of /public/images/brand/logo.png. Only the ratio matters: it reserves the right space before the image loads.
const LOGO_WIDTH = 1690;
const LOGO_HEIGHT = 345;

/**
 * Shows your logo from /public/images/brand/logo.png.
 * The height is set per screen size and the width follows the logo's own proportions,
 * so a horizontal logo is never squeezed into a square, stretched or cropped.
 */
export function Logo({ size = "header" }: Props) {
  const src = existingImage(siteConfig.logo.main);
  // Header: ~157px wide on phones, ~176px on tablets, ~196px at 1024px, ~216px on wide screens.
  const height = size === "header" ? "h-8 sm:h-9 lg:h-10 xl:h-11" : "h-10";

  return (
    <Link href="/" className="flex shrink-0 items-center rounded-md" aria-label={`${siteConfig.name} home`}>
      {src ? (
        <Image
          src={src}
          alt={siteConfig.name}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          sizes="(min-width: 1280px) 216px, (min-width: 1024px) 196px, (min-width: 640px) 176px, 157px"
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

"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlaceholder, type PlaceholderKind } from "./ImagePlaceholder";

type Props = {
  src?: string | null;
  alt: string;
  sizes: string;
  kind?: PlaceholderKind;
  priority?: boolean;
  /** Load now but at low priority (e.g. the next photo of a slideshow), so it never competes with the LCP image. */
  eager?: boolean;
  className?: string;
};

/** Fills its (relatively positioned) parent. Falls back to a neutral placeholder if the photo is missing or fails to load. */
export function SmartImage({ src, alt, sizes, kind, priority, eager, className = "object-cover" }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <ImagePlaceholder kind={kind} label={alt} />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : eager ? "low" : undefined}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}

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
  className?: string;
};

/** Fills its (relatively positioned) parent. Falls back to a neutral placeholder if the photo is missing or fails to load. */
export function SmartImage({ src, alt, sizes, kind, priority, className = "object-cover" }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <ImagePlaceholder kind={kind} label={alt} />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}

"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps & {
  fallbackSrc?: string | StaticImageData;
};

export default function SafeImage({
  src,
  fallbackSrc = "/fallback-avatar.png",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      loading="eager"
    />
  );
}

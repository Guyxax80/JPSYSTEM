"use client";

import NextImage, { ImageProps } from "next/image";
import { useImageConfig } from "@/components/ImageConfigProvider";

const FALLBACK_IMAGE = "/home.jpg";

export function SiteImage(props: ImageProps) {
  const { resolve } = useImageConfig();

  const resolvedSrc =
    typeof props.src === "string" ? resolve(props.src) : props.src;

  // ✅ กัน src ว่าง / null / undefined
  if (
    !resolvedSrc ||
    (typeof resolvedSrc === "string" && resolvedSrc.trim() === "")
  ) {
    return (
      <NextImage
        {...props}
        src={FALLBACK_IMAGE}
      />
    );
  }

  return <NextImage {...props} src={resolvedSrc} />;
}
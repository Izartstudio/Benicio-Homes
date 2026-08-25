import NextImage, { type ImageProps } from "next/image";
import { forwardRef } from "react";

export const defaultSiteImageQuality = 85;

/**
 * Shared image defaults: visibly sharper than Next's default quality while
 * preserving responsive optimization, native lazy loading, and async decode.
 */
export const OptimizedImage = forwardRef<HTMLImageElement, ImageProps>(
  ({ decoding = "async", quality = defaultSiteImageQuality, ...props }, ref) => (
    <NextImage
      {...props}
      decoding={decoding}
      quality={quality}
      ref={ref}
    />
  ),
);

OptimizedImage.displayName = "OptimizedImage";

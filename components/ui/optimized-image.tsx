import NextImage, { type ImageProps } from "next/image";
import { forwardRef } from "react";

// 75 is visually indistinguishable for the site's photographic imagery at
// normal viewing sizes, while avoiding the large transfer penalty of serving
// every responsive candidate at near-lossless quality.
export const defaultSiteImageQuality = 75;

/**
 * Shared image defaults preserving responsive optimization, native lazy
 * loading, and async decode without over-serving photographic payloads.
 */
export const OptimizedImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      decoding = "async",
      quality = defaultSiteImageQuality,
      unoptimized,
      ...props
    },
    ref,
  ) => {
    // Sanity URLs are already cropped, resized, quality-controlled, and served
    // in the best format from Sanity's global image CDN. Sending them through
    // a self-hosted Next optimizer adds a second image conversion and makes the
    // first visitor wait for Hostinger to generate and cache every variant.
    const remoteSource = typeof props.src === "string" ? props.src : "";
    const isSanityImage = remoteSource.startsWith(
      "https://cdn.sanity.io/images/",
    );
    // R2 and the other media origins store delivery-ready WebP/AVIF files.
    // Re-encoding those on the Hostinger Node process adds cold-start latency
    // and produces several redundant variants for repeated carousel images.
    const isDeliveryReadyRemoteImage =
      /^https:\/\//i.test(remoteSource) &&
      /\.(?:avif|webp)(?:\?|$)/i.test(remoteSource);

    return (
      <NextImage
        {...props}
        decoding={decoding}
        quality={quality}
        ref={ref}
        unoptimized={
          unoptimized ?? (isSanityImage || isDeliveryReadyRemoteImage)
        }
      />
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";

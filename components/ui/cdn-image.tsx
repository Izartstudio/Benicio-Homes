import Image, { type ImageProps } from "next/image";
import { forwardRef } from "react";
import { getCdnAsset } from "@/lib/getCdnAsset";

type CdnImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"] | null | undefined;
};

/** A Next Image that resolves string object keys through the public CDN. */
export const CdnImage = forwardRef<HTMLImageElement, CdnImageProps>(
  ({ src, ...props }, ref) => {
    const resolvedSrc = typeof src === "string" ? getCdnAsset(src) : src;

    if (!resolvedSrc) {
      return null;
    }

    return <Image {...props} alt={props.alt} ref={ref} src={resolvedSrc} />;
  },
);

CdnImage.displayName = "CdnImage";

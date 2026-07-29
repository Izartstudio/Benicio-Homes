import { forwardRef, type VideoHTMLAttributes } from "react";
import { getCdnAsset } from "@/lib/getCdnAsset";

export type CdnVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "poster" | "src"> & {
  poster?: string | null;
  src?: string | null;
};

/** A native video element that resolves source and poster object keys through the CDN. */
export const CdnVideo = forwardRef<HTMLVideoElement, CdnVideoProps>(
  ({ poster, src, ...props }, ref) => {
    const resolvedSrc = getCdnAsset(src);

    if (!resolvedSrc) {
      return null;
    }

    return <video {...props} poster={getCdnAsset(poster) ?? undefined} ref={ref} src={resolvedSrc} />;
  },
);

CdnVideo.displayName = "CdnVideo";

"use client";

import { useEffect, useState } from "react";
import MuxPlayer, {
  type MuxPlayerCSSProperties,
} from "@mux/mux-player-react";
import { CdnVideo } from "@/components/ui/cdn-video";

type ResponsiveHeroVideoProps = {
  className: string;
  desktopPlaybackId?: string;
  fallbackSrc: string;
  mobilePlaybackId?: string;
};

const mobileMediaQuery = "(max-width: 767px)";
const muxPlayerStyle: MuxPlayerCSSProperties = {
  "--controls": "none",
  "--media-object-fit": "cover",
};

function getPoster(playbackId: string, width: number) {
  return `https://image.mux.com/${playbackId}/thumbnail.webp?time=0&width=${width}`;
}

export function ResponsiveHeroVideo({
  className,
  desktopPlaybackId,
  fallbackSrc,
  mobilePlaybackId,
}: ResponsiveHeroVideoProps) {
  const hasDesktopAndMobile = Boolean(
    desktopPlaybackId && mobilePlaybackId,
  );
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (!hasDesktopAndMobile) {
      return;
    }

    const mediaQuery = window.matchMedia(mobileMediaQuery);
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, [hasDesktopAndMobile]);

  if (!desktopPlaybackId && !mobilePlaybackId) {
    return (
      <CdnVideo
        aria-hidden="true"
        autoPlay
        className={className}
        data-hero-video
        loop
        muted
        playsInline
        preload="auto"
        src={fallbackSrc}
      />
    );
  }

  if (hasDesktopAndMobile && isMobile === null) {
    return (
      <picture className={className}>
        <source
          media={mobileMediaQuery}
          srcSet={getPoster(mobilePlaybackId!, 1080)}
        />
        {/* The browser selects the responsive source before Mux initializes. */}
        <img
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          src={getPoster(desktopPlaybackId!, 1920)}
        />
      </picture>
    );
  }

  const useMobileVideo = hasDesktopAndMobile
    ? isMobile === true
    : !desktopPlaybackId;
  const playbackId = useMobileVideo
    ? mobilePlaybackId
    : desktopPlaybackId ?? mobilePlaybackId;

  if (!playbackId) {
    return null;
  }

  const posterWidth = useMobileVideo ? 1080 : 1920;
  const poster = getPoster(playbackId, posterWidth);

  return (
    <MuxPlayer
      aria-hidden="true"
      autoPlay
      className={className}
      data-hero-video
      key={playbackId}
      loop
      maxResolution={useMobileVideo ? "720p" : "1080p"}
      muted
      playbackId={playbackId}
      playsInline
      poster={poster}
      preload="auto"
      streamType="on-demand"
      style={muxPlayerStyle}
    />
  );
}

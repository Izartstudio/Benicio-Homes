import responsiveStyles from "./textured-hero-section.responsive.module.css";
import MuxPlayer, {
  type MuxPlayerCSSProperties,
} from "@mux/mux-player-react";
import { CdnVideo } from "@/components/ui/cdn-video";

const fallbackHeroVideo = {
  url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/0_Villa_Resort_3840x2160.webm",
} as const;

const muxPlaybackId = process.env.NEXT_PUBLIC_MUX_HERO_PLAYBACK_ID?.trim();
const muxPosterUrl = muxPlaybackId
  ? `https://image.mux.com/${muxPlaybackId}/thumbnail.webp?time=0&width=1920`
  : null;

const muxPlayerStyle: MuxPlayerCSSProperties = {
  "--controls": "none",
  "--media-object-fit": "cover",
};

export function TexturedHeroSection() {
  return (
    <section
      aria-label="Benicio hero"
      className={`relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-[#2d2d2d] ${responsiveStyles.responsiveRoot}`}
      data-section="textured-hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#2d2d2d]"
        data-hero-background-fill
      />
      {muxPlaybackId && muxPosterUrl ? (
        <MuxPlayer
          aria-hidden="true"
          autoPlay
          className={`absolute inset-0 z-10 h-full w-full object-cover ${responsiveStyles.videoMask}`}
          data-hero-video
          loop
          maxResolution="1080p"
          muted
          playbackId={muxPlaybackId}
          playsInline
          poster={muxPosterUrl}
          preload="auto"
          streamType="on-demand"
          style={muxPlayerStyle}
        />
      ) : (
        <CdnVideo
          aria-hidden="true"
          autoPlay
          className={`absolute inset-0 z-10 h-full w-full object-cover ${responsiveStyles.videoMask}`}
          data-hero-video
          loop
          muted
          playsInline
          preload="auto"
          src={fallbackHeroVideo.url}
        />
      )}
    </section>
  );
}

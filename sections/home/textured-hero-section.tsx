import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { ResponsiveHeroVideo } from "./responsive-hero-video";

const fallbackHeroVideo = {
  url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/0_Villa_Resort_3840x2160.webm",
} as const;

const desktopPlaybackId =
  process.env.NEXT_PUBLIC_MUX_HERO_DESKTOP_PLAYBACK_ID?.trim() ||
  process.env.NEXT_PUBLIC_MUX_HERO_PLAYBACK_ID?.trim();
const mobilePlaybackId =
  process.env.NEXT_PUBLIC_MUX_HERO_MOBILE_PLAYBACK_ID?.trim();

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
      <ResponsiveHeroVideo
        className={`absolute inset-0 z-10 h-full w-full object-cover ${responsiveStyles.videoMask}`}
        desktopPlaybackId={desktopPlaybackId}
        fallbackSrc={fallbackHeroVideo.url}
        mobilePlaybackId={mobilePlaybackId}
      />
    </section>
  );
}

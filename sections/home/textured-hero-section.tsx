import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { CdnVideo } from "@/components/ui/cdn-video";

const heroVideo = {
  url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/0_Villa_Resort_3840x2160.webm",
} as const;

export function TexturedHeroSection() {
  return (
    <section
      aria-label="Benicio hero"
      className={`relative isolate h-screen min-h-[640px] overflow-hidden bg-[#2d2d2d] ${responsiveStyles.responsiveRoot}`}
      data-section="textured-hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#2d2d2d]"
        data-hero-background-fill
      />
      <CdnVideo
        aria-hidden="true"
        autoPlay
        className={`absolute inset-0 z-10 h-full w-full object-cover ${responsiveStyles.videoMask}`}
        data-hero-video
        loop
        muted
        playsInline
        src={heroVideo.url}
      />
    </section>
  );
}

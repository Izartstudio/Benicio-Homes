import { getImageProps, type ImageProps } from "next/image";
import responsiveStyles from "./project-moodboard-section.responsive.module.css";
import { Reveal } from "@/components/ui/reveal";
import { getCdnAsset } from "@/lib/getCdnAsset";

type MoodboardImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectMoodboardSectionProps = {
  description: string;
  desktopImage: MoodboardImage;
  mobileImage: MoodboardImage;
};

export function ProjectMoodboardSection({
  description,
  desktopImage,
  mobileImage,
}: ProjectMoodboardSectionProps) {
  const resolvedDesktopSrc =
    typeof desktopImage.src === "string"
      ? getCdnAsset(desktopImage.src) ?? desktopImage.src
      : desktopImage.src;
  const resolvedMobileSrc =
    typeof mobileImage.src === "string"
      ? getCdnAsset(mobileImage.src) ?? mobileImage.src
      : mobileImage.src;
  const { props: desktopImageProps } = getImageProps({
    alt: desktopImage.alt,
    height: 1290,
    quality: 82,
    sizes: "(min-width: 1440px) 1198px, 84vw",
    src: resolvedDesktopSrc,
    width: 2488,
  });
  const { props: mobileImageProps } = getImageProps({
    alt: mobileImage.alt,
    height: 3552,
    quality: 82,
    sizes: "100vw",
    src: resolvedMobileSrc,
    width: 780,
  });

  return (
    <section
      aria-label="Project design process"
      className={`relative isolate -mt-px overflow-hidden bg-[#343434] text-bone ${responsiveStyles.responsiveRoot}`}
      data-project-moodboard-section
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#343434] bg-cover bg-center bg-blend-overlay"
        data-project-moodboard-background-texture
      />

      <div
        className="relative z-10 mx-auto w-full max-w-[90rem] pb-[2.75rem] pt-[5rem]"
        data-project-moodboard-container
      >
        <div
          className="px-[clamp(1.5rem,5.28vw,4.75rem)]"
          data-project-moodboard-intro
        >
          <Reveal
            duration={0.55}
            revealId="project-moodboard-description"
            start="top 78%"
            triggerClosest="[data-project-moodboard-section]"
            y={14}
          >
            <p className="max-w-[80.5rem] font-serif text-[clamp(0.9375rem,1.12vw,1rem)] font-normal leading-[1.42] tracking-[0.005em] text-bone/90">
              {description}
            </p>
          </Reveal>
        </div>

        <Reveal
          className="mx-[clamp(1.5rem,8.4vw,7.5625rem)] mt-[clamp(4rem,5.2vw,4.6875rem)]"
          data-project-moodboard-reveal
          delay={0.48}
          revealId="project-moodboard-svg"
          start="top 78%"
          triggerClosest="[data-project-moodboard-section]"
          y={0}
        >
          <div
            className="w-full overflow-hidden"
            data-project-moodboard-wrapper
          >
            <picture className="block">
              <source
                media="(min-width: 767.01px)"
                sizes={desktopImageProps.sizes}
                srcSet={desktopImageProps.srcSet}
              />
              <img
                alt={desktopImage.alt}
                className="h-auto w-full"
                data-project-moodboard-svg
                decoding="async"
                height={645}
                loading="lazy"
                src="/images/placeholders/responsive-media-fallback.webp"
                width={1244}
              />
            </picture>
          </div>
        </Reveal>

        <Reveal
          className="hidden"
          data-project-moodboard-mobile-reveal
          delay={0.2}
          revealId="project-moodboard-mobile-svg"
          start="top 78%"
          triggerClosest="[data-project-moodboard-section]"
          y={0}
        >
          <picture className="block">
            <source
              media="(max-width: 767px)"
              sizes={mobileImageProps.sizes}
              srcSet={mobileImageProps.srcSet}
            />
            <img
              alt={mobileImage.alt}
              className="h-auto w-full"
              data-project-moodboard-mobile-image
              decoding="async"
              height={1776}
              loading="lazy"
              src="/images/placeholders/responsive-media-fallback.webp"
              width={390}
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}

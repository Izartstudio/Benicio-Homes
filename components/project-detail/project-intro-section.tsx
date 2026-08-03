import type { ImageProps } from "next/image";
import { CdnImage } from "@/components/ui/cdn-image";
import responsiveStyles from "./project-intro-section.responsive.module.css";

export type ProjectIntroSectionProps = {
  backgroundImage: {
    alt: string;
    src: ImageProps["src"];
  };
  intro: string;
};

export function ProjectIntroSection({
  backgroundImage,
  intro,
}: ProjectIntroSectionProps) {
  return (
    <section
      aria-label="Project introduction"
      className={`relative z-20 -mt-px overflow-hidden bg-[#050505] text-bone ${responsiveStyles.responsiveRoot}`}
      data-project-intro-section
    >
      <div
        className="absolute inset-0 z-0"
        data-project-intro-background-image
      >
        <CdnImage
          alt={backgroundImage.alt}
          className="object-cover object-center"
          fill
          sizes="100vw"
          src={backgroundImage.src}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.12)_0%,rgba(5,5,5,0.42)_36%,rgba(5,5,5,0.86)_72%,#050505_100%)]"
        data-project-intro-background-gradient
      />

      <div
        className="relative z-20 mx-auto w-full max-w-[1440px] px-[clamp(1.5rem,5.28vw,4.75rem)] pb-[clamp(8rem,14vw,13rem)] pt-[clamp(7.5rem,14.72vw,13.25rem)]"
        data-project-intro-container
      >
        <div className="max-w-[42rem]" data-project-intro-content>
          <span
            aria-hidden="true"
            className="block size-[1.25rem] bg-laterite"
            data-project-intro-accent
          />

          <div
            className="mt-[clamp(1.75rem,2.8vw,2.5rem)]"
            data-project-intro-copy-wrapper
          >
            <p
              className="font-display text-[clamp(1.5rem,2.15vw,1.95rem)] font-normal leading-[1.4] tracking-[0.01em] text-bone"
              data-project-intro-copy
            >
              {intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

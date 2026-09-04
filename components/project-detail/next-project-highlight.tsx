"use client";

import type { ImageProps } from "next/image";
import responsiveStyles from "./next-project-highlight.responsive.module.css";
import { BlendScope } from "@/components/ui/blend-scope";
import { ButtonLink } from "@/components/ui/button-link";
import { CdnImage } from "@/components/ui/cdn-image";
import { DifferenceText } from "@/components/ui/difference-text";
import { Reveal } from "@/components/ui/reveal";
import { PDP_MEDIA_URLS } from "./pdp-texture";

type NextProjectImage = {
  alt: string;
  src: ImageProps["src"];
};

export type NextProjectHighlightProps = {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  image: NextProjectImage;
  title: string;
};

export function NextProjectHighlight({
  ctaHref,
  ctaLabel,
  description,
  image,
  title,
}: NextProjectHighlightProps) {
  return (
    <BlendScope
      as="section"
      aria-labelledby="next-project-highlight-title"
      className={`-mt-px w-full overflow-hidden bg-benicio-blend text-[#232323] ${responsiveStyles.responsiveRoot}`}
      data-next-project-highlight
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-benicio-blend"
        data-next-project-highlight-background
      />

      <div
        className={`relative flex w-full max-w-none flex-col overflow-hidden pt-[4rem] lg:block lg:h-[41.8125rem] lg:pt-0 ${responsiveStyles.layout}`}
      >
        <div
          className="relative order-2 mt-[2.5rem] grid grid-cols-1 md:mt-[3rem] md:grid-cols-[42%_58%] md:items-center lg:absolute lg:inset-x-0 lg:top-[5.9375rem] lg:mt-0 lg:block lg:h-[34rem]"
          data-next-project-highlight-content-grid
        >
          <div
            className="relative z-10 min-h-[21.8125rem] bg-[#f4f4f2] bg-cover bg-center px-[2rem] py-[4rem] md:px-[3rem] lg:absolute lg:left-0 lg:top-[6.1875rem] lg:h-[21.8125rem] lg:w-[35.7639%] lg:px-[7.4375rem] lg:pb-0 lg:pt-[6.25rem]"
            data-next-project-highlight-left-panel
            style={{ backgroundImage: `url('${PDP_MEDIA_URLS.nextProjectTexture}')` }}
          >
            <div data-next-project-highlight-texture-panel>
              <p
                className="max-w-[20rem] font-Bahnschrift text-[clamp(1rem,1.25vw,1.125rem)] font-light leading-[1.5] tracking-[0.01em]"
                data-next-project-highlight-description
              >
                {description}
              </p>

              <ButtonLink
                className="mt-[1.5rem] !min-h-0 !justify-start !rounded-none !border-0 !bg-transparent !p-0 !font-serif !text-[1.125rem] !font-bold !normal-case !tracking-normal !text-laterite hover:!bg-transparent"
                data-next-project-highlight-cta
                href={ctaHref}
              >
                <span>{ctaLabel}</span>
                <span aria-hidden="true" className="ml-[2rem] text-[0.875rem]">
                  ›
                </span>
              </ButtonLink>

              <span
                aria-hidden="true"
                className="absolute bottom-[5.5625rem] left-[3.125rem] block size-[1.25rem] bg-laterite"
                data-next-project-highlight-accent-square
              />
            </div>
          </div>

          <div
            className="relative z-20 aspect-[925/538] w-full overflow-hidden md:col-start-2 lg:absolute lg:right-0 lg:top-[0.3125rem] lg:h-[34rem] lg:w-[64.2361%]"
            data-next-project-highlight-right-panel
          >
            <Reveal
              className="h-full"
              revealId="next-project-highlight-image"
              start="top 80%"
              triggerClosest="[data-next-project-highlight]"
              y={0}
            >
              <div
                className="relative h-full w-full overflow-hidden"
                data-next-project-highlight-image-wrapper
              >
                <CdnImage
                  alt={image.alt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 58vw, 64vw"
                  src={image.src}
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div
          className="relative order-1 max-w-full overflow-visible lg:absolute lg:left-[10.8333%] lg:top-[4.375rem]"
          data-next-project-highlight-heading-layer
        >
          <DifferenceText
            as="h2"
            className="relative z-30 max-w-none whitespace-nowrap font-Bahnschrift text-[clamp(3.25rem,11.111vw,10rem)] font-light uppercase leading-none tracking-[0.01em] mix-blend-difference"
            id="next-project-highlight-title"
          >
            {title}
          </DifferenceText>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[5rem] md:h-[6rem] lg:h-[8.1875rem]"
        data-next-project-highlight-spacer
      />
    </BlendScope>
  );
}

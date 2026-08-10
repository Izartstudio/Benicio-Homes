"use client";

import responsiveStyles from "./legacy-gallery-section.responsive.module.css";
import Image from "next/image";
import { useLayoutEffect } from "react";
import { setupSectionReveals } from "@/utils/setup-section-reveals";
import { CdnImage } from "@/components/ui/cdn-image";
import { ParallaxMedia } from "@/components/ui/parallax-media";


const galleryImages = [
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/legacysection1.webp",
    alt: "Covered concrete passage opening to a preserved landscape",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/legacysection2.webp",
    alt: "Concrete villa facade framed by mature planting",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/legacysection3.webp",
    alt: "Stepping stones through dense tropical landscape",
  },
] as const;

export function LegacyGallerySection() {
  useLayoutEffect(() => {
    const section = document.querySelector<HTMLElement>(
      '[data-section="legacy-gallery"]',
    );

    if (!section) {
      return;
    }

    return setupSectionReveals(section);
  }, []);

  return (
    <section
      aria-label="Legacy gallery"
      className={`overflow-hidden bg-[#2D2D2D] text-[#b9b9b9] ${responsiveStyles.responsiveRoot}`}
      data-section="legacy-gallery"
    >
      <div
        className="mx-auto w-full max-w-[1440px] px-[5.2%] pt-[clamp(4.5rem,6.25vw,5.625rem)]"
        data-gallery-content
      >
        <div data-gallery-composition>
          <div data-gallery-intro>
            <div data-reveal-child data-gallery-intro-reveal>
              <p
                className="max-w-[43rem] font-display text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.35] tracking-[0.01em] text-[#9c9a9a]"
                data-gallery-copy
              >
                Preservation begins with respect. Every restoration is an
                opportunity to protect the architectural character of Goa,
                carrying its materials, craftsmanship, and stories forward for
                generations to come.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(5rem,7.1vw,6.4rem)]" data-gallery-region>
            <div
              className="grid grid-cols-[1.46fr_1fr_1fr] items-start gap-[clamp(1.5rem,2.1vw,2rem)]"
              data-reveal-child
              data-gallery
            >
              <figure
                className="relative mt-[clamp(7.5rem,11.4vw,10.25rem)] aspect-[522/338] overflow-hidden"
                data-gallery-image="1"
              >
                <ParallaxMedia amount={3}>
                  <CdnImage
                    src={galleryImages[0].url}
                    alt={galleryImages[0].alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="object-cover"
                  />
                </ParallaxMedia>
              </figure>

              <figure
                className="relative mt-[clamp(7.5rem,11.4vw,10.25rem)] aspect-[359/338] overflow-hidden"
                data-gallery-image="2"
              >
                <CdnImage
                  src={galleryImages[1].url}
                  alt={galleryImages[1].alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 90vw"
                  className="object-cover"
                />
              </figure>

              <figure
                className="relative aspect-[358/537] overflow-hidden"
                data-gallery-image="3"
              >
                <ParallaxMedia amount={4}>
                  <CdnImage
                    src={galleryImages[2].url}
                    alt={galleryImages[2].alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover"
                  />
                </ParallaxMedia>
              </figure>
            </div>
          </div>
        </div>

        <div
          className="mt-[clamp(2rem,3.6vw,3.25rem)] flex items-center justify-between pb-[clamp(5.25rem,7vw,6.25rem)] font-display text-[clamp(1rem,1.25vw,1.125rem)] text-[#b9b9b9]"
          data-reveal-child
          data-gallery-footer
        >
          <span aria-hidden="true" data-gallery-infinity="left">
            &infin;
          </span>
          <span
            aria-hidden="true"
            className="h-px w-[clamp(2.5rem,3.5vw,3.125rem)] bg-[#b9b9b9]"
            data-gallery-divider
          />
          <span aria-hidden="true" data-gallery-infinity="right">
            &infin;
          </span>
        </div>
      </div>

      <div
        className="relative h-[6.9375rem] w-full overflow-hidden"
        data-gallery-texture-stack
      >
        <figure
          className="pointer-events-none absolute inset-y-0 left-[-4px] w-[calc(100%+4px)] select-none"
          data-gallery-texture
        >
          <Image
            src="/assets/textures/legacy-texture.webp"
            alt=""
            fill
            draggable={false}
            unoptimized
            sizes="100vw"
            className="object-fill [-webkit-user-drag:none]"
          />
        </figure>

        <div
          aria-hidden="true"
          className={responsiveStyles.legacyRestorationBlend}
          data-gallery-restoration-blend
        />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal } from "@/components/ui/reveal";

const showcaseImages = [
  {
    src: "/assets/carousel/carousel1.svg",
    alt: "Tropical architectural material study",
    sizeClassName:
      "mt-0 h-[clamp(18rem,26.7vw,24.027rem)] w-[clamp(10.7rem,15.86vw,14.273rem)]",
  },
  {
    src: "/assets/carousel/carousel2.svg",
    alt: "Pool courtyard framed by concrete and planting",
    sizeClassName:
      "mt-[clamp(0.9rem,1.35vw,1.215rem)] h-[clamp(16.2rem,24vw,21.6rem)] w-[clamp(9.87rem,14.62vw,13.162rem)]",
  },
  {
    src: "/assets/carousel/carousel3.svg",
    alt: "Laterite surface detail",
    sizeClassName:
      "mt-[clamp(2.05rem,3.02vw,2.723rem)] h-[clamp(13.94rem,20.65vw,18.582rem)] w-[clamp(9.29rem,13.77vw,12.394rem)]",
  },
  {
    src: "/assets/carousel/carousel4.svg",
    alt: "Villa approach framed by tropical greenery",
    sizeClassName:
      "mt-[clamp(2.05rem,3.02vw,2.723rem)] h-[clamp(13.94rem,20.65vw,18.582rem)] w-[clamp(9.29rem,13.77vw,12.394rem)]",
  },
  {
    src: "/assets/carousel/carousel5.svg",
    alt: "Coastal light and palm shadow texture",
    sizeClassName:
      "mt-[clamp(0.9rem,1.35vw,1.215rem)] h-[clamp(16.2rem,24vw,21.6rem)] w-[clamp(9.84rem,14.58vw,13.127rem)]",
  },
  {
    src: "/assets/carousel/carousel6.svg",
    alt: "Garden villa elevation with a lap pool",
    sizeClassName:
      "mt-0 h-[clamp(18rem,26.7vw,24.027rem)] w-[clamp(10.7rem,15.86vw,14.273rem)]",
  },
] as const;

const showcaseGalleries = [
  {
    id: "a",
    images: showcaseImages,
  },
  {
    id: "b",
    images: [
      showcaseImages[3],
      showcaseImages[4],
      showcaseImages[5],
      showcaseImages[0],
      showcaseImages[1],
      showcaseImages[2],
    ],
  },
] as const;

const markers = [
  "left-edge",
  "left-inner",
  "center-left",
  "center-right",
  "right-inner",
  "right-edge",
] as const;

export function ImageShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    let galleryTimeline: gsap.core.Timeline | null = null;
    let startTimer: number | null = null;

    const buildGalleryLoop = () => {
      const viewport = track.closest<HTMLElement>("[data-showcase-viewport]");
      const galleries = gsap.utils.toArray<HTMLElement>(
        "[data-showcase-gallery]",
        track,
      );

      if (!viewport || galleries.length < 2) {
        return;
      }

      const distance = viewport.clientWidth;

      if (distance <= 0) {
        return;
      }

      galleryTimeline?.kill();

      gsap.set(galleries[0], { x: 0, force3D: true });
      gsap.set(galleries[1], { x: distance, force3D: true });

      galleryTimeline = gsap
        .timeline({
          repeat: -1,
          defaults: {
            duration: 1.85,
            ease: "power2.inOut",
          },
        })
        .to({}, { duration: 4.5, ease: "none" })
        .to(galleries[0], { x: -distance }, ">")
        .to(galleries[1], { x: 0 }, "<")
        .to({}, { duration: 4.5, ease: "none" })
        .set(galleries[0], { x: distance })
        .to(galleries[1], { x: -distance }, ">")
        .to(galleries[0], { x: 0 }, "<")
        .set(galleries[1], { x: distance });
    };

    const startGalleryLoop = () => {
      if (galleryTimeline || startTimer) {
        return;
      }

      startTimer = window.setTimeout(() => {
        buildGalleryLoop();
        startTimer = null;
      }, 850);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startGalleryLoop();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -16% 0px",
        threshold: 0,
      },
    );

    const resizeObserver = new ResizeObserver(() => {
      if (galleryTimeline) {
        buildGalleryLoop();
      }
    });

    observer.observe(section);
    resizeObserver.observe(track);

    return () => {
      if (startTimer) {
        window.clearTimeout(startTimer);
      }

      observer.disconnect();
      resizeObserver.disconnect();
      galleryTimeline?.kill();
    };
  }, []);

  return (
    <section
      aria-label="Image showcase"
      className="relative isolate h-[43.75rem] overflow-hidden bg-transparent"
      data-section="image-showcase"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-showcase-section-background
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#B9B9B9_0%,#B9B9B9_100%)]"
          data-showcase-background-gradient
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-multiply"
          data-showcase-background-texture
          style={{
            backgroundImage: 'url("/assets/textures/footer-texture.svg")',
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto h-full w-full max-w-[1440px]"
        data-showcase-content
      >
        <h2
          className="absolute left-1/2 top-[5.75rem] z-30 w-[min(36.5rem,72vw)] -translate-x-1/2 bg-cover bg-center bg-clip-text text-center font-display text-[clamp(1.35rem,2.1vw,1.875rem)] font-normal uppercase leading-[1.25] tracking-[0.01em] text-transparent"
          data-showcase-heading
          style={{
            backgroundImage: 'url("/assets/textures/LateriteTexture.svg")',
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LATERITE. MONSOON. COCONUT GROVES. SEA BREEZE. VERANDAHS.
        </h2>

        <Reveal
          className="absolute inset-x-0 top-[14.9rem] z-10 h-[16.8125rem] bg-[#232323]"
          data-showcase-panel
          revealId="image-showcase-panel"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none relative h-full w-full"
            data-showcase-marker-layer
          >
            {markers.map((marker, index) => (
              <span
                className="absolute top-[11.5625rem] size-[0.5655rem] bg-cover bg-center"
                data-showcase-marker={marker}
                key={marker}
                style={{
                  backgroundImage: 'url("/assets/blocks/orange-block.svg")',
                  left:
                    index === 0
                      ? "0"
                      : index === 1
                        ? "24.68%"
                        : index === 2
                          ? "49.67%"
                          : index === 3
                            ? "50.33%"
                            : index === 4
                              ? "74.72%"
                              : "auto",
                  right: index === 5 ? "0" : "auto",
                }}
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          className="absolute inset-x-0 top-[11.75rem] z-20"
          data-showcase-ticker
          revealId="image-showcase-ticker"
        >
          <div className="overflow-hidden" data-showcase-viewport>
            <div
              className="relative h-[clamp(18rem,26.7vw,24.027rem)] w-full"
              data-showcase-track
              ref={trackRef}
            >
              {showcaseGalleries.map((gallery) => (
                <div
                  className="absolute left-0 top-0 flex w-max items-start gap-[clamp(1.45rem,2.17vw,1.95rem)]"
                  data-showcase-gallery={gallery.id}
                  key={gallery.id}
                >
                  {showcaseImages.map((slot, index) => {
                    const image = gallery.images[index];

                    return (
                      <figure
                        className={`relative shrink-0 overflow-hidden ${slot.sizeClassName}`}
                        data-showcase-image
                        data-showcase-gallery-id={gallery.id}
                        data-showcase-image-index={index + 1}
                        key={`${gallery.id}-${image.src}-${index}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 16vw, 42vw"
                          className="object-cover"
                        />
                      </figure>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import responsiveStyles from "./restoration-showcase-section.responsive.module.css";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DifferenceText } from "@/components/ui/difference-text";
import { CdnImage } from "@/components/ui/cdn-image";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);

const restorationSlides = [
  {
    id: "villa-el-salva-01",
    heading: "VILLA EL SALVA",
    leftLabel: "Heritage Value",
    rightLabel: "Portuguese-Inspired Architecture",
    number: "Restoration 001 -",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/restoration-showcase-villa1.webp",
    alt: "Restored Goan villa interior opening into tropical landscape",
  },
  {
    id: "villa-el-salva-02",
    heading: "VILLA PEROLA",
    leftLabel: "Heritage Value",
    rightLabel: "Portuguese-Inspired Architecture",
    number: "Restoration 002 -",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/legacy-section-villa2.webp",
    alt: "Restoration project facade with warm laterite material",
  },
] as const;


export function RestorationShowcaseSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const leftLabelRef = useRef<HTMLParagraphElement | null>(null);
  const rightLabelRef = useRef<HTMLParagraphElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const paginationRef = useRef<HTMLImageElement | null>(null);

  const activeSlide = restorationSlides[activeSlideIndex];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const carousel = section?.querySelector<HTMLElement>(
      "[data-restoration-carousel]",
    );

    if (!section || !carousel) {
      return;
    }

    const ctx = gsap.context(() => {
      const slideImages = gsap.utils.toArray<HTMLElement>(
        "[data-restoration-slide]",
        carousel,
      );
      const heading = headingRef.current;
      const pagination = paginationRef.current;
      const supportingTextElements = [
        leftLabelRef.current,
        rightLabelRef.current,
        numberRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (
        slideImages.length < restorationSlides.length ||
        !heading ||
        !pagination ||
        supportingTextElements.length < 3
      ) {
        return;
      }

      gsap.set(slideImages, {
        autoAlpha: (index: number) => (index === 0 ? 1 : 0),
        xPercent: 0,
      });
      gsap.set(heading, { autoAlpha: 1, y: 0 });
      gsap.set(supportingTextElements, { autoAlpha: 1, y: 0 });
      gsap.set(pagination, {
        autoAlpha: 1,
        scaleX: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transformOrigin: "0% 50%",
      });

      const timeline = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      restorationSlides.forEach((_, currentIndex) => {
        const nextIndex = (currentIndex + 1) % restorationSlides.length;
        const transitionStart = timeline.duration() + 2.6;

        timeline
          .to({}, { duration: 2.6 })
          .to(
            slideImages[currentIndex],
            {
              autoAlpha: 0,
              duration: 1.25,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            slideImages[nextIndex],
            {
              autoAlpha: 1,
              duration: 1.25,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            heading,
            {
              autoAlpha: 0,
              duration: 0.48,
              ease: "power2.inOut",
            },
            transitionStart,
          )
          .to(
            supportingTextElements,
            {
              autoAlpha: 0,
              duration: 0.42,
              ease: "power3.inOut",
              y: -26,
            },
            transitionStart,
          )
          .to(
            pagination,
            {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 0.01,
              ease: "none",
            },
            transitionStart,
          )
          .call(
            () => {
              flushSync(() => {
                setActiveSlideIndex(nextIndex);
              });
              gsap.set(heading, {
                autoAlpha: 0,
                y: 0,
              });
              gsap.set(supportingTextElements, { autoAlpha: 0, y: 26 });
              gsap.set(pagination, {
                scaleX: 1,
              });
            },
            undefined,
            transitionStart + 0.46,
          )
          .to(
            heading,
            {
              autoAlpha: 1,
              duration: 0.62,
              ease: "power2.out",
            },
            transitionStart + 0.52,
          )
          .to(
            supportingTextElements,
            {
              autoAlpha: 1,
              duration: 0.58,
              ease: "power3.out",
              y: 0,
            },
            transitionStart + 0.52,
          )
          .to(
            pagination,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.74,
              ease: "power2.out",
            },
            transitionStart + 0.08,
          );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 84%",
        end: "bottom top",
        onEnter: () => {
          timeline.play(0);
        },
        onEnterBack: () => {
          timeline.resume();
        },
        onLeave: () => {
          timeline.pause();
        },
        onLeaveBack: () => {
          timeline.pause();
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="restoration-showcase-title"
      className={`relative isolate overflow-hidden bg-[#FAFAFA] text-[#232323] ${responsiveStyles.responsiveRoot}`}
      data-section="restoration-showcase"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none bg-cover bg-center opacity-70 mix-blend-multiply"
        data-restoration-background
        style={{
          backgroundImage: 'url("/assets/textures/heritage-texture.webp")',
        }}
      />

      <div
        className="relative mx-auto h-[44.875rem] w-full max-w-[1440px] px-[5.28%]"
        data-restoration-content
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-[8.25rem] px-[5.28%]"
          data-restoration-heading-wrapper
          data-restoration-animation-group="heading"
        >
          <DifferenceText
            as="h2"
            id="restoration-showcase-title"
            ref={headingRef}
            className="relative z-30 text-center font-display text-[clamp(5.5rem,12.2vw,10.9375rem)] font-light uppercase leading-[0.78] tracking-[0]"
            data-restoration-heading
          >
            {activeSlide.heading}
          </DifferenceText>
        </div>

        <div
          className="absolute left-[5.28%] right-[5.28%] top-[16.125rem] z-40 flex items-start justify-between font-display text-[clamp(0.9rem,1.1vw,1rem)] leading-none text-[#575757]"
          data-restoration-top-labels
          data-restoration-animation-group="labels"
        >
          <p ref={leftLabelRef} data-restoration-label="left">
            {activeSlide.leftLabel}
          </p>
          <p ref={rightLabelRef} data-restoration-label="right">
            {activeSlide.rightLabel}
          </p>
        </div>

        <div
          className="absolute left-[5.28%] right-[5.28%] top-[12.1875rem] z-20 grid grid-cols-[minmax(3rem,1fr)_clamp(26rem,37.153vw,33.4375rem)_minmax(3rem,1fr)] items-center gap-[clamp(2rem,4.4vw,4rem)]"
          data-restoration-stage
          data-restoration-animation-group="showcase-stage"
        >
          <OrangeBlock
            className="justify-self-start"
            data-restoration-accent-block="left"
          />

          <div
            className="relative aspect-[535/342] w-full overflow-hidden"
            data-restoration-carousel
          >
            {restorationSlides.map((slide, index) => (
              <figure
                className={`absolute inset-0 h-full w-full overflow-hidden ${
                  index === 0 ? "visible opacity-100" : "invisible opacity-0"
                }`}
                data-restoration-slide
                key={slide.id}
              >
                <CdnImage
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  sizes="65vw"
                  className="object-cover"
                  data-restoration-slide-image
                />
              </figure>
            ))}
          </div>

          <OrangeBlock
            className="justify-self-end"
            data-restoration-accent-block="right"
          />
        </div>

        <div
          className="absolute left-0 right-0 top-[34.75rem] z-30 text-center"
          data-restoration-meta-row
          data-restoration-animation-group="meta"
        >
          <p
            ref={numberRef}
            className="font-display text-[clamp(0.95rem,1.12vw,1rem)] leading-none text-[#D45231]"
            data-restoration-number
          >
            {activeSlide.number}
          </p>
        </div>

        <div
          className="absolute left-0 right-0 top-[40rem] z-30 flex justify-center"
          data-restoration-progress
          data-restoration-animation-group="progress"
        >
          <Image
            src="/assets/Restoration/pagination.svg"
            alt=""
            loading="eager"
            width={104}
            height={6}
            className="h-auto w-[clamp(4.5rem,7.2vw,6.5rem)]"
            data-restoration-pagination
            ref={paginationRef}
          />
        </div>
      </div>
    </section>
  );
}

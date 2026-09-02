"use client";

import responsiveStyles from "./image-showcase-section.responsive.module.css";
import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent,
} from "react";
import gsap from "gsap";
import { CdnImage } from "@/components/ui/cdn-image";
import { OrangeBlock } from "@/components/ui/orange-block";
import { Reveal } from "@/components/ui/reveal";

const showcaseImages = [
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase1.webp",
    alt: "Tropical architectural material study",
    sizeClassName:
      "mt-0 h-[clamp(18rem,26.7vw,24.027rem)] w-[clamp(10.7rem,15.86vw,14.273rem)]",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase2.webp",
    alt: "Pool courtyard framed by concrete and planting",
    sizeClassName:
      "mt-[clamp(0.9rem,1.35vw,1.215rem)] h-[clamp(16.2rem,24vw,21.6rem)] w-[clamp(9.87rem,14.62vw,13.162rem)]",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase3.webp",
    alt: "Laterite surface detail",
    sizeClassName:
      "mt-[clamp(2.05rem,3.02vw,2.723rem)] h-[clamp(13.94rem,20.65vw,18.582rem)] w-[clamp(9.29rem,13.77vw,12.394rem)]",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase4.webp",
    alt: "Villa approach framed by tropical greenery",
    sizeClassName:
      "mt-[clamp(2.05rem,3.02vw,2.723rem)] h-[clamp(13.94rem,20.65vw,18.582rem)] w-[clamp(9.29rem,13.77vw,12.394rem)]",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase5.webp",
    alt: "Coastal light and palm shadow texture",
    sizeClassName:
      "mt-[clamp(0.9rem,1.35vw,1.215rem)] h-[clamp(16.2rem,24vw,21.6rem)] w-[clamp(9.84rem,14.58vw,13.127rem)]",
  },
  {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/imageshowcase6.webp",
    alt: "Garden villa elevation with a lap pool",
    sizeClassName:
      "mt-0 h-[clamp(18rem,26.7vw,24.027rem)] w-[clamp(10.7rem,15.86vw,14.273rem)]",
  },
] as const;

const desktopLoopImages = [
  ...showcaseImages,
  ...showcaseImages,
  ...showcaseImages,
  ...showcaseImages,
] as const;

const markers = [
  "left-edge",
  "left-inner",
  "center",
  "right-inner",
  "right-edge",
] as const;

type DragAxis = "x" | "y" | null;

export function ImageShowcaseSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const mobileRevealRef = useRef<HTMLDivElement | null>(null);
  const mobileSequenceRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTickerRef = useRef<gsap.core.Tween | null>(null);
  const mobileTickerReadyRef = useRef(false);
  const mobileTickerVisibleRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const dragStateRef = useRef<{
    axis: DragAxis;
    currentScrollLeft: number;
    isDragging: boolean;
    scrollLeft: number;
    startX: number;
    startY: number;
    targetScrollLeft: number;
  }>({
    axis: null,
    currentScrollLeft: 0,
    isDragging: false,
    scrollLeft: 0,
    startX: 0,
    startY: 0,
    targetScrollLeft: 0,
  });

  const getLoopWidth = (viewport: HTMLDivElement) => viewport.scrollWidth / 2;

  const normalizeLoopPosition = (viewport: HTMLDivElement) => {
    const loopWidth = getLoopWidth(viewport);

    if (loopWidth <= viewport.clientWidth) {
      return;
    }

    const previousScrollLeft = viewport.scrollLeft;
    let nextScrollLeft = previousScrollLeft;

    if (nextScrollLeft >= loopWidth) {
      nextScrollLeft -= loopWidth;
    }

    if (nextScrollLeft === previousScrollLeft) {
      return;
    }

    const scrollDelta = nextScrollLeft - previousScrollLeft;
    const dragState = dragStateRef.current;

    viewport.scrollLeft = nextScrollLeft;
    dragState.currentScrollLeft += scrollDelta;
    dragState.scrollLeft += scrollDelta;
    dragState.targetScrollLeft += scrollDelta;
  };

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const setInitialLoopPosition = () => {
      const loopWidth = getLoopWidth(viewport);

      if (loopWidth <= viewport.clientWidth) {
        return;
      }

      viewport.scrollLeft = 0;
      dragStateRef.current.currentScrollLeft = 0;
      dragStateRef.current.scrollLeft = 0;
      dragStateRef.current.targetScrollLeft = 0;
    };

    const frame = window.requestAnimationFrame(setInitialLoopPosition);

    return () => {
      window.cancelAnimationFrame(frame);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  const stopMobileTicker = useCallback(() => {
    const track = mobileTrackRef.current;

    mobileTickerRef.current?.kill();
    mobileTickerRef.current = null;

    if (track) {
      gsap.set(track, { clearProps: "transform" });
      track.style.willChange = "";
    }
  }, []);

  const startMobileTicker = useCallback(() => {
    const sequence = mobileSequenceRef.current;
    const track = mobileTrackRef.current;

    if (
      !sequence ||
      !track ||
      mobileTickerRef.current ||
      !mobileTickerVisibleRef.current
    ) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const distance = sequence.scrollWidth;

    if (distance <= 0) {
      return;
    }

    gsap.set(track, { x: 0 });
    track.style.willChange = "transform";
    mobileTickerRef.current = gsap.to(track, {
      x: -distance,
      duration: Math.max(22, distance / 34),
      ease: "none",
      repeat: -1,
    });
  }, []);

  const handleMobileRevealComplete = useCallback(() => {
    mobileTickerReadyRef.current = true;
    startMobileTicker();
  }, [startMobileTicker]);

  useEffect(() => {
    const sequence = mobileSequenceRef.current;
    const reveal = mobileRevealRef.current;

    if (!sequence || !reveal) {
      return;
    }

    const media = window.matchMedia("(max-width: 767px)");

    const resizeObserver = new ResizeObserver(() => {
      if (!mobileTickerRef.current || !media.matches) {
        return;
      }

      stopMobileTicker();
      startMobileTicker();
    });

    const handleMediaChange = () => {
      if (!media.matches) {
        stopMobileTicker();
        return;
      }

      if (mobileTickerReadyRef.current) {
        startMobileTicker();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        mobileTickerVisibleRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          stopMobileTicker();
          return;
        }

        if (mobileTickerReadyRef.current && media.matches) {
          startMobileTicker();
        }
      },
      { rootMargin: "20% 0px" },
    );

    resizeObserver.observe(sequence);
    intersectionObserver.observe(reveal);
    media.addEventListener("change", handleMediaChange);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      media.removeEventListener("change", handleMediaChange);
      stopMobileTicker();
    };
  }, [startMobileTicker, stopMobileTicker]);

  const stopSmoothScroll = () => {
    if (animationFrameRef.current === null) {
      return;
    }

    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  };

  const smoothScrollToTarget = () => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport) {
      animationFrameRef.current = null;
      return;
    }

    dragState.currentScrollLeft +=
      (dragState.targetScrollLeft - dragState.currentScrollLeft) * 0.28;

    if (Math.abs(dragState.targetScrollLeft - dragState.currentScrollLeft) < 0.4) {
      dragState.currentScrollLeft = dragState.targetScrollLeft;
      viewport.scrollLeft = dragState.currentScrollLeft;
      normalizeLoopPosition(viewport);
      animationFrameRef.current = null;
      return;
    }

    viewport.scrollLeft = dragState.currentScrollLeft;
    normalizeLoopPosition(viewport);
    animationFrameRef.current = window.requestAnimationFrame(smoothScrollToTarget);
  };

  const startSmoothScroll = () => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(smoothScrollToTarget);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    dragStateRef.current = {
      axis: event.pointerType === "mouse" ? "x" : null,
      currentScrollLeft: viewport.scrollLeft,
      isDragging: true,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
      startY: event.clientY,
      targetScrollLeft: viewport.scrollLeft,
    };

    stopSmoothScroll();

    if (event.pointerType === "mouse") {
      viewport.dataset.dragging = "true";
      viewport.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;

    if (!viewport || !dragState.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (dragState.axis === null) {
      if (Math.hypot(deltaX, deltaY) < 8) {
        return;
      }

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        dragState.axis = "y";
        dragState.isDragging = false;
        delete viewport.dataset.dragging;
        return;
      }

      dragState.axis = "x";
      viewport.dataset.dragging = "true";
      viewport.setPointerCapture(event.pointerId);
    }

    if (dragState.axis !== "x") {
      return;
    }

    event.preventDefault();
    dragState.targetScrollLeft = dragState.scrollLeft - deltaX;
    startSmoothScroll();
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    dragStateRef.current.isDragging = false;
    dragStateRef.current.axis = null;

    if (!viewport) {
      return;
    }

    delete viewport.dataset.dragging;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      aria-label="Image showcase"
      className={`relative isolate h-[43.75rem] overflow-hidden bg-[#b9b9b9] ${responsiveStyles.responsiveRoot}`}
      data-section="image-showcase"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-showcase-section-background
      >
        <div
          className="absolute inset-0 bg-[#b9b9b9]"
          data-showcase-background-fill
        />
        <Image
          src="/assets/textures/imageshowcase-texture.webp"
          alt=""
          aria-hidden="true"
          width={1440}
          height={411}
          draggable={false}
          quality={75}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full select-none [-webkit-user-drag:none]"
          data-showcase-background-texture
        />
      </div>

      <div
        className="relative h-full w-full"
        data-showcase-content
        data-showcase-desktop-layout
      >
        <h2
          className="absolute left-1/2 top-[5.75rem] z-30 w-[min(46.5rem,92vw)] -translate-x-1/2 bg-cover bg-center bg-clip-text text-center font-display text-[clamp(1.35rem,2.1vw,1.875rem)] font-normal leading-[1.25] tracking-[0.01em] text-transparent"
          data-showcase-heading
          style={{
            backgroundImage: 'url("/assets/textures/LateriteTexture.svg")',
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LATERITE, TEAK WOOD, EXPOSED CONCRETE
          <br />
          THE BENEICIO HOME
        </h2>

        <div
          className="absolute inset-x-0 top-[14.9rem] z-10 h-[16.8125rem] bg-[#232323]"
          data-showcase-panel
        >
          <div
            aria-hidden="true"
            className="pointer-events-none relative h-full w-full"
            data-showcase-marker-layer
          >
            {markers.map((marker, index) => (
              <OrangeBlock
                className="absolute top-[11.5625rem]"
                data-showcase-marker={marker}
                key={marker}
                style={{
                  left:
                    index === 0
                      ? "0"
                      : index === 1
                        ? "24.68%"
                        : index === 2
                          ? "50%"
                          : index === 3
                            ? "74.72%"
                            : "auto",
                  right: index === 4 ? "0" : "auto",
                  transform: index === 2 ? "translateX(-50%)" : undefined,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[11.75rem] z-20"
          data-showcase-ticker
        >
          <div
            className="cursor-grab select-none overflow-x-auto overflow-y-hidden overscroll-x-contain active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-showcase-viewport
            onScroll={(event) => normalizeLoopPosition(event.currentTarget)}
            onPointerCancel={endDrag}
            onPointerDown={handlePointerDown}
            onPointerLeave={endDrag}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            ref={viewportRef}
          >
            <div
              className="flex h-[clamp(18rem,26.7vw,24.027rem)] w-max select-none items-start gap-[clamp(1.45rem,2.17vw,1.95rem)] pr-[clamp(1.45rem,2.17vw,1.95rem)]"
              data-showcase-track
            >
              {desktopLoopImages.map((image, index) => {
                const slot = showcaseImages[index % showcaseImages.length];

                return (
                  <figure
                    aria-hidden={index >= showcaseImages.length}
                    className={`relative shrink-0 overflow-hidden ${slot.sizeClassName}`}
                    data-showcase-image
                    data-showcase-image-index={
                      (index % showcaseImages.length) + 1
                    }
                    key={`desktop-${index}`}
                  >
                    <CdnImage
                      src={image.url}
                      alt={index < showcaseImages.length ? image.alt : ""}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 16vw, 42vw"
                      className="pointer-events-none select-none object-cover"
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Reveal
        className="relative mx-auto h-full w-full"
        data-showcase-mobile-layout
        onRevealComplete={handleMobileRevealComplete}
        revealId="image-showcase-mobile"
      >
        <div ref={mobileRevealRef} className="relative h-full w-full">
          <h2
            className="absolute left-1/2 top-[4rem] z-30 w-[min(71rem,94vw)] -translate-x-1/2 bg-cover bg-center bg-clip-text text-center font-display text-[clamp(1.25rem,8.65vw,1.55rem)] font-normal leading-[1.25] tracking-[0.01em] text-transparent"
            data-showcase-mobile-heading
            style={{
              backgroundImage: 'url("/assets/textures/LateriteTexture.svg")',
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
          LATERITE, TEAK WOOD, EXPOSED CONCRETE
          <br />
          THE BENEICIO HOME 
        </h2>

          <div
            className="absolute inset-x-0 top-[17.75rem] z-10 h-[7.5rem] bg-[#232323]"
            data-showcase-mobile-panel
          >
            <div
              aria-hidden="true"
              className="pointer-events-none relative h-full w-full"
              data-showcase-mobile-marker-layer
            >
              {markers.map((marker, index) => (
                <OrangeBlock
                  className="absolute"
                  data-showcase-mobile-marker={marker}
                  key={`mobile-${marker}`}
                  style={{
                    left:
                      index === 0
                        ? "0"
                        : index === 1
                          ? "24.68%"
                          : index === 2
                            ? "50%"
                            : index === 3
                              ? "74.72%"
                              : "auto",
                    right: index === 4 ? "0" : "auto",
                    transform:
                      index === 2 ? "translateX(-50%)" : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-[14rem] z-20 overflow-hidden"
            data-showcase-mobile-viewport
          >
            <div
              className="flex w-max items-start gap-[1.125rem]"
              data-showcase-mobile-track
              ref={mobileTrackRef}
            >
              <div
                className="flex shrink-0 items-start gap-[1.125rem] pr-[1.125rem]"
                data-showcase-mobile-sequence="primary"
                ref={mobileSequenceRef}
              >
                {showcaseImages.map((image, index) => (
                  <figure
                    className="relative h-[15rem] shrink-0 overflow-hidden"
                    data-showcase-mobile-image
                    data-showcase-mobile-image-index={index + 1}
                    key={`mobile-primary-${index}`}
                    style={{
                      aspectRatio:
                        index === 2 || index === 3
                          ? "0.67"
                          : index === 0 || index === 5
                            ? "0.59"
                            : "0.61",
                    }}
                  >
                    <CdnImage
                      src={image.url}
                      alt={image.alt}
                      fill
                      draggable={false}
                      sizes="42vw"
                      className="pointer-events-none select-none object-cover"
                    />
                  </figure>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="flex shrink-0 items-start gap-[1.125rem] pr-[1.125rem]"
                data-showcase-mobile-sequence="duplicate"
              >
                {showcaseImages.map((image, index) => (
                  <figure
                    className="relative h-[15rem] shrink-0 overflow-hidden"
                    data-showcase-mobile-image
                    data-showcase-mobile-image-index={index + 1}
                    key={`mobile-duplicate-${index}`}
                    style={{
                      aspectRatio:
                        index === 2 || index === 3
                          ? "0.67"
                          : index === 0 || index === 5
                            ? "0.59"
                            : "0.61",
                    }}
                  >
                    <CdnImage
                      src={image.url}
                      alt=""
                      fill
                      draggable={false}
                      sizes="42vw"
                      className="pointer-events-none select-none object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

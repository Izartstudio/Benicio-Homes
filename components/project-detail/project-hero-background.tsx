import type { ImageProps } from "next/image";
import {
  forwardRef,
  type CSSProperties,
  type Ref,
} from "react";
import { CdnImage } from "@/components/ui/cdn-image";
import styles from "./project-hero-background.module.css";

const projectHeroImageQuality = 90;

export type ProjectHeroBackgroundImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectHeroFocalPosition = {
  desktop?: number;
  mobile?: number;
  tablet?: number;
};

export type ProjectHeroBackgroundProps = {
  backgroundImage: ProjectHeroBackgroundImage;
  backgroundImageRef?: Ref<HTMLImageElement>;
  softenUpperGradient?: boolean;
  focalPosition?: ProjectHeroFocalPosition;
  foregroundCanvasHeightRatio?: number;
  foregroundImage?: ProjectHeroBackgroundImage;
  foregroundMotionRef?: Ref<HTMLDivElement>;
  mediaAspectRatio: number;
  mobileBackgroundImage?: ProjectHeroBackgroundImage;
  mobileForegroundCanvasHeightRatio?: number;
  mobileForegroundImage?: ProjectHeroBackgroundImage;
  mobileMediaAspectRatio?: number;
};

export const ProjectHeroBackground = forwardRef<
  HTMLDivElement,
  ProjectHeroBackgroundProps
>(
  (
    {
      backgroundImage,
      backgroundImageRef,
      softenUpperGradient = false,
      focalPosition,
      foregroundCanvasHeightRatio = 1,
      foregroundImage,
      foregroundMotionRef,
      mediaAspectRatio,
      mobileBackgroundImage,
      mobileForegroundCanvasHeightRatio = foregroundCanvasHeightRatio,
      mobileForegroundImage,
      mobileMediaAspectRatio = mediaAspectRatio,
    },
    mediaMotionRef,
  ) => {
    const desktopFocalX = focalPosition?.desktop ?? 50;
    const tabletFocalX = focalPosition?.tablet ?? desktopFocalX;
    const mobileFocalX = focalPosition?.mobile ?? tabletFocalX;
    const rootStyle = {
      "--project-foreground-canvas-height": `${foregroundCanvasHeightRatio * 100}%`,
      "--project-hero-focal-x-desktop": `${desktopFocalX}%`,
      "--project-hero-focal-x-mobile": `${mobileFocalX}%`,
      "--project-hero-focal-x-tablet": `${tabletFocalX}%`,
      "--project-hero-focal-translate-desktop": `${-desktopFocalX}%`,
      "--project-hero-focal-translate-mobile": `${-mobileFocalX}%`,
      "--project-hero-focal-translate-tablet": `${-tabletFocalX}%`,
      "--project-media-aspect-ratio": mediaAspectRatio,
      "--project-mobile-foreground-canvas-height": `${mobileForegroundCanvasHeightRatio * 100}%`,
      "--project-mobile-media-aspect-ratio": mobileMediaAspectRatio,
    } as CSSProperties;

    return (
      <div
        aria-hidden="true"
        className={styles.backgroundRoot}
        data-has-mobile-hero={Boolean(mobileBackgroundImage)}
        data-project-hero-background
        style={rootStyle}
      >
        <div className={styles.mediaPositioner}>
          <div
            className={styles.mediaMotion}
            data-project-hero-media-motion
            ref={mediaMotionRef}
          >
            <div className={styles.backgroundImageLayer}>
              <CdnImage
                alt={backgroundImage.alt}
                className={styles.mediaImage}
                data-project-hero-background-image
                fill
                preload
                quality={projectHeroImageQuality}
                ref={backgroundImageRef}
                sizes="100vw"
                src={backgroundImage.src}
              />
              {mobileBackgroundImage ? (
                <CdnImage
                  alt={mobileBackgroundImage.alt}
                  className={`${styles.mediaImage} ${styles.mobileMediaImage}`}
                  fill
                  preload
                  quality={projectHeroImageQuality}
                  sizes="100vw"
                  src={mobileBackgroundImage.src}
                />
              ) : null}
            </div>

            <div
              className={`${styles.upperMaskLayer} ${
                softenUpperGradient ? styles.softUpperMaskLayer : ""
              }`}
            />

          </div>
        </div>

        {foregroundImage ? (
          <div className={styles.foregroundPositioner}>
            <div className={styles.foregroundMotion} ref={foregroundMotionRef}>
              <div className={styles.foregroundLayer}>
                <CdnImage
                  alt={foregroundImage.alt}
                  className={styles.mediaImage}
                  fetchPriority="high"
                  fill
                  preload
                  quality={projectHeroImageQuality}
                  sizes="100vw"
                  src={foregroundImage.src}
                />
                {mobileForegroundImage ? (
                  <CdnImage
                    alt={mobileForegroundImage.alt}
                    className={`${styles.mediaImage} ${styles.mobileMediaImage}`}
                    fetchPriority="high"
                    fill
                    preload
                    quality={projectHeroImageQuality}
                    sizes="100vw"
                    src={mobileForegroundImage.src}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.lowerMultiplyLayer} />
      </div>
    );
  },
);

ProjectHeroBackground.displayName = "ProjectHeroBackground";

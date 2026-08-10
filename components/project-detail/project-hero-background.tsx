import type { ImageProps } from "next/image";
import {
  forwardRef,
  type CSSProperties,
  type Ref,
} from "react";
import { CdnImage } from "@/components/ui/cdn-image";
import styles from "./project-hero-background.module.css";

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
    } as CSSProperties;

    return (
      <div
        aria-hidden="true"
        className={styles.backgroundRoot}
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
                loading="eager"
                preload
                ref={backgroundImageRef}
                sizes="100vw"
                src={backgroundImage.src}
              />
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
                  fill
                  loading="eager"
                  sizes="100vw"
                  src={foregroundImage.src}
                />
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

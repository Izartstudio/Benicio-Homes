import type { ImageProps } from "next/image";
import responsiveStyles from "./project-gallery-editorial-section.responsive.module.css";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CdnImage } from "@/components/ui/cdn-image";
import { PDP_TEXTURE_URL } from "./pdp-texture";

const CAPTION_REVEAL_DURATION = 0.22;
const CAPTION_TO_IMAGE_GAP = 0.02;
const IMAGE_REVEAL_DURATION = 0.36;
const GALLERY_ITEM_STAGGER = 0.18;

type GalleryEditorialImage = {
  alt: string;
  src: ImageProps["src"];
};

type GalleryItemPosition = {
  captionAlign?: "left" | "right";
  left: number;
  top: number;
};

export type GalleryItemProps = {
  caption: string;
  height: number;
  image: GalleryEditorialImage;
  position: GalleryItemPosition;
  width: number;
};

export type ProjectGalleryEditorialSectionProps = {
  items: readonly GalleryItemProps[];
  watermark?: string;
};

type GalleryItemStyle = CSSProperties & {
  "--gallery-aspect-ratio": string;
  "--gallery-height": string;
  "--gallery-left": string;
  "--gallery-tablet-left": string;
  "--gallery-tablet-top": string;
  "--gallery-tablet-width": string;
  "--gallery-top": string;
  "--gallery-width": string;
};

type SequencedGalleryItemProps = GalleryItemProps & {
  sequenceIndex: number;
};

export function GalleryItem({
  caption,
  height,
  image,
  position,
  sequenceIndex,
  width,
}: SequencedGalleryItemProps) {
  const itemStyle: GalleryItemStyle = {
    "--gallery-aspect-ratio": `${width} / ${height}`,
    "--gallery-height": `${height}rem`,
    "--gallery-left": `${position.left}rem`,
    "--gallery-tablet-left": `${(position.left / 90) * 100}%`,
    "--gallery-tablet-top": `${(position.top / 64) * 100}%`,
    "--gallery-tablet-width": `${(width / 90) * 100}%`,
    "--gallery-top": `${position.top}rem`,
    "--gallery-width": `${width}rem`,
  };
  const captionDelay = sequenceIndex * GALLERY_ITEM_STAGGER;
  const imageDelay =
    captionDelay + CAPTION_REVEAL_DURATION + CAPTION_TO_IMAGE_GAP;

  return (
    <figure
      className={`relative z-10 w-full xl:absolute xl:left-[var(--gallery-left)] xl:top-[var(--gallery-top)] xl:w-[var(--gallery-width)] ${
        responsiveStyles[`position${sequenceIndex + 1}`] ?? ""
      }`}
      data-gallery-editorial-item
      style={itemStyle}
    >
      <Reveal
        delay={captionDelay}
        duration={CAPTION_REVEAL_DURATION}
        revealId={`gallery-editorial-caption-${sequenceIndex + 1}`}
        start="top 82%"
        triggerClosest="[data-project-gallery-editorial-section]"
        y={10}
      >
        <figcaption
          className={`mb-[1rem] font-display text-[0.75rem] font-normal leading-none tracking-[0.01em] text-[#1a1a1a] ${
            position.captionAlign === "right" ? "text-right" : "text-left"
          }`}
          data-gallery-editorial-caption
        >
          {caption}
        </figcaption>
      </Reveal>

      <Reveal
        delay={imageDelay}
        duration={IMAGE_REVEAL_DURATION}
        revealId={`gallery-editorial-image-${sequenceIndex + 1}`}
        start="top 82%"
        triggerClosest="[data-project-gallery-editorial-section]"
        y={0}
      >
        <div
          className="relative aspect-[var(--gallery-aspect-ratio)] w-full overflow-hidden xl:aspect-auto xl:h-[var(--gallery-height)]"
          data-gallery-editorial-reveal
          data-gallery-editorial-image-wrapper
        >
          <CdnImage
            alt={image.alt}
            className="object-cover"
            fill
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 4.5rem), 33vw"
            src={image.src}
          />
        </div>
      </Reveal>
    </figure>
  );
}

export function ProjectGalleryEditorialSection({
  items,
  watermark,
}: ProjectGalleryEditorialSectionProps) {
  return (
    <section
      aria-label="Project image gallery"
      className={`relative isolate -mt-px overflow-hidden bg-[#fafafa] text-[#1a1a1a] ${responsiveStyles.responsiveRoot}`}
      data-project-gallery-editorial-section
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#fafafa] bg-cover bg-center opacity-50 mix-blend-multiply"
        data-project-gallery-editorial-background-texture
        style={{
          backgroundImage: `url('${PDP_TEXTURE_URL}')`,
        }}
      />

      <div
        className={`relative z-10 mx-auto w-full xl:h-[56.8889rem] min-[90rem]:h-[64rem] ${responsiveStyles.layout}`}
      >
        <div
          className="relative grid w-full grid-cols-1 gap-x-[3rem] gap-y-[5rem] px-[1.5rem] py-[5rem] md:grid-cols-2 md:px-[3rem] md:py-[6rem] xl:absolute xl:left-1/2 xl:top-0 xl:block xl:h-[64rem] xl:w-[90rem] xl:origin-top xl:-translate-x-1/2 xl:scale-[0.888889] xl:p-0 min-[90rem]:scale-100"
          data-gallery-editorial-composition
        >
          {watermark ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[0.4rem] top-[19.9375rem] z-0 hidden whitespace-nowrap font-display text-[19.25rem] font-normal uppercase leading-[0.72] tracking-[0.01em] text-white/20 xl:block"
              data-gallery-editorial-watermark
            >
              {watermark}
            </span>
          ) : null}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden"
            data-gallery-editorial-accent
          />

          {items.map((item, itemIndex) => (
            <GalleryItem
              caption={item.caption}
              height={item.height}
              image={item.image}
              key={`${item.caption}-${item.image.src.toString()}`}
              position={item.position}
              sequenceIndex={itemIndex}
              width={item.width}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

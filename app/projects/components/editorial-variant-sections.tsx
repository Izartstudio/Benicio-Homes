import type { CSSProperties } from "react";
import type { ProjectEditorialVariantsData } from "@/app/projects/data";
import { CdnImage } from "@/components/ui/cdn-image";
import { Reveal } from "@/components/ui/reveal";
import styles from "./editorial-variant-sections.module.css";

type EditorialVariantSectionsProps = {
  data: ProjectEditorialVariantsData;
};

function Media({ image, priority = false }: {
  image: ProjectEditorialVariantsData["siteComposition"]["image"];
  priority?: boolean;
}) {
  return (
    <CdnImage
      alt={image.alt}
      className={styles.image}
      fill
      priority={priority}
      sizes="(max-width: 767px) 100vw, 90vw"
      src={image.src}
    />
  );
}

export function EditorialVariantSections({ data }: EditorialVariantSectionsProps) {
  const textureStyle = {
    "--editorial-gallery-texture": data.textures?.gallery
      ? `url("${data.textures.gallery}")`
      : "none",
    "--editorial-moodboard-texture": data.textures?.moodboard
      ? `url("${data.textures.moodboard}")`
      : "none",
    "--editorial-showcase-texture": data.textures?.showcase
      ? `url("${data.textures.showcase}")`
      : "none",
    "--editorial-site-texture": data.textures?.siteComposition
      ? `url("${data.textures.siteComposition}")`
      : "none",
    "--editorial-steps-texture": data.textures?.steps
      ? `url("${data.textures.steps}")`
      : "var(--editorial-site-texture)",
  } as CSSProperties;

  return (
    <div
      className={styles.editorialRoot}
      data-mobile-layout={data.mobileLayout}
      style={textureStyle}
    >
      <section className={`${styles.section} ${styles.site}`} data-pdp-variant="site-composition">
        <Reveal
          aria-hidden="true"
          className={styles.siteSteps}
          duration={0.9}
          fade={false}
          revealId="editorial-site-steps"
          y={18}
        >
          <i /><i /><i /><i /><i />
        </Reveal>
        <Reveal as="figure" className={`${styles.frame} ${styles.siteMedia}`} y={16}>
          <Media image={data.siteComposition.image} />
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.moodboard}`} data-pdp-variant="moodboard">
        {data.moodboard.labels && (
          <div className={styles.moodLabels} aria-hidden="true">
            <span className={styles.moodLabelPrimary}>{data.moodboard.labels.primary}</span>
            <span className={styles.moodLabelVertical}>{data.moodboard.labels.vertical}</span>
            <span className={styles.moodLabelFooter}>{data.moodboard.labels.footer}</span>
          </div>
        )}
        <div className={styles.moodGrid}>
          {data.moodboard.images.map((image, index) => (
            <Reveal as="figure" className={`${styles.frame} ${styles[`mood${index + 1}`]}`} delay={index * 0.05} key={`${image.alt}-${index}`} y={14}>
              <Media image={image} />
            </Reveal>
          ))}
        </div>
        <span aria-hidden="true" className={styles.moodAccent} />
      </section>

      <section className={`${styles.section} ${styles.showcase}`} data-pdp-variant="showcase">
        <Reveal as="figure" className={`${styles.frame} ${styles.showcaseHero}`} y={16}>
          <Media image={data.showcase.images[0]} />
        </Reveal>
        <div className={styles.showcaseStrip}>
          {data.showcase.images.slice(1).map((image, index) => (
            <Reveal as="figure" className={styles.frame} delay={index * 0.05} key={`${image.alt}-${index}`} y={12}>
              <Media image={image} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.gallery}`} data-pdp-variant="gallery">
        <div aria-hidden="true" className={styles.restorationTransition} />
        {!data.gallery.hideWatermark ? (
          <p className={styles.watermark} aria-hidden="true">{data.gallery.watermark}</p>
        ) : null}
        {data.gallery.items.map((item, index) => (
          <Reveal as="figure" className={`${styles.galleryItem} ${styles[`gallery${index + 1}`]}`} delay={index * 0.08} key={item.caption} y={16}>
            <div className={`${styles.frame} ${styles.galleryMedia}`}><Media image={item.image} /></div>
            <figcaption className={styles.caption}>
              <span aria-hidden="true" />{item.caption}
            </figcaption>
          </Reveal>
        ))}
      </section>
    </div>
  );
}

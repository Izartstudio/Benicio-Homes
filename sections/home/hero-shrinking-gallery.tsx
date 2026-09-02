import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import styles from "./textured-hero-section.responsive.module.css";

export type HeroImage = {
  alt: string;
  src: string;
};

type HeroShrinkingGalleryProps = {
  images: readonly HeroImage[];
};

export function HeroShrinkingGallery({ images }: HeroShrinkingGalleryProps) {
  return (
    <div className={styles.imageFrame} data-hero-sequence-frame>
      {images.map((image, index) => (
        <Image
          alt={image.alt}
          aria-hidden={index > 0}
          className={styles.sequenceImage}
          data-hero-sequence-image
          fill
          key={image.src}
          priority={index === 0}
          sizes="(max-width: 767px) 78vw, (max-width: 1023px) 48vw, 422px"
          src={image.src}
        />
      ))}

      <Image
        alt=""
        aria-hidden="true"
        className={styles.orangeImage}
        data-hero-orange-image
        height={29}
        src="/assets/hero/orange-box.png"
        width={29}
      />
    </div>
  );
}

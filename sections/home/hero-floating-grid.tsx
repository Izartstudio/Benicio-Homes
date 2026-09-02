import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import styles from "./textured-hero-section.responsive.module.css";

type HeroFloatingGridProps = {
  columns: readonly [readonly string[], readonly string[]];
};

function FloatingColumn({
  images,
  slow = false,
}: {
  images: readonly string[];
  slow?: boolean;
}) {
  return (
    <div className={styles.floatingColumn}>
      <div
        className={`${styles.floatingTrack} ${slow ? styles.floatingTrackSlow : ""}`}
      >
        {[0, 1].map((setIndex) => (
          <div aria-hidden={setIndex === 1} className={styles.floatingSet} key={setIndex}>
            {images.map((src, imageIndex) => (
              <figure
                className={`${styles.floatingCard} bg-charcoal`}
                key={`${setIndex}-${src}`}
              >
                <Image
                  alt={setIndex === 0 ? `Benicio residence ${imageIndex + 1}` : ""}
                  className={styles.floatingImage}
                  fill
                  sizes="50vw"
                  src={src}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroFloatingGrid({ columns }: HeroFloatingGridProps) {
  return (
    <div
      aria-label="Selected Benicio residences"
      className={`${styles.floatingGrid} bg-charcoal`}
      data-hero-floating-grid
    >
      <FloatingColumn images={columns[0]} />
      <FloatingColumn images={columns[1]} slow />
    </div>
  );
}

import { CdnImage } from "@/components/ui/cdn-image";
import { OrangeBlock } from "@/components/ui/orange-block";
import styles from "./legacy-section.responsive.module.css";

export function LegacySection() {
  return (
    <section aria-labelledby="legacy-section-title" className={styles.root} data-section="legacy">
      <div className={styles.canvas} data-legacy-canvas>
        <div aria-hidden="true" className={styles.background} />
        <div aria-hidden="true" className={styles.topMarkers}>
          <OrangeBlock />
          <OrangeBlock />
        </div>
        <h2 id="legacy-section-title" className={styles.heading}>
          PRESERVING<br />GOA&apos;S LEGACY
        </h2>
        <div className={styles.collage} aria-label="Restored Goan homes">
          <figure className={styles.middleImage}>
            <CdnImage src="/assets/legacy/diagonalimage2.webp" alt="Restored Goan veranda with carved timber columns beside a pool" fill sizes="(max-width: 767px) 44vw, 25vw" className={styles.collageImage} />
          </figure>
          <figure className={styles.topImage}>
            <CdnImage src="/assets/legacy/diagonalimage1.webp" alt="Illuminated heritage villa entrance framed by palms" fill sizes="(max-width: 767px) 36vw, 21vw" className={styles.collageImage} />
          </figure>
          <figure className={styles.bottomImage}>
            <CdnImage src="/assets/legacy/diagonalimage3.webp" alt="White Goan heritage home with a tiled roof and tropical garden" fill sizes="(max-width: 767px) 42vw, 24vw" className={styles.collageImage} />
          </figure>
        </div>
        <p className={styles.copy}>
          Preservation begins with respect. Every restoration is an opportunity
          to protect the architectural character of Goa, carrying its materials,
          craftsmanship, and stories forward for generations to come.
        </p>
        <div aria-hidden="true" className={styles.bottomMarkers}>
          <span>∞</span>
          <span>∞</span>
        </div>
      </div>
    </section>
  );
}

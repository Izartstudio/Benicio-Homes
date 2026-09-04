import { CTA } from "@/components/ui/cta";
import styles from "./built-for-place-section.module.css";

export function BuiltForPlaceSection() {
  return (
    <section className={styles.root} aria-labelledby="built-for-place-title" data-section="built-for-place">
      <div className={styles.content}>
        <h2 id="built-for-place-title" className={styles.heading}>
          Built For The Place.<br />Designed For Life.
        </h2>
        <div className={styles.copy}>
          <p>
            Great homes are measured by how they are lived in, not simply how
            they are seen. We create developments where architecture, landscape,
            and everyday living come together to leave a lasting legacy.
          </p>
          <CTA href="/projects" variant="dark" darkBackground="#464646" className={styles.cta}>
            View All Projects
          </CTA>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.stairs} aria-hidden="true" />
    </section>
  );
}

import styles from "./textured-hero-section.responsive.module.css";

export function HeroFinalComposition() {
  return (
    <div className={styles.finalComposition} data-hero-final-composition>
      <p className={styles.location} data-hero-copy>
        GOA, IN
      </p>

      <p className={styles.locationleft} data-hero-copy>
      15.2993° N   
      </p>
      
      <p className={styles.locationleft2} data-hero-copy>
      74.1240° E 
      </p>
 
      <p className={`${styles.wordmark} ${styles.wordmarkLeft}`} data-hero-copy>
       <img src="/assets/projects/wordmark.png" alt="Benicio" width={95} height={97} className="relative z-10 h-[clamp(5.35rem,3.5vw,3.25rem)] w-auto" />
      </p>

      <p className={`${styles.statement} ${styles.statementbottom}`} data-hero-copy>
        Good Architecture should respect the climate of the land, and not stay
        apart from it.
      </p>
    </div>
  );
}

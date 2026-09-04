import type { ReactNode } from "react";
import { CTA } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";
import { SectionCrosshair } from "@/components/ui/section-crosshair";
import { cn } from "@/utils/cn";
import styles from "./editorial-hero-composition.module.css";

type EditorialHeroCompositionProps = {
  alignMarkerToImageCenter?: boolean;
  className?: string;
  coordinates?: string;
  ctaHref?: string;
  ctaLabel?: string;
  designSource?: string;
  embedded?: boolean;
  location?: string;
  sectionName: string;
  showMarker?: boolean;
  statement?: string;
  statementHeading?: string;
  title: ReactNode;
  titleId: string;
  titleVariant?: "text" | "wordmark";
};

const defaultStatement =
  "Our work begins before form. We study the land, decide what should remain and use structure, material, light and shade to determine what follows.";

export function EditorialHeroComposition({
  alignMarkerToImageCenter = false,
  className,
  coordinates = "15.4909° N  /  73.8278° E",
  ctaHref = "/projects",
  ctaLabel = "Explore Projects",
  designSource,
  embedded = false,
  location = "GOA, IN",
  sectionName,
  showMarker = true,
  statement = defaultStatement,
  statementHeading,
  title,
  titleId,
  titleVariant = "text",
}: EditorialHeroCompositionProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={cn(styles.root, embedded && styles.embedded, className)}
      data-design-source={designSource}
      data-editorial-hero
      data-section={sectionName}
    >
      <div aria-hidden="true" className={styles.concreteBackground} />
      <div aria-hidden="true" className={styles.shadowOverlay} />

      <div
        className={cn(
          styles.foreground,
          alignMarkerToImageCenter && styles.imageCenteredForeground,
        )}
      >
        <SectionCrosshair className={styles.crosshair} showMarker={showMarker} />

        <Reveal
          className={cn(
            styles.title,
            titleVariant === "wordmark" && styles.wordmarkTitle,
          )}
          data-editorial-hero-reveal
          revealMode="manual"
        >
          <h1 id={titleId}>{title}</h1>
        </Reveal>

        <Reveal
          className={styles.location}
          data-editorial-hero-reveal
          revealMode="manual"
        >
          <strong>{location}</strong>
          <span>{coordinates}</span>
        </Reveal>

        <Reveal
          className={cn(styles.statement, statementHeading && styles.withStatementHeading)}
          data-editorial-hero-reveal
          revealMode="manual"
        >
          {statementHeading && <h2>{statementHeading}</h2>}
          <p>{statement}</p>
          <CTA href={ctaHref} variant="light">
            {ctaLabel}
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}

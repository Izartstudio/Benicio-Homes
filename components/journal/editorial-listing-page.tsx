import type { CSSProperties } from "react";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import {
  JournalGrid,
  type EditorialListingItem,
} from "@/components/journal/journal-grid";
import { Reveal } from "@/components/ui/reveal";
import { getCdnAsset } from "@/lib/getCdnAsset";

type EditorialListingPageProps = {
  accentColor?: string;
  cardAuthorColor?: string;
  cardTitleColor?: string;
  cardTexture?: string;
  ctaBackgroundColor?: string;
  ctaTextColor?: string;
  contactTransitionGradient?: string;
  description: string;
  descriptionTextColor?: string;
  emptyMessage?: string;
  heading: string;
  introBackgroundColor?: string;
  introTextColor?: string;
  introTexture?: string;
  items: EditorialListingItem[];
  listingBackgroundColor?: string;
  listingTexture?: string;
  loadMoreLabel?: string;
  listingHeading?: string;
  sectionLabel: string;
  stepBackgroundColor?: string;
  stepTextureBlend?: boolean;
  stepTexture?: string;
  variant?: "journal" | "projects";
};

export function EditorialListingPage({
  accentColor = "#dc4c28",
  cardAuthorColor = "#ffffff",
  cardTitleColor = "#ffffff",
  cardTexture,
  ctaBackgroundColor = "#575757",
  ctaTextColor = "#ffffff",
  contactTransitionGradient =
    "linear-gradient(180deg, transparent 50%, #b9b9b9 100%)",
  description,
  descriptionTextColor = "#575757",
  emptyMessage,
  heading,
  introBackgroundColor = "#d4d4d1",
  introTextColor = "#232323",
  introTexture,
  items,
  listingBackgroundColor = "#343434",
  listingTexture,
  loadMoreLabel,
  listingHeading,
  sectionLabel,
  stepBackgroundColor = "",
  stepTextureBlend = true,
  stepTexture,
  variant = "journal",
}: EditorialListingPageProps) {
  const resolvedIntroTexture = getCdnAsset(introTexture);
  const resolvedCardTexture = getCdnAsset(cardTexture);
  const resolvedListingTexture = getCdnAsset(listingTexture);
  const resolvedStepTexture = getCdnAsset(stepTexture ?? listingTexture);
  const introTextureOrigin = resolvedIntroTexture?.startsWith("http")
    ? new URL(resolvedIntroTexture).origin
    : null;
  const style = {
    "--editorial-accent-color": accentColor,
    "--editorial-card-author-color": cardAuthorColor,
    "--editorial-card-title-color": cardTitleColor,
    "--editorial-card-texture": resolvedCardTexture
      ? `url("${resolvedCardTexture}")`
      : "none",
    "--editorial-cta-background": ctaBackgroundColor,
    "--editorial-cta-text": ctaTextColor,
    "--editorial-contact-transition": contactTransitionGradient,
    "--editorial-description-color": descriptionTextColor,
    "--editorial-intro-color": introBackgroundColor,
    "--editorial-intro-text": introTextColor,
    "--journal-texture": resolvedIntroTexture
      ? `url("${resolvedIntroTexture}")`
      : "none",
    "--editorial-listing-color": listingBackgroundColor,
    "--journal-featured-texture": resolvedListingTexture
      ? `url("${resolvedListingTexture}")`
      : "none",
    "--editorial-step-color": stepBackgroundColor,
    "--journal-step-texture": resolvedStepTexture
      ? `url("${resolvedStepTexture}")`
      : "none",
  } as CSSProperties;

  return (
    <main className="bg-[#343434] text-[#d8d6cf]" data-editorial-listing data-editorial-variant={variant} style={style}>
      {introTextureOrigin ? (
        <link crossOrigin="anonymous" href={introTextureOrigin} rel="preconnect" />
      ) : null}
      {resolvedIntroTexture ? (
        <link
          as="image"
          fetchPriority="high"
          href={resolvedIntroTexture}
          rel="preload"
        />
      ) : null}
      <section className="journal-intro relative min-h-[40.625rem] overflow-hidden px-[5.208vw] pb-28 pt-48 text-[var(--editorial-intro-text)]">
        <div className="journal-paper absolute inset-0" aria-hidden="true" />
        <div className="editorial-intro-copy relative z-10 max-w-[50rem]">
          <Reveal as="h1" className="font-display text-[clamp(2rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[0.01em]" revealMode="mount">
            {heading}
          </Reveal>
          <Reveal as="p" className="mt-10 max-w-[26rem] font-display text-[0.95rem] font-light leading-[1.45] text-[var(--editorial-description-color)]" delay={0.08} revealMode="mount">
            {description}
          </Reveal>
        </div>
        <div className="journal-steps" aria-hidden="true">
          <ArchitecturalStairs
            stairClassName={`editorial-listing-texture-scale bg-[var(--editorial-step-color)] bg-[image:var(--journal-step-texture)] ${stepTextureBlend ? "bg-blend-overlay" : "bg-blend-normal"}`}
            variant="journal"
          />
        </div>
      </section>

      <section aria-label={sectionLabel} className="journal-listing-section relative isolate px-[5.208vw] pb-28 pt-16 md:pt-0">
        <div
          aria-hidden="true"
          className="editorial-contact-transition pointer-events-none absolute inset-x-0 bottom-0 z-0"
        />
        <div className="relative z-10">
        {listingHeading ? (
          <Reveal className="editorial-listing-heading mx-auto flex max-w-[81rem] items-center gap-5 pb-16 pt-20">
            <h2 className="shrink-0 font-display text-[clamp(1.6rem,2.3vw,2.25rem)] font-light text-[var(--editorial-card-title-color)]">
              {listingHeading}
            </h2>
            <span className="editorial-heading-line h-px flex-1 origin-left bg-current opacity-20" />
            <span aria-hidden="true" className="size-3 bg-[var(--editorial-accent-color)]" />
          </Reveal>
        ) : null}
        <JournalGrid
          articles={items}
          emptyMessage={emptyMessage}
          loadMoreLabel={loadMoreLabel}
          variant={variant}
        />
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
}

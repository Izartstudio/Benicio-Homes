import { EditorialHeroComposition } from "@/components/editorial-hero/editorial-hero-composition";
import { OptimizedImage as Image } from "@/components/ui/optimized-image";

export function HeroFinalComposition() {
  return (
    <EditorialHeroComposition
      alignMarkerToImageCenter
      embedded
      sectionName="homepage-hero-composition"
      title={
        <Image
          alt="Benicio"
          height={218}
          sizes="(max-width: 767px) 68vw, (max-width: 1023px) 45vw, 640px"
          src="/assets/projects/wordmark.png"
          width={1637}
        />
      }
      titleId="homepage-hero-title"
      titleVariant="wordmark"
    />
  );
}

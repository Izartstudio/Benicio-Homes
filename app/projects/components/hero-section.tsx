import type { ProjectHeroData, ProjectIntroData } from "@/app/projects/data";
import { ProjectHeroSequence } from "@/components/project-detail/project-hero";

type HeroSectionProps = {
  data: ProjectHeroData;
  intro: ProjectIntroData;
};

export function HeroSection({ data, intro }: HeroSectionProps) {
  return (
    <ProjectHeroSequence
      continuationStatement={intro.intro}
      description={data.description}
      layout={data.layout}
      media={{
        background: data.image,
        focalPosition: data.mediaCanvas.focalPosition,
        foreground: data.foregroundImage,
        foregroundCanvasHeightRatio:
          data.mediaCanvas.foregroundCanvasHeightRatio,
        mediaAspectRatio: data.mediaCanvas.aspectRatio,
      }}
      title={data.title}
      titleLayer={data.titleLayer}
      variant={data.variant}
    />
  );
}

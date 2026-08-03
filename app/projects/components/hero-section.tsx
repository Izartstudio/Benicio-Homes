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
        continuation: intro.backgroundImage,
        foreground: data.foregroundImage,
        scale: data.mediaScale,
        objectPosition: data.objectPosition,
      }}
      title={data.title}
    />
  );
}

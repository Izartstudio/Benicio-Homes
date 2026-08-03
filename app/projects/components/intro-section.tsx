import type { ProjectIntroData } from "@/app/projects/data";
import { ProjectIntroSection } from "@/components/project-detail/project-intro-section";

type IntroSectionProps = {
  data: ProjectIntroData;
};

export function IntroSection({ data }: IntroSectionProps) {
  return (
    <ProjectIntroSection
      backgroundImage={data.backgroundImage}
      intro={data.intro}
    />
  );
}

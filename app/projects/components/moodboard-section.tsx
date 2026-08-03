import type { ProjectMoodboardData } from "@/app/projects/data";
import { ProjectMoodboardSection } from "@/components/project-detail/project-moodboard-section";

type MoodboardSectionProps = {
  data: ProjectMoodboardData;
};

export function MoodboardSection({ data }: MoodboardSectionProps) {
  return (
    <ProjectMoodboardSection
      description={data.description}
      desktopImage={data.desktopImage}
      mobileImage={data.mobileImage}
    />
  );
}

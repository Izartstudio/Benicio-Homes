import type { ProjectLocationData } from "@/app/projects/data";
import { ProjectLocationSection } from "@/components/project-detail/project-location-section";

type LocationSectionProps = {
  data: ProjectLocationData;
};

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <ProjectLocationSection
      decorativeImage={data.decorativeImage}
      description={data.description}
      featureImage={data.featureImage}
      location={data.location}
    />
  );
}

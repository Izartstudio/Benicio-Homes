import type { ProjectSpecificationsData } from "@/app/projects/data";
import { ProjectSpecificationsSection } from "@/components/project-detail/project-specifications-section";

type SpecificationSectionProps = {
  data: ProjectSpecificationsData;
};

export function SpecificationSection({
  data,
}: SpecificationSectionProps) {
  return <ProjectSpecificationsSection groups={data.groups} />;
}

import type { ProjectArchitectureImageData } from "@/app/projects/data";
import { ProjectSiteShowcaseSection } from "@/components/project-detail/project-site-showcase-section";

type ArchitectureImageSectionProps = {
  data: ProjectArchitectureImageData;
};

export function ArchitectureImageSection({
  data,
}: ArchitectureImageSectionProps) {
  return (
    <ProjectSiteShowcaseSection
      cta={data.cta}
      description={data.description}
      heading={data.heading}
      image={data.image}
    />
  );
}

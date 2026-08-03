import type { ProjectNextProjectData } from "@/app/projects/data";
import { NextProjectHighlight } from "@/components/project-detail/next-project-highlight";

type NextProjectSectionProps = {
  data: ProjectNextProjectData;
};

export function NextProjectSection({ data }: NextProjectSectionProps) {
  return (
    <NextProjectHighlight
      ctaHref={data.ctaHref}
      ctaLabel={data.ctaLabel}
      description={data.description}
      image={data.image}
      title={data.title}
    />
  );
}

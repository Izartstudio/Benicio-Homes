import type {
  ProjectFloorPlanData,
  ProjectFloorPlanLayout,
} from "@/app/projects/data";
import { ProjectFloorPlanSection } from "@/components/project-detail/project-floor-plan-section";
import { ProjectStackedFloorPlanSection } from "@/components/project-detail/project-stacked-floor-plan-section";
import { Fragment } from "react";

type FloorPlanSectionProps = {
  data: ProjectFloorPlanData;
};

export function FloorPlanSection({ data }: FloorPlanSectionProps) {
  return (
    <ProjectFloorPlanSection
      description={data.description}
      footerLabel={data.footerLabel}
      leftDrawing={data.leftDrawing}
      mirrored={data.mirrored}
      rightDrawing={data.rightDrawing}
      specifications={data.specifications}
      villaLabel={data.villaLabel}
    />
  );
}

type FloorPlanCollectionProps = {
  layout: ProjectFloorPlanLayout;
  plans: readonly ProjectFloorPlanData[];
};

export function FloorPlanCollection({
  layout,
  plans,
}: FloorPlanCollectionProps) {
  if (layout === "stacked-two" || layout === "stacked-three") {
    return (
      <>
        <ProjectStackedFloorPlanSection plans={plans} variant={layout} />
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-30 h-[0.09375rem] w-full bg-white"
          data-project-floor-plan-section-divider
        />
      </>
    );
  }

  return plans.map((floorPlan, floorPlanIndex) => (
    <Fragment key={`${floorPlan.villaLabel}-${floorPlanIndex}`}>
      <FloorPlanSection data={floorPlan} />
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-30 h-[0.09375rem] w-full bg-white"
        data-project-floor-plan-section-divider
      />
    </Fragment>
  ));
}

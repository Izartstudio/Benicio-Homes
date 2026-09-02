import { cn } from "@/utils/cn";

type SectionCrosshairProps = {
  className?: string;
  showMarker?: boolean;
};

export function SectionCrosshair({
  className,
  showMarker = false,
}: SectionCrosshairProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(className)}
      data-section-crosshair
    >
      <i /><i /><i /><i /><i /><i />
      {showMarker ? <b data-crosshair-marker /> : null}
    </div>
  );
}

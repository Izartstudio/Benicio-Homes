import { cn } from "@/utils/cn";

const stairVariants = {
  ascending: [
    {
      id: "stair-01",
      className: "left-0 top-0 h-[49%] w-[98.611%]",
    },
    {
      id: "stair-02",
      className: "left-0 top-[49%] h-[7.857%] w-[79.653%]",
    },
    {
      id: "stair-03",
      className: "left-0 top-[56.857%] h-[4.857%] w-[34.097%]",
    },
    {
      id: "stair-04",
      className: "left-0 top-[61.714%] h-[17.286%] w-[27.708%]",
    },
  ],
  descending: [
    {
      id: "stair-01",
      className: "left-0 top-[30.4%] h-[69.6%] w-[20.35%]",
    },
    {
      id: "stair-02",
      className: "left-[20.35%] top-[38.3%] h-[61.7%] w-[45.49%]",
    },
    {
      id: "stair-03",
      className: "left-[65.84%] top-[42.9%] h-[57.1%] w-[5.76%]",
    },
    {
      id: "stair-04",
      className: "left-[71.6%] top-[57.1%] h-[42.9%] w-[28.4%]",
    },
  ],
  practice: [
    {
      id: "stair-01",
      className: "left-0 top-0 h-full w-[56%]",
    },
    {
      id: "stair-02",
      className: "left-[56%] top-[12.5%] h-[87.5%] w-[40.5%]",
    },
  ],
  "practice-mobile": [
    {
      id: "stair-01",
      className: "left-0 top-[1.25rem] h-[calc(100%_-_1.25rem)] w-full",
    },
    {
      id: "stair-02",
      className: "left-0 top-0 h-full w-[58%]",
    },
  ],
  journal: [],
} as const;

type ArchitecturalStairsProps = {
  className?: string;
  stairClassName?: string;
  variant?: keyof typeof stairVariants;
};

export function ArchitecturalStairs({
  className,
  stairClassName,
  variant = "ascending",
}: ArchitecturalStairsProps) {
  const stairs = stairVariants[variant];

  if (variant === "journal") {
    return (
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 z-10", className)}
        data-architectural-stairs
        data-stair-variant="journal"
      >
        <div
          className={cn(
            "absolute inset-0 [clip-path:polygon(0_74.6966%,27.7083%_74.6966%,27.7083%_53.5529%,34.1667%_53.5529%,34.1667%_47.8336%,79.6528%_47.8336%,79.6528%_38.1284%,98.6111%_38.1284%,98.6111%_0,100%_0,100%_100%,0_100%)]",
            stairClassName ?? "bg-charcoal",
          )}
          data-architectural-stair="journal-stairs"
          data-stair-index="1"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 z-10", className)}
      data-architectural-stairs
      data-stair-variant={variant}
    >
      {stairs.map((stair, index) => (
        <div
          key={stair.id}
          className={cn(
            "absolute",
            stairClassName ?? "bg-charcoal",
            stair.className,
          )}
          data-architectural-stair={stair.id}
          data-stair-index={index + 1}
        />
      ))}
    </div>
  );
}

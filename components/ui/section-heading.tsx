import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <p className="mb-5 text-kicker font-bold uppercase tracking-[0.24em] text-clay">
        {eyebrow}
      </p>
      <h2 className="font-display text-display font-semibold text-balance">
        {title}
      </h2>
    </div>
  );
}

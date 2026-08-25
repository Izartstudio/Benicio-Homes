import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

type OrangeBlockProps = Omit<
  ComponentPropsWithoutRef<typeof Image>,
  "src" | "alt" | "width" | "height"
>;

/** Shared decorative laterite marker used throughout the homepage. */
export function OrangeBlock({ className, ...props }: OrangeBlockProps) {
  return (
    <Image
      {...props}
      alt=""
      aria-hidden="true"
      draggable={false}
      height={20.83}
      src="/assets/blocks/orange-block.svg"
      width={20.83}
      className={cn(
        "pointer-events-none h-[20.83px] w-[20.83px] max-w-none shrink-0 select-none object-contain [-webkit-user-drag:none] [aspect-ratio:1/1] max-md:h-[10px] max-md:w-[10px]",
        className,
      )}
    />
  );
}

import { cn } from "@/utils/cn";
import { DifferenceText } from "@/components/ui/difference-text";
import type { HTMLAttributes, ReactNode } from "react";

type ImageBlendHeadingProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function ImageBlendHeading({
  children,
  className,
  ...props
}: ImageBlendHeadingProps) {
  return (
    <DifferenceText
      as="p"
      className={cn(
        "font-display text-[10rem] font-light uppercase leading-[1.35] tracking-[0] mix-blend-difference",
        className,
      )}
      {...props}
    >
      {children}
    </DifferenceText>
  );
}

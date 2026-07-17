import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "dark" | "light";
};

export function ButtonLink({
  className,
  variant = "dark",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-soft border px-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
        variant === "dark" &&
          "border-ink bg-ink text-bone hover:bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        variant === "light" &&
          "border-bone/70 bg-bone text-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone",
        className,
      )}
      {...props}
    />
  );
}

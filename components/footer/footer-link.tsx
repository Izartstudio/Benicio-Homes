import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type FooterLinkProps = ComponentProps<typeof Link>;

export function FooterLink({ className, ...props }: FooterLinkProps) {
  return (
    <Link
      className={cn(
        "inline-block text-[#575757] transition-colors duration-300 ease-out hover:text-[#D45231] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D45231]",
        className,
      )}
      {...props}
    />
  );
}

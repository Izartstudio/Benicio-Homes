import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ContactTextureSurfaceProps = HTMLAttributes<HTMLDivElement>;

/** The full-section surface shared by the Journal and Contact sections. */
export function ContactTextureSurface({
  className,
  ...props
}: ContactTextureSurfaceProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 select-none bg-cover bg-center bg-no-repeat md:bg-[length:100%_100%]",
        className,
      )}
      style={{
        backgroundImage: 'url("/assets/textures/contact-texture.webp")',
        ...props.style,
      }}
    />
  );
}

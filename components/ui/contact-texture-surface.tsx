import type { HTMLAttributes } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
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
        "pointer-events-none absolute inset-0 z-0 select-none overflow-hidden",
        className,
      )}
    >
      <OptimizedImage
        alt=""
        className="object-cover object-center md:object-fill"
        fill
        quality={75}
        sizes="100vw"
        src="/assets/textures/contact-texture.webp"
      />
    </div>
  );
}

import type { ComponentPropsWithRef } from "react";
import { cn } from "@/utils/cn";
import { PDP_TEXTURE_URL } from "./pdp-texture";

type ProjectTitleTextureProps = ComponentPropsWithRef<"h1">;

const titleTextureStyle = {
  backgroundColor: "var(--color-bone)",
  backgroundImage: `url('${PDP_TEXTURE_URL}')`,
  backgroundOrigin: "padding-box",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  marginBlockStart: "-0.08em",
  paddingBlockStart: "0.08em",
  // Keep the final glyph inside the background-paint box. WebKit can clip the
  // textured edge of wide display type when the glyph sits close to the box.
  paddingInlineEnd: "0.12em",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
} as const;

/** A stable, shared texture treatment for PDP hero titles. */
export function ProjectTitleTexture({
  className,
  style,
  ...props
}: ProjectTitleTextureProps) {
  return (
    <h1
      {...props}
      className={cn("isolate", className)}
      style={{ ...titleTextureStyle, ...style }}
    />
  );
}

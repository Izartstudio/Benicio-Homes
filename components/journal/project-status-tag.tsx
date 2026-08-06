import type { CSSProperties } from "react";
import { getCdnAsset } from "@/lib/getCdnAsset";

export type ProjectStatus = "for-sale" | "ongoing" | "sold-out";

const statusConfig: Record<
  ProjectStatus,
  { backgroundColor: string; label: string; texture: string }
> = {
  "for-sale": {
    backgroundColor: "",
    label: "For Sale",
    texture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/Tag-forsale.webp",
  },
  ongoing: {
    backgroundColor: "",
    label: "On Going",
    texture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/Tag-ongoing.webp",
  },
  "sold-out": {
    backgroundColor: "",
    label: "Sold Out",
    texture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/Tag-soldout.webp",
  },
};

export function ProjectStatusTag({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  const texture = getCdnAsset(config.texture);
  const style = {
    backgroundColor: config.backgroundColor,
    backgroundImage: texture ? `url("${texture}")` : "none",
  } as CSSProperties;

  return (
    <span
      className="inline-flex min-h-[3.25rem] min-w-[8.25rem] items-center justify-center bg-cover bg-center bg-no-repeat bg-blend-overlay px-5 font-display text-sm font-semibold uppercase text-white"
      data-project-status={status}
      style={style}
    >
      {config.label}
    </span>
  );
}

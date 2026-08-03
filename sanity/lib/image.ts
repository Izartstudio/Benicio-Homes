import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { isSanityConfigured, sanityDataset, sanityProjectId } from "./env";

const imageBuilder = isSanityConfigured
  ? createImageUrlBuilder({
      projectId: sanityProjectId!,
      dataset: sanityDataset!,
    })
  : null;

export function getJournalImageUrl(
  source: SanityImageSource | null | undefined,
) {
  if (!imageBuilder || !source) {
    return null;
  }

  return imageBuilder
    .image(source)
    .width(800)
    .height(864)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();
}

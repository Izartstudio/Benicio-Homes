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

export function getJournalDetailImageUrl(
  source: SanityImageSource | null | undefined,
) {
  if (!imageBuilder || !source) return null;

  return imageBuilder
    .image(source)
    .width(1800)
    .fit("max")
    .auto("format")
    .quality(88)
    .url();
}

export function getTeamMemberImageUrl(
  source: SanityImageSource | null | undefined,
) {
  if (!imageBuilder || !source) return null;

  return imageBuilder
    .image(source)
    .width(900)
    .height(960)
    .fit("crop")
    .auto("format")
    .quality(88)
    .url();
}

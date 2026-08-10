// These identifiers are public. Keep the deployed website aligned with the
// Studio defaults even when a hosting provider omits the optional env values.
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "jio3xvjs";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-27";

export const isSanityConfigured = Boolean(
  sanityProjectId && sanityDataset && sanityApiVersion,
);

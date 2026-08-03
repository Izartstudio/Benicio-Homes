import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import { getCdnAsset } from "@/lib/getCdnAsset";

function resolvePdpAsset(objectKey: string) {
  return getCdnAsset(objectKey) ?? objectKey;
}

export const PDP_MEDIA_URLS = {
  concreteTexture: resolvePdpAsset(PROJECT_MEDIA.shared.concreteTexture),
  nextProjectTexture: resolvePdpAsset(PROJECT_MEDIA.shared.nextProjectTexture),
  orangeBlock: resolvePdpAsset(PROJECT_MEDIA.shared.orangeBlock),
  texture: resolvePdpAsset(PROJECT_MEDIA.shared.pdpTexture),
} as const;

export const PDP_TEXTURE_URL = PDP_MEDIA_URLS.texture;

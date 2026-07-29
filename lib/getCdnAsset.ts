/**
 * Resolves a Cloudflare CDN object key to its public URL.
 *
 * Absolute URLs are intentionally left untouched so Sanity Journal images and
 * externally hosted media continue to work without a second URL abstraction.
 */
export function getCdnAsset(pathOrUrl?: string | null): string | null {
  const value = pathOrUrl?.trim();

  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL?.trim().replace(/\/+$/, "");

  // Retaining the supplied path makes local development safe before a CDN URL
  // is configured; production builds resolve relative object keys through R2.
  if (!cdnUrl) {
    return value;
  }

  return `${cdnUrl}/${value.replace(/^\/+/, "")}`;
}

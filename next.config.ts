import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const r2PublicUrl = process.env.R2_PUBLIC_URL;
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

function getRemotePattern(urlValue: string | undefined, variableName: string): RemotePattern[] {
  if (!urlValue) {
    return [];
  }

  const url = new URL(urlValue);
  const basePath = url.pathname.replace(/\/$/, "");
  const protocol = url.protocol.replace(":", "");

  if (protocol !== "http" && protocol !== "https") {
    throw new Error(`${variableName} must use the http or https protocol.`);
  }

  return [
    {
      hostname: url.hostname,
      pathname: `${basePath || ""}/**`,
      port: url.port,
      protocol,
    },
  ];
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    // Extra small responsive candidates prevent phones and compact cards from
    // downloading a 640px image when a 320/480px source is sufficient.
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    qualities: [75, 85, 90],
    remotePatterns: [
      // Keep the server-side upload public URL supported for existing uploads.
      ...getRemotePattern(r2PublicUrl, "R2_PUBLIC_URL"),
      // Frontend media is resolved through lib/getCdnAsset.ts.
      ...getRemotePattern(cdnUrl, "NEXT_PUBLIC_CDN_URL"),
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
        protocol: "https",
      },
    ],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

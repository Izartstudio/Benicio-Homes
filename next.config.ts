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
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.benicio.co.in" }], destination: "https://benicio.co.in/:path*", permanent: true },
      {"source": "/about-us", "destination": "/the-practice", "permanent": true},
      {"source": "/vanam-villa", "destination": "/projects/vanam-villas", "permanent": true},
      {"source": "/majorda-villas", "destination": "/projects/nayan-villa", "permanent": true},
      {"source": "/zen-villa", "destination": "/projects/zen-villa-1", "permanent": true},
      {"source": "/blogs", "destination": "/journal", "permanent": true},
      {"source": "/contact", "destination": "/#contact", "permanent": true},
      {"source": "/terms-and-conditions", "destination": "/terms", "permanent": true},
      {"source": "/privacy-policy", "destination": "/privacy", "permanent": true},
      {"source": "/the-foundation-of-benicio-homes-trust-transparency", "destination": "/the-practice", "permanent": true},
      {"source": "/journal/Journal004", "destination": "/journal/restoring-heritage-homes-in-goa", "permanent": true},
      {"source": "/wp-content/uploads/2024/11/Vanam-Villa-E-Brochure-2.pdf", "destination": "/assets/pdf/vanam-villas.pdf", "permanent": true},
    ];
  },
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
    // Avoid a corrupt local disk-cache entry blocking image requests in dev.
    // Production keeps Next's normal image disk cache.
    maximumDiskCacheSize: process.env.NODE_ENV === "development" ? 0 : undefined,
    // Extra small responsive candidates prevent phones and compact cards from
    // downloading a 640px image when a 320/480px source is sufficient.
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/avif", "image/webp"],
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

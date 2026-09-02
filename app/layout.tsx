import type { Metadata } from "next";
import Script from "next/script";
import { Roboto_Serif, Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar/navbar";
import { CameraDepthMotion } from "@/components/providers/camera-depth-motion";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const bahnschrift = localFont({
  src: "./fonts/bahnschrift.ttf",
  variable: "--font-bahnschrift",
  weight: "300 700",
  display: "swap",
});

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://benicio.co.in/#website",
      name: "Benicio Homes",
      url: "https://benicio.co.in",
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://benicio.co.in/#organization",
      name: "Benicio Homes",
      url: "https://benicio.co.in",
      logo: "https://benicio.co.in/assets/NavBar/Logo-NavBar-colored.svg",
      image: "https://benicio.co.in/assets/projects/bgvanam.png",
      email: "info@benicio.co.in",
      telephone: "+91 90218 29812",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Porvorim",
        addressRegion: "Goa",
        postalCode: "403501",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Goa, India",
      },
      sameAs: ["https://www.instagram.com/benicio_homes_/"],
    },
  ],
};

export const metadata: Metadata = {
  title: "Benicio homes | Tropical Designer Homes in Goa",
  description:
    "Benicio is a Goa-based real estate developer creating tropical designer homes defined by raw materials, brutalist influences, and a distinct architectural point of view.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        type: "image/png",
        url: "/benicio-favicon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
        url: "/benicio-favicon-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL?.trim().replace(/\/+$/, "");
  const mediaOrigins = Array.from(new Set([
    cdnUrl,
    "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev",
    "https://image.mux.com",
    "https://stream.mux.com",
  ].filter((origin): origin is string => Boolean(origin))));

  return (
    <html data-scroll-behavior="smooth" lang="en">
      <head>
        <Script id="manual-scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in history) history.scrollRestoration = "manual";`}
        </Script>
        {mediaOrigins.map((origin) => (
          <link crossOrigin="anonymous" href={origin} key={`preconnect-${origin}`} rel="preconnect" />
        ))}
        {mediaOrigins.map((origin) => (
          <link href={origin} key={`dns-prefetch-${origin}`} rel="dns-prefetch" />
        ))}
      </head>
      <body className={`${bahnschrift.className} ${bahnschrift.variable} ${robotoSlab.variable} ${robotoSerif.variable} antialiased`}>
        <Script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c"),
          }}
          id="benicio-structured-data"
          type="application/ld+json"
        />
        <LenisProvider>
          <CameraDepthMotion />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

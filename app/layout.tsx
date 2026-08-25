import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Benicio Residences",
  description:
    "A premium real estate storytelling website foundation for Benicio Residences.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        {mediaOrigins.map((origin) => (
          <link crossOrigin="anonymous" href={origin} key={`preconnect-${origin}`} rel="preconnect" />
        ))}
        {mediaOrigins.map((origin) => (
          <link href={origin} key={`dns-prefetch-${origin}`} rel="dns-prefetch" />
        ))}
      </head>
      <body className={`${bahnschrift.className} ${bahnschrift.variable} ${robotoSlab.variable} ${robotoSerif.variable} antialiased`}>
        <LenisProvider>
          <CameraDepthMotion />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto_Serif, Roboto_Slab } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar/navbar";
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

  return (
    <html data-scroll-behavior="smooth" lang="en">
      {cdnUrl ? (
        <head>
          <link crossOrigin="anonymous" href={cdnUrl} rel="preconnect" />
          <link href={cdnUrl} rel="dns-prefetch" />
        </head>
      ) : null}
      <body className={`${bahnschrift.variable} ${robotoSlab.variable} ${robotoSerif.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

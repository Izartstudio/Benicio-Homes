import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
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
    <html lang="en">
      {cdnUrl ? (
        <head>
          <link crossOrigin="anonymous" href={cdnUrl} rel="preconnect" />
          <link href={cdnUrl} rel="dns-prefetch" />
        </head>
      ) : null}
      <body className={`${bahnschrift.variable} ${robotoSlab.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

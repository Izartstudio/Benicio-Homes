import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Navbar } from "@/components/navbar/navbar";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bahnschrift = localFont({
  src: "./fonts/bahnschrift.ttf",
  variable: "--font-bahnschrift",
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
  return (
    <html lang="en">
      <body className={`${bahnschrift.variable} ${ibmPlexMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

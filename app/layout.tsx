import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Canopy — Indoor plants on promo",
  description:
    "Canopy sells thoughtfully chosen indoor plants with seasonal promo pricing. Browse the catalogue and reserve your next green companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${dmSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel='preconnect' href='https://images.unsplash.com' />
        <link rel='dns-prefetch' href='https://images.unsplash.com' />
      </head>
      <body className='min-h-full flex flex-col font-sans'>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

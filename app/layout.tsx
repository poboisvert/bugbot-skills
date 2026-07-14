import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { getSiteUrl } from "@/lib/site";
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
  metadataBase: new URL(getSiteUrl()),
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
        {/*
          runtime Google Fonts download (DNS + CSS + many woff2 files)
          instead of next/font self-hosting. Multiple families/weights block render.
        */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=block'
        />
      </head>
      <body className='min-h-full flex flex-col font-sans'>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

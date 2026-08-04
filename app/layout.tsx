import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Crochet Charm | Handmade Crochet Gifts & Bouquets",
  description:
    "Shop premium handmade crochet bouquets, flowers, keychains, hair accessories and personalized gifts. Custom crochet orders available across India.",

  keywords: [
    "crochet",
    "handmade gifts",
    "crochet bouquet",
    "crochet flowers",
    "crochet keychain",
    "crochet hair accessories",
    "custom crochet gifts",
    "The Crochet Charm",
    "crochet India",
  ],

  authors: [{ name: "The Crochet Charm" }],

  creator: "The Crochet Charm",

  metadataBase: new URL("https://the-crochet-charm-next.vercel.app"),

  openGraph: {
    title: "The Crochet Charm",
    description:
      "Premium Handmade Crochet Gifts & Bouquets.",
    url: "https://the-crochet-charm-next.vercel.app",
    siteName: "The Crochet Charm",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Crochet Charm",
    description:
      "Premium Handmade Crochet Gifts & Bouquets",
    images: ["/images/logo.png"],
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Crochet Charm | Handmade Crochet Gifts & Bouquets",
  description:
    "Shop premium handmade crochet bouquets, flowers, keychains, hair accessories and personalized gifts. Custom crochet orders available across India.",

  keywords: [
    "crochet",
    "handmade gifts",
    "crochet bouquet",
    "crochet flowers",
    "crochet keychain",
    "crochet hair accessories",
    "custom crochet gifts",
    "The Crochet Charm",
  ],

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://the-crochet-charm-next.vercel.app"),

  openGraph: {
    title: "The Crochet Charm",
    description: "Premium Handmade Crochet Gifts & Bouquets",
    url: "https://the-crochet-charm-next.vercel.app",
    siteName: "The Crochet Charm",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Crochet Charm",
    description: "Premium Handmade Crochet Gifts & Bouquets",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="min-h-full flex flex-col">
  <main className="flex-1">
    {children}
  </main>

  <Script src="https://checkout.razorpay.com/v1/checkout.js" />
</body>
    </html>
  );
}

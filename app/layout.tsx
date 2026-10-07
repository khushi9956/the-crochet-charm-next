import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import {
  ORGANIZATION_JSON_LD,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  serializeJsonLd,
} from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HOME_TITLE = `${SITE_NAME} | Handmade Crochet Bouquets, Gifts & Keychains`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Only the homepage inherits this canonical — every other route declares its
  // own, so no page ever points at the homepage by accident.
  alternates: {
    canonical: "/",
  },

  // `template` only applies to child segments, so the homepage falls back to
  // `default`.
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  keywords: [
    "crochet",
    "handmade gifts",
    "crochet bouquet",
    "crochet flowers",
    "crochet keychain",
    "crochet hair accessories",
    "crochet pouches",
    "custom crochet gifts",
    "handmade crochet India",
    "crochet gifts India",
    "The Crochet Charm",
  ],

  category: "shopping",

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  verification: {
    google: "sgF4PuKskRteLC1UNuG1dayioUqNth5WnNcVnuhas6c",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      > <head>
   <meta name="google-site-verification" content="ltkZGTXdIW1ZLh2ZMAlZLNZ9Cfp_Md2YV5_hKvOO5HI" />
  </head>

        <body className="min-h-full flex flex-col">
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd(ORGANIZATION_JSON_LD),
            }}
          />

          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          <GoogleAnalytics gaId="G-0C5LF2GLS2" />
        </body>
      </html>
    </ClerkProvider>
  );
}
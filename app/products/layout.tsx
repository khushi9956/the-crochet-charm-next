import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

const TITLE = "Handmade Crochet Bouquets & Keychains";

const DESCRIPTION =
  "Browse handmade crochet bouquets, keychains, hair accessories and personalized gifts from The Crochet Charm. Handcrafted in India and delivered nationwide.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/products",
});

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
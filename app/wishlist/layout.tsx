import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/wishlist",
  title: "My Wishlist",
  description: "The handmade crochet items saved to your wishlist.",
});

export default function WishlistLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
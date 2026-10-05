import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/cart",
  title: "Shopping Cart",
  description: "Review the handmade crochet items in your shopping cart.",
});

export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
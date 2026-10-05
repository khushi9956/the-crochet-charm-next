import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/my-orders",
  title: "My Orders",
  description: "Track the status of your handmade crochet orders.",
});

export default function MyOrdersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
import type { Metadata } from "next";
import { noIndexMetadata } from "../../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/order/[orderNumber]",
  title: "Order Details",
  description: "Details and status of your order.",
});

export default function OrderDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/success",
  title: "Order Confirmation",
  description: "Your order has been placed.",
});

export default function SuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
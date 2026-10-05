import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "Refund terms for handmade crochet orders from The Crochet Charm: requests within 48 hours of delivery, photos required, refunds in 7 business days.",
  path: "/refund-policy",
});

export default function RefundPolicyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
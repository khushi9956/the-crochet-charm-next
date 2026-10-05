import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/clerk-test",
  title: "Clerk Test",
  description: "Internal authentication test page.",
});

export default function ClerkTestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
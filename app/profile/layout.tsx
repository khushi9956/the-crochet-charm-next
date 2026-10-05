import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/profile",
  title: "My Profile",
  description: "Your profile, orders and saved items.",
});

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
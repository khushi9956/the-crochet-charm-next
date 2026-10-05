import type { Metadata } from "next";
import { noIndexMetadata } from "../lib/seo";

export const metadata: Metadata = noIndexMetadata({
  path: "/signup",
  title: "Create Account",
  description: "Create a free account to check out faster and track your orders.",
});

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
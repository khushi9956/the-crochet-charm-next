import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

// Private / user-specific routes. Everything else — the homepage, /products,
// /products/[id] and the public policy pages — stays crawlable.
const PRIVATE_PATHS = [
  "/api/",
  "/account",
  "/cart",
  "/checkout",
  "/clerk-test",
  "/login",
  "/my-orders",
  "/order/",
  "/profile",
  "/signup",
  "/success",
  "/wishlist",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
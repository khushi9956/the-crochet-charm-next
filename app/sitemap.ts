import type { MetadataRoute } from "next";
import { absoluteUrl, getProductsForSitemap, SITE_URL } from "./lib/seo";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: absoluteUrl("/products"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: absoluteUrl("/shipping-policy"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: absoluteUrl("/refund-policy"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: absoluteUrl("/privacy-policy"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: absoluteUrl("/terms"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProductsForSitemap();

  // The API exposes no `updated_at` field, so `lastModified` is omitted for
  // product URLs rather than reporting a date we cannot verify.
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...STATIC_ROUTES, ...productRoutes];
}
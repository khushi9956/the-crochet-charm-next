import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://the-crochet-charm-next.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://the-crochet-charm-next.vercel.app/products",
      lastModified: new Date(),
    },
    {
      url: "https://the-crochet-charm-next.vercel.app/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://the-crochet-charm-next.vercel.app/shipping-policy",
      lastModified: new Date(),
    },
    {
      url: "https://the-crochet-charm-next.vercel.app/refund-policy",
      lastModified: new Date(),
    },
    {
      url: "https://the-crochet-charm-next.vercel.app/terms",
      lastModified: new Date(),
    },
  ];
}
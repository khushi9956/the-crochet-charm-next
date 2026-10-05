import type { Metadata } from "next";

export const SITE_URL = "https://the-crochet-charm-next.vercel.app";
export const SITE_NAME = "The Crochet Charm";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const API_TIMEOUT_MS = 8000;
const API_REVALIDATE_SECONDS = 3600;

export const OG_IMAGE = {
  url: "/images/logo.png",
  width: 1254,
  height: 1254,
  alt: "The Crochet Charm — handmade crochet bouquets, gifts and accessories",
};

export const SITE_DESCRIPTION =
  "Browse handmade crochet bouquets, keychains, hair accessories and personalized gifts from The Crochet Charm. Handcrafted in India and delivered nationwide.";

export const TITLE_SUFFIX = SITE_NAME;

/**
 * Complete metadata for a private / user-specific route.
 *
 * Metadata merging is shallow, so setting `robots` here fully replaces the
 * permissive site-wide block. The route also declares its own canonical and
 * social tags so it never inherits them from an ancestor segment.
 */
export function noIndexMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const fullTitle = composeTitle(title);

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export type SeoProduct = {
  id: number | string;
  name: string;
  price: number | string;
  image?: string | null;
  description?: string | null;
};

function composeTitle(title: string) {
  return `${title} | ${TITLE_SUFFIX}`;
}

/**
 * Builds a consistent metadata object for a public, indexable route.
 * `path` must be the absolute route path (for example `/shipping-policy`) and
 * is resolved against `metadataBase` from the root layout.
 */
type OgImage = { url: string; width?: number; height?: number; alt?: string };

export function pageMetadata({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: OgImage | OgImage[];
}): Metadata {
  const fullTitle = composeTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: images ?? [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

/** Product images may be absolute (Cloudinary) or API-relative paths. */
export function absoluteImageUrl(image?: string | null) {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  if (!API_URL) return null;
  return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

/** Truncates on a word boundary so meta descriptions stay readable. */
export function truncate(value: string, maxLength: number) {
  const text = collapseWhitespace(value);
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/** Title-cases a product name without altering the words themselves. */
export function titleCaseProductName(name: string) {
  return collapseWhitespace(name)
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word
        .split("-")
        .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
        .join("-")
    )
    .join(" ");
}

export function productDisplayName(product: SeoProduct) {
  return titleCaseProductName(product.name) || SITE_NAME;
}

export function productMetaDescription(product: SeoProduct) {
  const name = productDisplayName(product);
  const excerpt = product.description
    ? truncate(product.description, 105)
    : "";

  const lead = excerpt
    ? `${excerpt} `
    : "A handcrafted piece, made slowly and with care. ";

  return truncate(
    `Shop ${name} from ${SITE_NAME}. ${lead}Handmade crochet gifts delivered across India.`,
    158
  );
}

/**
 * Fetches a single product for metadata / structured data.
 * Returns `null` instead of throwing so an unavailable API can never break a
 * page render or the production build.
 */
export async function getProduct(
  id: string | number
): Promise<SeoProduct | null> {
  if (!API_URL) return null;

  try {
    const response = await fetch(
      `${API_URL}/api/products/${encodeURIComponent(String(id))}/`,
      {
        next: { revalidate: API_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(API_TIMEOUT_MS),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || typeof data !== "object" || !data.name) return null;

    return data as SeoProduct;
  } catch {
    return null;
  }
}

/** Fetches the product list for the sitemap. Never throws. */
export async function getProductsForSitemap(): Promise<SeoProduct[]> {
  if (!API_URL) return [];

  try {
    const response = await fetch(`${API_URL}/api/products/`, {
      next: { revalidate: API_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return data.filter(
      (item): item is SeoProduct =>
        Boolean(item) && typeof item === "object" && Boolean(item.id) && Boolean(item.name)
    );
  } catch {
    return [];
  }
}

export function productJsonLd(product: SeoProduct) {
  const image = absoluteImageUrl(product.image);
  const price =
    typeof product.price === "string"
      ? Number(product.price.replace(/[^\d.]/g, ""))
      : product.price;

  const entry: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${absoluteUrl(`/products/${product.id}`)}#product`,
    name: productDisplayName(product),
    url: absoluteUrl(`/products/${product.id}`),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (image) entry.image = [image];
  if (product.description) {
    entry.description = truncate(product.description, 5000);
  }
  if (Number.isFinite(price)) {
    entry.offers = {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.id}`),
      priceCurrency: "INR",
      price: price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return entry;
}

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${OG_IMAGE.url}`,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
      },
      image: `${SITE_URL}${OG_IMAGE.url}`,
      description: SITE_DESCRIPTION,
      email: "thecrochetcharms@gmail.com",
      telephone: "+91-9519499698",
      sameAs: ["https://instagram.com/thecrochetcharms"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "thecrochetcharms@gmail.com",
          telephone: "+91-9519499698",
          areaServed: "IN",
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

/** Escapes `<` so JSON-LD payloads can never terminate the script tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
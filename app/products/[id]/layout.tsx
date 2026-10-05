import type { Metadata } from "next";
import {
  absoluteImageUrl,
  getProduct,
  OG_IMAGE,
  productDisplayName,
  productJsonLd,
  productMetaDescription,
  SITE_NAME,
  serializeJsonLd,
} from "../../lib/seo";

type ProductSegmentProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductSegmentProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    const title = "Product Not Found";
    const description = `This product is unavailable. Browse handmade crochet bouquets, keychains and gifts by ${SITE_NAME}.`;

    return {
      title,
      description,
      // Declared explicitly: omitting it would inherit the `/products`
      // listing canonical from the parent segment.
      alternates: {
        canonical: `/products/${id}`,
      },
      openGraph: {
        type: "website",
        url: `/products/${id}`,
        siteName: SITE_NAME,
        locale: "en_IN",
        title: `${title} | ${SITE_NAME}`,
        description,
        images: [OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${SITE_NAME}`,
        description,
        images: [OG_IMAGE.url],
      },
      robots: {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
    };
  }

  const name = productDisplayName(product);
  const description = productMetaDescription(product);
  const image = absoluteImageUrl(product.image);
  // The root `title.template` does not propagate into this segment, so the
  // brand suffix is composed here (and reused for OG/Twitter to avoid drift).
  const title = `${name} – Handmade Crochet | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      type: "website",
      url: `/products/${product.id}`,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: image
        ? [{ url: image, alt: `${name} – handmade crochet by ${SITE_NAME}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailsLayout({
  children,
  params,
}: ProductSegmentProps & { children: React.ReactNode }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      {product ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(productJsonLd(product)),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
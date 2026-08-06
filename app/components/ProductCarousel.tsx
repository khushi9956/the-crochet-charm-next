"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const API_URL = "https://the-crochet-charm-api.onrender.com/api/products/";
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1200;
const FETCH_TIMEOUT_MS = 12000;

async function fetchProductsWithRetry(
  attempt: number,
  signal: AbortSignal,
): Promise<any[]> {
  if (signal.aborted) return [];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const onParentAbort = () => controller.abort();
  signal.addEventListener("abort", onParentAbort);

  try {
    const res = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) return data;

    if (attempt < MAX_RETRIES - 1) {
      await new Promise((r) => setTimeout(r, BASE_DELAY_MS * Math.pow(2, attempt)));
      return fetchProductsWithRetry(attempt + 1, signal);
    }
    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError" && signal.aborted) return [];
    if (attempt < MAX_RETRIES - 1) {
      await new Promise((r) => setTimeout(r, BASE_DELAY_MS * Math.pow(2, attempt)));
      return fetchProductsWithRetry(attempt + 1, signal);
    }
    return [];
  } finally {
    signal.removeEventListener("abort", onParentAbort);
  }
}

export default function ProductCarousel() {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadProducts = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadFailed(false);

    fetchProductsWithRetry(0, controller.signal).then((data) => {
      if (controller.signal.aborted) return;
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        setLoadFailed(false);
      } else {
        setLoadFailed(true);
      }
      setLoading(false);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const cleanup = loadProducts();
    return cleanup;
  }, [loadProducts]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    let updated = [...wishlist];
    const exists = updated.find((item) => item.id === product.id);

    if (exists) {
      updated = updated.filter((item) => item.id !== product.id);
    } else {
      updated.push(product);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const displayProducts = products.slice(0, 4);

  return (
    <section id="products" className="products-section">
      <div className="products-inner">

        {/* Section Header */}
        <div className="products-eyebrow">
          <span className="products-eyebrow-line" aria-hidden="true" />
          <svg className="products-eyebrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A84F40" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 0 9 9" />
            <path d="M3 12a9 9 0 0 0 9 9" />
          </svg>
          <span className="products-eyebrow-text">CUSTOMER FAVORITES</span>
          <span className="products-eyebrow-line" aria-hidden="true" />
        </div>

        <h2 className="products-heading">
          Popular Products
        </h2>

        <p className="products-sub">
          Discover some of our most-loved handmade creations.
        </p>

        {/* Product Grid */}
        <div className="products-grid">
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="product-card" style={{ pointerEvents: "none" }}>
              <div className="product-card-img-wrap" style={{ background: "#f0e4d8", animation: "productsPulse 1.4s ease-in-out infinite" }} />
              <div className="product-card-info">
                <div style={{ width: "40%", height: 10, borderRadius: 4, background: "#ecdccb", marginBottom: 8 }} />
                <div style={{ width: "80%", height: 16, borderRadius: 4, background: "#ecdccb", marginBottom: 8 }} />
                <div style={{ width: "30%", height: 22, borderRadius: 4, background: "#ecdccb", marginBottom: 14 }} />
                <div style={{ width: "100%", height: 44, borderRadius: 8, background: "#ecdccb" }} />
              </div>
            </div>
          ))}

          {!loading && loadFailed && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 16px" }}>
              <p style={{ color: "#5F4A40", marginBottom: 12 }}>
                Unable to load products right now.
              </p>
              <button
                onClick={loadProducts}
                style={{
                  background: "#A84F40",
                  color: "#FFF9F3",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !loadFailed && displayProducts.map((product: any) => {
            const isWishlisted = wishlist.some((item: any) => item.id === product.id);
            const categoryName = typeof product.category === "string" 
              ? product.category 
              : product.category_name || product.category?.name || null;

            return (
              <div key={product.id} className="product-card">
                <div className="product-card-img-wrap">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                    />
                  </Link>
                  <button
                    className={`product-wishlist-btn ${isWishlisted ? "is-active" : ""}`}
                    onClick={(e) => toggleWishlist(e, product)}
                    aria-label="Add to wishlist"
                  >
                    {isWishlisted ? (
                      <FaHeart size={16} className="text-[#A84F40]" />
                    ) : (
                      <FaRegHeart size={16} className="text-[#A84F40]" />
                    )}
                  </button>
                </div>

                <div className="product-card-info">
                  {categoryName && (
                    <span className="product-card-category">
                      {categoryName.toUpperCase()}
                    </span>
                  )}
                  <h3 className="product-card-name">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-card-price">
                    &#8377;{product.price}
                  </div>

                  <Link href={`/products/${product.id}`} className="product-card-btn">
                    <span>View Product</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <div className="products-view-all-wrap">
          <div className="products-flourish" aria-hidden="true">
            <span className="products-flourish-line" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>

          <Link href="/products" className="products-view-all-btn">
            <span>View All Products</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <div className="products-flourish" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}>
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span className="products-flourish-line" />
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/nextjs";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const requireAuth = useCallback(() => {
    if (!isLoaded) return false;
    if (!isSignedIn) {
      router.push("/login");
      return false;
    }
    return true;
  }, [isLoaded, isSignedIn, router]);

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${product.name} is already in your cart.`,
        confirmButtonColor: "#A84F40",
      });
      return;
    }

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
      icon: "success",
      title: "Added to Cart 🛒",
      text: `${product.name} added successfully!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    if (!requireAuth()) {
      e.preventDefault();
      return;
    }
    localStorage.setItem("buyNow", JSON.stringify(product));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold" style={{ color: "#A84F40" }}>
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16" style={{ background: "#FFF9F3" }}>

      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-semibold mb-10 transition"
          style={{ color: "#A84F40" }}
        >
          ← Back to Products
        </Link>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left Side */}
          <div className="rounded-3xl shadow-xl h-[500px] flex items-center justify-center border" style={{ background: "#FFF9F3", borderColor: "#EED2BD" }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-[350px] h-[400px] object-cover rounded-2xl mx-auto"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold border" style={{ background: "#F8EEE4", color: "#A84F40", borderColor: "#EED2BD" }}>
              🧶 Handmade with Love
            </span>

            <h1 className="text-4xl font-bold leading-tight uppercase italic" style={{ color: "#4A3024" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold px-6 py-3 rounded-2xl shadow-lg" style={{ background: "#A84F40", color: "#FFF9F3" }}>
                ₹{product.price}
              </span>

              <span className="text-green-600 font-semibold">
                ✔ In Stock
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="border px-4 py-2 rounded-full text-sm" style={{ background: "#F8EEE4", borderColor: "#EED2BD", color: "#5F4A40" }}>
                🌸 Handmade
              </span>
              <span className="border px-4 py-2 rounded-full text-sm" style={{ background: "#F8EEE4", borderColor: "#EED2BD", color: "#5F4A40" }}>
                🎁 Perfect Gift
              </span>
              <span className="border px-4 py-2 rounded-full text-sm" style={{ background: "#F8EEE4", borderColor: "#EED2BD", color: "#5F4A40" }}>
                💖 Premium Quality
              </span>
            </div>

            <div className="rounded-2xl shadow-md p-6 border" style={{ background: "#FFF9F3", borderColor: "#EED2BD" }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#4A3024" }}>
                Description
              </h2>
              <p className="leading-8 whitespace-pre-line" style={{ color: "#5F4A40" }}>
                {product.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!isLoaded}
                className="flex-1 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#A84F40" }}
              >
                {isLoaded ? "🛒 Add to Cart" : "Loading..."}
              </button>

              <Link
                href="/checkout"
                onClick={handleBuyNow}
                className={`flex-1 text-white py-4 rounded-2xl text-center font-semibold text-lg shadow-lg transition ${!isLoaded ? "opacity-50 pointer-events-none" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isLoaded ? "💚 Buy Now" : "Loading..."}
              </Link>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
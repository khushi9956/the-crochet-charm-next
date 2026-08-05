"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://the-crochet-charm-api.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  const toggleWishlist = (product: any) => {
    let updatedWishlist = [...wishlist];

    const exists = updatedWishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      updatedWishlist = updatedWishlist.filter(
        (item) => item.id !== product.id
      );

      Swal.fire({
        icon: "success",
        title: "Removed from Wishlist 💔",
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      updatedWishlist.push(product);

      Swal.fire({
        icon: "success",
        title: "Added to Wishlist ❤️",
        timer: 1200,
        showConfirmButton: false,
      });
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <main className="min-h-screen" style={{ background: "#FFF9F3" }}>

      {/* Heading */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold" style={{ color: "#4A3024" }}>
          Our Collection
        </h1>
        <p className="mt-4" style={{ color: "#5F4A40" }}>
          Handmade with Love 🧶💖
        </p>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-2 border"
              style={{ background: "#FFF9F3", borderColor: "rgba(168,79,64,0.12)" }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-56 md:h-80 object-cover rounded-t-3xl"
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-3 rounded-full shadow-lg hover:scale-110 transition"
                  style={{ background: "rgba(255,249,243,0.92)", color: "#A84F40" }}
                >
                  {wishlist.find((item) => item.id === product.id) ? (
                    <FaHeart className="text-xl" style={{ color: "#A84F40" }} />
                  ) : (
                    <FaRegHeart className="text-xl" style={{ color: "#A84F40" }} />
                  )}
                </button>
              </div>

              <div className="p-6 text-center">
                <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-center" style={{ color: "#4A3024" }}>
                  {product.name}
                </h2>

                <div className="mt-4 inline-block px-5 py-2 rounded-full shadow-sm text-center border" style={{ background: "#F8EEE4", borderColor: "#EED2BD" }}>
                  <span className="text-lg sm:text-xl md:text-3xl font-bold text-center" style={{ color: "#A84F40" }}>
                    ₹{product.price}
                  </span>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="block mt-4 text-center text-white py-2 md:py-3 rounded-full text-sm md:text-base transition font-semibold"
                  style={{ background: "#A84F40" }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-white px-8 py-4 rounded-full font-semibold transition"
            style={{ background: "#A84F40" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(data);
  }, []);

  const removeItem = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <main className="min-h-screen py-12" style={{ background: "#FFF9F3" }}>

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10" style={{ color: "#4A3024" }}>
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="rounded-3xl shadow-lg p-10 text-center border" style={{ background: "#F8EEE4", borderColor: "#EED2BD" }}>

            <h2 className="text-2xl font-semibold mb-6" style={{ color: "#5F4A40" }}>
              Your Wishlist is Empty
            </h2>

            <Link
              href="/products"
              className="text-white px-8 py-3 rounded-xl inline-block font-semibold transition"
              style={{ background: "#A84F40" }}
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item) => (

              <div
                key={item.id}
                className="rounded-3xl shadow-lg overflow-hidden border"
                style={{ background: "#FFF9F3", borderColor: "rgba(168,79,64,0.12)" }}
              >

                <img
                  src={item.image.startsWith("http") ? item.image : `https://the-crochet-charm-api.onrender.com${item.image}`}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-xl font-bold" style={{ color: "#4A3024" }}>
                    {item.name}
                  </h2>

                  <p className="text-2xl font-bold mt-3" style={{ color: "#A84F40" }}>
                    ₹{item.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition font-medium"
                    >
                      Remove
                    </button>

                    <Link
                      href={`/products/${item.id}`}
                      className="flex-1 text-white py-3 rounded-xl text-center font-medium transition"
                      style={{ background: "#A84F40" }}
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
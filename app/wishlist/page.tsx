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
    <main className="min-h-screen bg-pink-50 py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-pink-700 mb-10">
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-semibold mb-6">
              Your Wishlist is Empty
            </h2>

            <Link
              href="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >

                <img
                  src={`https://the-crochet-charm-api.onrender.com${item.image}`}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-xl font-bold text-pink-700">
                    {item.name}
                  </h2>

                  <p className="text-2xl font-bold mt-3">
                    ₹{item.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                    >
                      Remove
                    </button>

                    <Link
                      href={`/products/${item.id}`}
                      className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl text-center"
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
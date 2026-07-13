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
    <main className="min-h-screen bg-pink-50">

      {/* Heading */}
      <div className="text-center py-16">

        <h1 className="text-5xl font-bold text-pink-700">
          Our Collection
        </h1>

        <p className="text-gray-600 mt-4">
          Handmade with Love 🧶💖
        </p>

      </div>

      {/* Products */}

      <div className="max-w-7xl mx-auto px-6 pb-20">
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">

  {products.map((product: any) => (

    <div
      key={product.id}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-2"
    >
<div className="relative">

  <img
  src={product.image}
  alt={product.name}
  className="w-full h-40 sm:h-56 md:h-80 object-cover rounded-t-3xl"
/>

  <button
    onClick={() => toggleWishlist(product)}
    className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
  >
    {wishlist.find((item) => item.id === product.id) ? (
      <FaHeart className="text-red-500 text-xl" />
    ) : (
      <FaRegHeart className="text-gray-500 text-xl" />
    )}
  </button>

</div>

      <div className="p-6">

        <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-pink-700 text-center">
          {product.name}
        </h2>

        <div className="mt-4 inline-block bg-pink-100 px-5 py-2 rounded-full shadow-sm padding-2 text-center margin ">
  <span className="text-lg sm:text-xl md:text-3xl font-bold text-pink-700 text-center">
    ₹{product.price}
  </span>
</div>
        <Link
  href={`/products/${product.id}`}
  className="block mt-4 text-center bg-pink-600 hover:bg-pink-700 text-white py-2 md:py-3 rounded-full text-sm md:text-base transition"
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
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}
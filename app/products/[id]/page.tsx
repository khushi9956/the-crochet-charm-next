"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaLeaf, FaGift, FaTruck } from "react-icons/fa";
import Swal from "sweetalert2";
export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((item: any) => item.id === product.id);

  if (existing) {
    Swal.fire({
      icon: "info",
      title: "Already in Cart",
      text: `${product.name} is already in your cart.`,
      confirmButtonColor: "#db2777",
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
if (!product) {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-pink-600">
      Loading...
    </div>
  );
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 py-16">

      <div className="max-w-7xl mx-auto px-6">

  {/* Back Button */}

  <Link
    href="/products"
    className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 mb-10"
  >
    ← Back to Products
  </Link>

  {/* Product Section */}

  <div className="grid lg:grid-cols-2 gap-14 items-start">

    {/* Left Side */}

<div className="bg-white rounded-3xl shadow-xl h-[500px] flex items-center justify-center">

      <img
        src={`http://127.0.0.1:8000${product.image}`}
        alt={product.name}
        className="w-[350px] h-[400px] object-cover rounded-2xl mx-auto "
      />

    </div>



    {/* Right Side */}

<div className="space-y-6">

  <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
    🧶 Handmade with Love
  </span>

  <h1 className="text-4xl font-bold text-gray-900 leading-tight uppercase italic">
    {product.name}
  </h1>

  <div className="flex items-center gap-3">

    <span className="bg-pink-600 text-white text-3xl font-bold px-6 py-3 rounded-2xl shadow-lg">
      ₹{product.price}
    </span>

    <span className="text-green-600 font-semibold">
      ✔ In Stock
    </span>

  </div>

  <div className="flex flex-wrap gap-3">

    <span className="bg-pink-50 border border-pink-200 px-4 py-2 rounded-full text-sm">
      🌸 Handmade
    </span>

    <span className="bg-pink-50 border border-pink-200 px-4 py-2 rounded-full text-sm">
      🎁 Perfect Gift
    </span>

    <span className="bg-pink-50 border border-pink-200 px-4 py-2 rounded-full text-sm">
      💖 Premium Quality
    </span>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <h2 className="text-2xl font-bold text-pink-700 mb-4">
      Description
    </h2>

    <p className="text-gray-600 text-bold leading-8 whitespace-pre-line">
  {product.description}
</p>


</div>
<div className="mt-8 flex flex-col sm:flex-row gap-4">


  <button
  onClick={handleAddToCart}
  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition"
>
  🛒 Add to Cart
</button>
<Link
  href="/checkout"
  onClick={() => {
    localStorage.setItem(
      "buyNow",
      JSON.stringify(product)
    );
  }}
  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-center font-semibold text-lg shadow-lg"
>
  💚 Order Now
</Link>

</div>
  </div>

</div>

  </div>


     
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import "swiper/css";



export default function ProductCarousel() {
    const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://the-crochet-charm-api.onrender.com/api/products/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProducts(data);
    });
}, []);
  return (
    <section
      id="products"
      className="py-14 md:py-24 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-pink-700">
          Popular Products
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Handmade creations crafted with love 💖
        </p>

        <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
  spaceBetween={25}
 breakpoints={{
  0: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 25,
  },
}}
>
  {products.map((product: any) => (
    <SwiperSlide key={product.id}>
  <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">

    <div className="relative overflow-hidden">

      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

    
      <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transition">
        <FaHeart />
      </button>

    </div>

    


  </div>
</SwiperSlide>
  ))}
</Swiper>
<div className="flex justify-center mt-12">
  <a
    href="/products"
    className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    ✨ View All Products
  </a>
</div>
      </div>
    </section>
  );
}
"use client";

import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import WhyChooseUs from "./components/WhyChooseUs";
import ProductCarousel from "./components/ProductCarousel";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";  
import { FaShoppingCart, FaHeart } from "react-icons/fa";
  

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [search, setSearch] = useState("");
const [products, setProducts] = useState<any[]>([]);
const filteredProducts = products.filter((product: any) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent 💖",
        text: "Thank you! Your message has been sent successfully. We will contact you soon. 🧶✨",
        confirmButtonColor: "#db2777",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Unable to connect to the server.",
    });
  }
};
const loaderRef = useRef(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

const timer = setTimeout(() => {

  gsap.to(loaderRef.current, {
    x: "-100%",
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      setLoading(false);
    }
  });

}, 4000);


return () => clearTimeout(timer);


}, []);

useEffect(() => {
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  updateCounts();

  window.addEventListener("cartUpdated", updateCounts);
  window.addEventListener("wishlistUpdated", updateCounts);

  return () => {
    window.removeEventListener("cartUpdated", updateCounts);
    window.removeEventListener("wishlistUpdated", updateCounts);
  };
}, []);
if (loading) {
return (
<div
ref={loaderRef}
className="loader-screen"
style={{
backgroundColor: "light pink",
backgroundSize: "cover",
backgroundPosition: "center",
}}
> <div className="loader-content" >
    <img
      src="/images/logo.png"
      alt="The Crochet Charm"
      className="loader-logo"
    />

    <h1 className="loader-title">
      The Crochet Charm
    </h1>

    <p className="loader-text">
      Handcrafting Something Beautiful...
    </p>

  </div>
</div>


);
}
return (
<main> 
  <nav className="bg-white shadow-md py-4">
    <div className="max-w-7xl mx-auto px-4 md:px-5 flex justify-between items-center">
      <Link href="/">
  <img
    src="/images/logo.png"
    alt="The Crochet Charm"
 className="h-12 md:h-14 w-auto"
  />
</Link>

     <div className="hidden lg:flex items-center gap-8 text-[16px] font-semibold text-[#7b2958]">
        <Link href="/" className="hover:text-pink-600 transition">
  Home
</Link>
      <a href="#products" className="hover:text-pink-600">
  Products
</a>

<a href="#about" className="hover:text-pink-600">
  About
</a>

<a href="#contact" className="hover:text-pink-600">
  Contact
</a>
<Link
  href="/wishlist"
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 transition"
>
  ❤️
  <span>Wishlist</span>

  <span className="bg-pink-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
    {wishlistCount}
  </span>
</Link>
<Link
  href="/cart"
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
>
  🛒
  <span>Cart</span>

  <span className="bg-white text-pink-600 w-5 h-5 rounded-full text-xs flex items-center justify-center">
    {cartCount}
  </span>
</Link>
      </div>
<button
  onClick={() => setMenuOpen(!menuOpen)}
className="lg:hidden text-3xl text-pink-600 ml-3"
>
  {menuOpen ? <FaTimes /> : <FaBars />}
</button>
     <div className="hidden md:flex gap-2 relative">
        
        <input
  type="text"
  placeholder="Search handmade products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border border-pink-200 rounded-full px-5 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-pink-400"
/>
       <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 rounded-full transition">
  Search
</button>
        {search && (
  <div className="absolute mt-2 w-64 bg-white rounded-xl shadow-xl border max-h-80 overflow-y-auto z-50">

    {filteredProducts.length === 0 ? (
      <p className="p-4 text-gray-500">No products found</p>
    ) : (
      filteredProducts.map((product: any) => (
        <a
          key={product.id}
          href={`/products/${product.id}`}
          className="flex items-center gap-3 p-3 hover:bg-pink-50"
        >
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            className="w-12 h-12 rounded-lg object-cover"
          />

          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-pink-600">₹{product.price}</p>
          </div>
        </a>
        
      ))
    )}

  </div>
)}
      </div>
    </div>
  </nav>
{menuOpen && (
  <div className="lg:hidden bg-white shadow-xl rounded-b-2xl px-6 py-6 space-y-5 animate-fadeIn">

    <Link
      href="/"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      🏠 Home
    </Link>

    <a
      href="#products"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      🛍️ Products
    </a>

    <a
      href="#about"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      💖 About
    </a>

    <a
      href="#contact"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      📞 Contact
    </a>

    <Link
      href="/wishlist"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      ❤️ Wishlist ({wishlistCount})
    </Link>

    <Link
      href="/cart"
      onClick={() => setMenuOpen(false)}
      className="block text-lg font-semibold text-pink-700 hover:text-pink-500"
    >
      🛒 Cart ({cartCount})
    </Link>

  </div>
)}

  {/* Announcement */}

  <div className="announcement-wrapper">
  <div className="announcement-track">
    🚚 Free Shipping on Orders Above ₹1500 ✨
    🧶 Custom Crochet Orders Available ✨
    🎁 Handmade with Love ✨
    💖 DM Us for Personalized Gifts ✨
  </div>
</div>
  {/* Hero */}

 
<section
  className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-center px-5 py-12 bg-cover bg-top md:bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/klara-kulikova-DTNy4OXaDSo-unsplash.jpg')",
  }}

>
  <div className="absolute inset-0 bg-white/25"></div>
 <div className="relative z-10 max-w-4xl w-full">
  
  <div className="relative z-10 max-w-4xl w-full animate-[fadeIn_1.5s_ease-in]">
     <img
  src="/images/logo.png"
  alt="The Crochet Charm Logo"
  className="
w-28 h-28
sm:w-36 sm:h-36
md:w-52 md:h-52
mx-auto
mb-6
rounded-full
bg-white/90
p-2
shadow-xl
"
/>

      <h1 className="text-4xl
sm:text-5xl
md:text-7xl
font-extrabold
leading-tight
text-pink-700
drop-shadow-md">
        The Crochet Charm
      </h1>

     <p className="mt-5
text-lg
sm:text-xl
md:text-2xl
font-medium
text-gray-800
max-w-2xl
mx-auto
leading-relaxed
">
        Handmade Crochet Gifts, Bouquets,
         & Personalized Creations
      </p>

     <div className="mt-8 flex flex-col sm:flex-row justify-center gap-5">
        <a
          href="#products"
          className="
w-full
sm:w-auto
bg-yellow-500
hover:bg-yellow-600
text-white
px-10
py-4
rounded-full
font-semibold
shadow-lg
transition
hover:scale-105
"
        >
          Shop Now
        </a>

        <a
          href="#contact"
          className="w-full
sm:w-auto
bg-white
border-2
border-pink-400
text-pink-700
px-10
py-4
rounded-full
font-semibold
shadow-lg
transition
hover:bg-pink-50
hover:scale-105"        >
          Custom Order
        </a>
        </div>
        </div>
    </div>
    
  </section>

<ProductCarousel />
 
<section 
  id="about"
  className="w-full bg-pink-50 py-24"
>
<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl px-12 py-16">

    <h2 className="text-5xl font-bold text-center text-pink-700">
      About The Crochet Charm
    </h2>

  <p className="text-center text-lg text-gray-700 leading-8">
  
        At The Crochet Charm, every stitch is made with love, creativity,
        and attention to detail. We specialize in handmade crochet creations,
        including beautiful bouquets, hair accessories, keychains, bags,
        and customized gifts.
    </p>

    <p className="text-center text-lg text-gray-700 leading-8">
        Our mission is to bring warmth and happiness through unique
        handcrafted products that are made especially for you.
    </p>

    <p className="text-center text-lg text-gray-700 leading-8">
        Thank you for supporting handmade art and being a part
        of our crochet journey.
    </p>
</div>
</section>
  <WhyChooseUs />
<section
  id="contact"
   className="w-full bg-gradient-to-r bg-pink-50 py-24"
>
<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

  <div className="grid lg:grid-cols-2 gap-12 items-start">
  <h2 className="text-4xl font-bold text-center mb-8 text-pink-700">
    Contact Us
  </h2>
  <div>

  <h2 className="text-4xl font-bold text-pink-700 mb-6">
    Get in Touch 💖
  </h2>

  <p className="text-gray-600 mb-8">
    We'd love to hear from you! Feel free to contact us for custom crochet
    orders, questions, or collaborations.
  </p>

  <div className="space-y-6">

    <div className="bg-pink-50 rounded-2xl p-5">
      <h3 className="font-bold text-pink-600 text-lg">
        📧 Email
      </h3>

      <p className="text-gray-700 mt-2">
        thecrochetcharmshop@gmail.com
      </p>
    </div>

    <div className="bg-pink-50 rounded-2xl p-5">
      <h3 className="font-bold text-pink-600 text-lg">
        📞 Phone
      </h3>

      <p className="text-gray-700 mt-2">
        +91 9519499698
      </p>
    </div>

  </div>

</div>
<h2 className="text-4xl font-bold text-center mb-8 text-pink-700">
  Send Message
</h2>
  <form
 
  onSubmit={handleSubmit}
  className="space-y-4 text-center text-pink-700"
>
    <input
  type="text"
  placeholder="Your Name"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  className="w-full p-3 border rounded-xl"
  required
/>

    <input
  type="email"
  placeholder="Your Email"
  value={formData.email}
  onChange={(e) =>
    setFormData({ ...formData, email: e.target.value })
  }
  className="w-full p-3 border rounded-xl"
  required
/>

    <textarea
  placeholder="Message"
  rows={5}
  value={formData.message}
  onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
  }
  className="w-full p-3 border rounded-xl"
  required
/>

   <button
  type="submit"
  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition"
>
  Send Message
</button>
  </form>
  </div>

  </div>
</section>
<footer className="w-full bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50  py-12">

  <div className=" w-full max-w-6xl mx-auto px-6 text-center">

   
    <h2 className="text-3xl font-bold text-pink-700 mt-5">
      The Crochet Charm
    </h2>

    <p className="text-gray-600 mt-3">
      Handmade with Love 🧶💖
    </p>

    <div className="flex justify-center gap-5 mt-8 flex-wrap">

      <a
        href="https://instagram.com/thecrochetcharms"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
>
  <FaInstagram className="text-2xl" />
  Follow us on Instagram
</a>

      

    </div>

    <div className="mt-10 border-t border-pink-200 pt-6">

      <p className="text-gray-500 text-sm">
        © 2026 The Crochet Charm. All Rights Reserved.
      </p>

    </div>

  </div>

</footer>
<FloatingWhatsapp />
</main>   
);
}
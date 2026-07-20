"use client";

import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Footer from "./components/Footer";
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
    const response = await fetch("https://the-crochet-charm-api.onrender.com/api/contact/", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
console.log(response.status);

const data = await response.json();

console.log(data);


if (response.ok && data.success) {
  Swal.fire({
    icon: "success",
    title: "Message Sent 💖",
    text: data.message,
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
    text: data.error || "Something went wrong.",
  });
}
} catch (error) {
  Swal.fire({
    icon: "error",
    title: "Server Error",
    text: "Unable to connect to the server.",
  });
  };  
}
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
<Link
  href="/wishlist"
  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 transition"
>
  
  <span>My Orders</span>
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
  className="border border-pink-200 rounded-full px-5 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
          src={product.image}
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
   className="relative min-h-screen flex items-center justify-center overflow-hidden"
>
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/background.jpg')",
    }}
  >
  <div className="absolute inset-0 bg-white/25"></div>
<div className="relative z-10 w-full max-w-4xl mx-auto text-center px-6 animate-[fadeIn_1.5s_ease-in]">
  
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

  <div className="grid lg:grid-cols-2 gap-12 items-center">
  {/* Left Side */}
  <div>
    <h2 className="text-4xl font-bold text-pink-700 mb-6">
      Contact Us
    </h2>

    <p className="text-gray-600 leading-8 text-lg">
      We'd love to hear from you! Whether you have a question about our
      handmade crochet creations, custom orders, or need assistance with
      your purchase, simply fill out the form and we'll get back to you as
      soon as possible.
    </p>

    <div className="mt-8 p-5 rounded-2xl bg-pink-50 border border-pink-100">
      <p className="text-pink-700 font-semibold">
        💌 We usually respond within 24 hours.
      </p>

      <p className="text-gray-600 mt-2">
        Thank you for supporting handmade creations. ❤️
      </p>
    </div>
  </div>

  {/* Right Side */}
  <form
    onSubmit={handleSubmit}
    
    className="space-y-5 bg-pink-50 p-8 rounded-2xl shadow-md"
  >
    

    <input
      type="text"
      placeholder="Your Name"
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
      required
    />

    <input
      type="email"
      placeholder="Your Email"
      value={formData.email}
      onChange={(e) =>
        setFormData({ ...formData, email: e.target.value })
      }
      className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
      required
    />

    <textarea
      placeholder="Your Message"
      rows={5}
      value={formData.message}
      onChange={(e) =>
        setFormData({ ...formData, message: e.target.value })
      }
      className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
      required
    />

    <button
      type="submit"
      className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition duration-300"
    >
      Send Message
    </button>
    <p className="text-center text-sm text-gray-500">
  We respect your privacy. Your information is never shared with third parties.
</p>


  </form>

  </div>

  </div>

</section>

<FloatingWhatsapp />
<Footer />
</main>
);
}

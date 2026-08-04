"use client";

import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import ProductCarousel from "./components/ProductCarousel";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
  

export default function Home() {
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
const loaderRef = useRef<HTMLDivElement>(null);
const [showLoader, setShowLoader] = useState(true);
const [isAnimating, setIsAnimating] = useState(false);

useEffect(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion || sessionStorage.getItem("crochetCharmIntroSeen")) {
    setShowLoader(false);
    window.dispatchEvent(new Event("loaderComplete"));
    return;
  }

  const timer = setTimeout(() => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem("crochetCharmIntroSeen", "1");
      window.dispatchEvent(new Event("loaderComplete"));
    }, 800);
  }, 2200);

  return () => clearTimeout(timer);
}, []);

return (
<>
  {showLoader && (
    <div
      ref={loaderRef}
      className="loader-screen"
      style={{
        background: "linear-gradient(135deg, #FFF8FB 0%, #FFE4EC 100%)",
      }}
    >
      <div className={`loader-content ${isAnimating ? "loader-exit" : ""}`}>
        <img
          src="/images/logo.png"
          alt="The Crochet Charm"
          className="loader-logo"
        />
        <h1 className="loader-title">The Crochet Charm</h1>
        <p className="loader-text">Handmade With Love</p>
        <svg className="loader-stitch" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 L15 10 L20 15 L25 5 L30 15 L35 5 L40 15 L45 5 L50 15 L55 5 L60 15 L65 5 L70 15 L75 5 L80 15 L85 5 L90 15 L95 5 L100 15 L105 5 L110 15 L120 10" stroke="#C94B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        </svg>
      </div>
    </div>
  )}

 {/* Hero Section */}
 {/* Hero Section */}

<section className="relative min-h-screen flex items-center justify-center overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/images/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />

  {/* Overlay */}
<div className="absolute inset-0 bg-white/35"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

    {/* Logo */}
    <img
  src="/images/logo.png"
  alt="The Crochet Charm"
  className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-6 rounded-full bg-white p-2 shadow-2xl"
/>
    {/* Heading */}
    <h1 className="mt-8 text-3xl sm:text-5xl md:text-6xl font-extrabold text-pink-700">
      The Crochet Charm 
    </h1>

    <p className="mt-4 text-xl md:text-2xl font-semibold text-pink-600">
      Handmade With Love 
    </p>

    <p className="mt-6 max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-8">
      Discover beautifully handcrafted crochet bouquets, flowers,
      hair accessories and personalized gifts made with love for every
      special occasion.
    </p>

    {/* Buttons */}
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

      <a
        href="#products"
        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transition duration-300 hover:scale-105"
      >
        🛍 Shop Now
      </a>

      <a
        href="#contact"
        className="bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-full font-bold shadow-lg transition duration-300 hover:scale-105"
      >
        💖 Custom Order
      </a>

    </div>

  </div>

</section>
<section className="py-10 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      <div className="bg-pink-50 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <h3 className="text-3xl font-bold text-pink-600">500+</h3>
        <p className="text-gray-600 mt-2">Happy Customers</p>
      </div>

      <div className="bg-pink-50 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <h3 className="text-3xl font-bold text-pink-600">1000+</h3>
        <p className="text-gray-600 mt-2">Handmade Products</p>
      </div>

      <div className="bg-pink-50 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <h3 className="text-3xl font-bold text-pink-600">4.9★</h3>
        <p className="text-gray-600 mt-2">Customer Rating</p>
      </div>

      <div className="bg-pink-50 rounded-3xl p-6 text-center shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300">
        <h3 className="text-3xl font-bold text-pink-600">🇮🇳</h3>
        <p className="text-gray-600 mt-2">PAN India Delivery</p>
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
  <section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center text-pink-700">
      What Our Customers Say ❤️
    </h2>

    <p className="text-center text-gray-500 mt-4">
      Loved by crochet lovers across India.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-14">

      <div className="bg-pink-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-400 text-2xl">★★★★★</div>
        <p className="mt-4 text-gray-600 italic">
          "The bouquet was absolutely beautiful. The quality exceeded my expectations!"
        </p>
        <h4 className="mt-6 font-bold text-pink-700">— Priya S.</h4>
      </div>

      <div className="bg-pink-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-400 text-2xl">★★★★★</div>
        <p className="mt-4 text-gray-600 italic">
          "Beautiful handmade products and excellent packaging. Highly recommended!"
        </p>
        <h4 className="mt-6 font-bold text-pink-700">— Anjali M.</h4>
      </div>

      <div className="bg-pink-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-400 text-2xl">★★★★★</div>
        <p className="mt-4 text-gray-600 italic">
          "The custom crochet gift was perfect. Thank you so much!"
        </p>
        <h4 className="mt-6 font-bold text-pink-700">— Riya K.</h4>
      </div>

    </div>
  </div>
</section>
<section className="py-20 bg-gradient-to-r from-pink-100 to-rose-100">
  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="text-4xl md:text-5xl font-bold text-pink-700">
      Looking for a Custom Crochet Gift? 💖
    </h2>

    <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
      We create personalized crochet bouquets, keychains, hair accessories,
      gifts, and more—made especially for you with love and care.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

      <a
        href="#contact"
        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition"
      >
        💌 Place a Custom Order
      </a>

      <a
        href="https://wa.me/91YOURNUMBER"
        target="_blank"
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition"
      >
        💬 Chat on WhatsApp
      </a>

    </div>

  </div>
</section>
<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center text-pink-700">
      Frequently Asked Questions
    </h2>

    <div className="mt-12 space-y-6">

      <div className="bg-pink-50 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          ❓ Do you take custom crochet orders?
        </h3>
        <p className="mt-2 text-gray-600">
          Yes! We create personalized crochet gifts, bouquets, keychains, hair accessories and much more.
        </p>
      </div>

      <div className="bg-pink-50 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          🚚 How long does delivery take?
        </h3>
        <p className="mt-2 text-gray-600">
          Orders are usually delivered within 6-8 business days.
        </p>
      </div>

      <div className="bg-pink-50 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          💳 Which payment methods are available?
        </h3>
        <p className="mt-2 text-gray-600">
          Secure online payments are available through Razorpay.
        </p>
      </div>

      <div className="bg-pink-50 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          🎁 Are all products handmade?
        </h3>
        <p className="mt-2 text-gray-600">
          Yes, every crochet creation is handmade with love and attention to detail.
        </p>
      </div>

    </div>

  </div>
</section>
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
</>
);
}

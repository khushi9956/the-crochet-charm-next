"use client";

import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent 💖",
          text: data.message,
          confirmButtonColor: "#A84F40",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({ icon: "error", title: "Oops!", text: data.error || "Something went wrong." });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Server Error", text: "Unable to connect to the server." });
    }
  };

  const loaderRef = useRef<HTMLDivElement>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || sessionStorage.getItem("crochetCharmIntroSeen")) {
      setShowLoader(false);
      setHeroReady(true);
      window.dispatchEvent(new Event("loaderComplete"));
      return;
    }

    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setShowLoader(false);
        setHeroReady(true);
        sessionStorage.setItem("crochetCharmIntroSeen", "1");
        window.dispatchEvent(new Event("loaderComplete"));
      }, 800);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Landing Animation ── */}
      {showLoader && (
        <div
          ref={loaderRef}
          className="loader-screen"
          style={{ background: "linear-gradient(135deg, #FFF9F3 0%, #F8EEE4 100%)" }}
        >
          <div className={`loader-content ${isAnimating ? "loader-exit" : ""}`}>
            <img src="/images/logo.png" alt="The Crochet Charm" className="loader-logo" />
            <h1 className="loader-title">The Crochet Charm</h1>
            <p className="loader-text">Handmade With Love</p>
            <svg className="loader-stitch" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 10 L15 10 L20 15 L25 5 L30 15 L35 5 L40 15 L45 5 L50 15 L55 5 L60 15 L65 5 L70 15 L75 5 L80 15 L85 5 L90 15 L95 5 L100 15 L105 5 L110 15 L120 10"
                stroke="#A84F40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          HERO SECTION — Editorial Redesign
      ════════════════════════════════════════ */}
      <section className="hero-section" aria-label="Hero">

        {/* Background — rich crochet photo, NO global opacity */}
        <div className="hero-bg" aria-hidden="true" />

        {/* Left-aligned editorial content */}
        <div className="hero-content-wrap">
          <div className="hero-content">

            {/* Eyebrow */}
            <div className={`hero-eyebrow${heroReady ? " hero-animate" : ""}`}>
              <span className="hero-eyebrow-line" aria-hidden="true" />
              <svg
                className="hero-eyebrow-icon"
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span className="hero-eyebrow-text">Handmade with Love</span>
              <span className="hero-eyebrow-line" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h1 className={`hero-headline${heroReady ? " hero-animate" : ""}`}>
              <span className="hero-line1">Made with love,</span>
              <span className="hero-line2">meant to be yours.</span>
            </h1>

            {/* Decorative divider */}
            <div className={`hero-divider${heroReady ? " hero-animate" : ""}`} aria-hidden="true">
              <span className="hero-divider-line" />
              <span className="hero-divider-heart">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </span>
              <span className="hero-divider-line" />
            </div>

            {/* Description */}
            <p className={`hero-description${heroReady ? " hero-animate" : ""}`}>
              Discover beautifully handcrafted crochet bouquets, flowers,
              hair accessories and personalized gifts for every special occasion.
            </p>

            {/* CTA Buttons — existing routes preserved */}
            <div className={`hero-buttons${heroReady ? " hero-animate" : ""}`}>
              <a id="hero-shop-now" href="#products" className="hero-btn-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Shop Now
              </a>

              <a id="hero-custom-order" href="#contact" className="hero-btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Custom Order
              </a>
            </div>

            {/* Three mini value propositions */}
            <div className={`hero-values${heroReady ? " hero-animate" : ""}`}>

              {/* 100% Handmade */}
              <div className="hero-value-item">
                <svg className="hero-value-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <div>
                  <span className="hero-value-title">100% Handmade</span>
                  <span className="hero-value-sub">Lovingly crafted</span>
                </div>
              </div>

              {/* Custom Orders */}
              <div className="hero-value-item">
                <svg className="hero-value-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                <div>
                  <span className="hero-value-title">Custom Orders</span>
                  <span className="hero-value-sub">Made just for you</span>
                </div>
              </div>

              {/* Thoughtful Packaging */}
              <div className="hero-value-item">
                <svg className="hero-value-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <div>
                  <span className="hero-value-title">Thoughtful Packaging</span>
                  <span className="hero-value-sub">Care in every detail</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom Wave + Scroll Indicator ── */}
        <div className="hero-wave-wrap">
          {/* Rear wave — translucent peach */}
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "90px", zIndex: 3 }}
            aria-hidden="true"
          >
            <path
              d="M0,45 C240,80 480,10 720,45 C960,80 1200,10 1440,45 L1440,90 L0,90 Z"
              fill="rgba(238,210,189,0.45)"
            />
          </svg>
          {/* Front wave — ivory, flows into next section */}
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", zIndex: 4, display: "block", width: "100%", height: "90px" }}
            aria-hidden="true"
          >
            <path
              d="M0,55 C360,95 720,15 1080,55 C1260,75 1380,48 1440,55 L1440,90 L0,90 Z"
              fill="#FFF9F3"
            />
          </svg>

          {/* Scroll indicator centered on wave */}
          <div className="hero-scroll-indicator" aria-hidden="true">
            <div className="hero-scroll-mouse">
              <div className="hero-scroll-wheel" />
            </div>
            <span className="hero-scroll-label">Scroll to Explore</span>
          </div>
        </div>

      </section>

      {/* ── Trust Strip ── */}
      <section className="trust-strip">
        <div className="trust-strip-card">
          <div className="trust-item">
            <div className="trust-icon-circle">
              <svg className="trust-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="trust-text">
              <span className="trust-number">500+</span>
              <span className="trust-label">Happy Customers</span>
            </div>
          </div>

          <div className="trust-divider" aria-hidden="true" />

          <div className="trust-item">
            <div className="trust-icon-circle">
              <svg className="trust-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 0 9 9" />
                <path d="M3 12a9 9 0 0 0 9 9" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
            <div className="trust-text">
              <span className="trust-number">1000+</span>
              <span className="trust-label">Handmade Products</span>
            </div>
          </div>

          <div className="trust-divider" aria-hidden="true" />

          <div className="trust-item">
            <div className="trust-icon-circle">
              <svg className="trust-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="trust-text">
              <span className="trust-number">4.9</span>
              <span className="trust-label">Customer Rating</span>
            </div>
          </div>

          <div className="trust-divider" aria-hidden="true" />

          <div className="trust-item">
            <div className="trust-icon-circle">
              <svg className="trust-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="trust-text">
              <span className="trust-number">PAN India</span>
              <span className="trust-label">Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel />

      {/* ── About ── */}
      <section id="about" className="w-full py-24" style={{ background: "#F8EEE4" }}>
        <div
          className="max-w-6xl mx-auto rounded-3xl px-12 py-16"
          style={{
            background: "rgba(255, 249, 243, 0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(238, 210, 189, 0.65)",
            boxShadow: "0 12px 35px rgba(74, 48, 36, 0.08)",
          }}
        >
          <p
            className="text-center font-semibold"
            style={{ color: "#A84F40", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}
          >
            ── OUR STORY ──
          </p>
          <h2 className="text-5xl font-bold text-center" style={{ color: "#4A3024" }}>About The Crochet Charm</h2>
          <p className="text-center text-lg leading-8" style={{ color: "#5F4A40" }}>
            At The Crochet Charm, every stitch is made with love, creativity, and attention to detail.
            We specialize in handmade crochet creations, including beautiful bouquets, hair accessories,
            keychains, bags, and customized gifts.
          </p>
          <p className="text-center text-lg leading-8" style={{ color: "#5F4A40" }}>
            Our mission is to bring warmth and happiness through unique handcrafted products that are
            made especially for you.
          </p>
          <p className="text-center text-lg leading-8" style={{ color: "#5F4A40" }}>
            Thank you for supporting handmade art and being a part of our crochet journey.
          </p>
        </div>
      </section>


      <WhyChooseUs />

      {/* ── Testimonials ── */}
      <section className="py-24" style={{ background: "#FFF9F3" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center" style={{ color: "#4A3024" }}>What Our Customers Say ❤️</h2>
          <p className="text-center mt-4" style={{ color: "#5F4A40" }}>Loved by crochet lovers across India.</p>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="rounded-3xl p-8 shadow-lg" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <div className="text-yellow-500 text-2xl">★★★★★</div>
              <p className="mt-4 italic" style={{ color: "#5F4A40" }}>
                &ldquo;The bouquet was absolutely beautiful. The quality exceeded my expectations!&rdquo;
              </p>
              <h4 className="mt-6 font-bold" style={{ color: "#A84F40" }}>— Priya S.</h4>
            </div>
            <div className="rounded-3xl p-8 shadow-lg" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <div className="text-yellow-500 text-2xl">★★★★★</div>
              <p className="mt-4 italic" style={{ color: "#5F4A40" }}>
                &ldquo;Beautiful handmade products and excellent packaging. Highly recommended!&rdquo;
              </p>
              <h4 className="mt-6 font-bold" style={{ color: "#A84F40" }}>— Anjali M.</h4>
            </div>
            <div className="rounded-3xl p-8 shadow-lg" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <div className="text-yellow-500 text-2xl">★★★★★</div>
              <p className="mt-4 italic" style={{ color: "#5F4A40" }}>
                &ldquo;The custom crochet gift was perfect. Thank you so much!&rdquo;
              </p>
              <h4 className="mt-6 font-bold" style={{ color: "#A84F40" }}>— Riya K.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Order CTA ── */}
      <section className="py-20" style={{ background: "#F8EEE4" }}>
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#4A3024" }}>Looking for a Custom Crochet Gift? 💖</h2>
          <p className="mt-6 text-lg leading-8 max-w-3xl mx-auto" style={{ color: "#5F4A40" }}>
            We create personalized crochet bouquets, keychains, hair accessories, gifts, and more—made
            especially for you with love and care.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <a href="#contact" className="text-white px-8 py-4 rounded-full font-semibold shadow-lg transition" style={{ background: "#A84F40" }}>
              💌 Place a Custom Order
            </a>
            <a href="https://wa.me/91YOURNUMBER" target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition">
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#FFF9F3" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center" style={{ color: "#4A3024" }}>Frequently Asked Questions</h2>
          <div className="mt-12 space-y-6">
            <div className="rounded-2xl p-6" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#4A3024" }}>❓ Do you take custom crochet orders?</h3>
              <p className="mt-2" style={{ color: "#5F4A40" }}>
                Yes! We create personalized crochet gifts, bouquets, keychains, hair accessories and much more.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#4A3024" }}>🚚 How long does delivery take?</h3>
              <p className="mt-2" style={{ color: "#5F4A40" }}>Orders are usually delivered within 6-8 business days.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#4A3024" }}>💳 Which payment methods are available?</h3>
              <p className="mt-2" style={{ color: "#5F4A40" }}>Secure online payments are available through Razorpay.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "#F8EEE4", border: "1px solid rgba(168,79,64,0.1)" }}>
              <h3 className="font-bold text-lg" style={{ color: "#4A3024" }}>🎁 Are all products handmade?</h3>
              <p className="mt-2" style={{ color: "#5F4A40" }}>
                Yes, every crochet creation is handmade with love and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="w-full py-24" style={{ background: "#F8EEE4" }}>
        <div className="max-w-6xl mx-auto rounded-3xl shadow-xl p-10" style={{ background: "#FFF9F3", border: "1px solid #EED2BD" }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: "#4A3024" }}>Contact Us</h2>
              <p className="leading-8 text-lg" style={{ color: "#5F4A40" }}>
                We&apos;d love to hear from you! Whether you have a question about our handmade crochet
                creations, custom orders, or need assistance with your purchase, simply fill out the form
                and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="mt-8 p-5 rounded-2xl border" style={{ background: "#F8EEE4", borderColor: "#EED2BD" }}>
                <p className="font-semibold" style={{ color: "#A84F40" }}>💌 We usually respond within 24 hours.</p>
                <p className="mt-2" style={{ color: "#5F4A40" }}>Thank you for supporting handmade creations. ❤️</p>
              </div>
            </div>

            {/* Right Side */}
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl shadow-md" style={{ background: "#F8EEE4" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#EED2BD", background: "#FFF9F3", color: "#4A3024" }}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#EED2BD", background: "#FFF9F3", color: "#4A3024" }}
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
                style={{ borderColor: "#EED2BD", background: "#FFF9F3", color: "#4A3024" }}
                required
              />
              <button
                type="submit"
                className="w-full text-white py-3 rounded-xl font-semibold transition duration-300"
                style={{ background: "#A84F40" }}
              >
                Send Message
              </button>
              <p className="text-center text-sm" style={{ color: "#5F4A40" }}>
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

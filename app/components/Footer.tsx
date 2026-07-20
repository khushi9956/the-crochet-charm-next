import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaFileContract,
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";
export default function Footer() {
  return (
   <footer className="bg-gradient-to-b from-pink-300 to-white border-t border-pink-400 mt-20 shadow-[0_-8px_25px_rgba(236,72,153,0.08)]">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

  {/* Brand */}
  <div>
    <img
      src="/images/logo.png"
      alt="The Crochet Charm"
      className="w-24 h-24 rounded-full shadow-lg hover:scale-110 transition duration-300"
    />

    <h2 className="text-2xl font-bold text-pink-700 mt-4">
      The Crochet Charm
    </h2>

    <p className="text-gray-600 mt-3 leading-7">
      Handmade crochet gifts crafted with love.
      Every stitch tells a beautiful story.
    </p>
  </div>

  {/* Quick Links */}
  <div>
    <h3 className="font-bold text-xl text-pink-700 mb-5">
      Quick Links
    </h3>

    <ul className="space-y-3">

      <li>
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaHome />
          Home
        </Link>
      </li>

      <li>
        <Link href="/products" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaBoxOpen />
          Products
        </Link>
      </li>

      <li>
        <Link href="/my-orders" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaBoxOpen />
          My Orders
        </Link>
      </li>

      <li>
        <Link href="/#contact" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaPhoneAlt />
          Contact
        </Link>
      </li>

    </ul>
  </div>

  {/* Policies */}
  <div>

    <h3 className="font-bold text-xl text-pink-700 mb-5">
      Policies
    </h3>

    <ul className="space-y-3">

      <li>
        <Link href="/shipping-policy" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaShippingFast />
          Shipping Policy
        </Link>
      </li>

      <li>
        <Link href="/refund-policy" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaUndoAlt />
          Refund Policy
        </Link>
      </li>

      <li>
        <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaShieldAlt />
          Privacy Policy
        </Link>
      </li>

      <li>
        <Link href="/terms" className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaFileContract />
          Terms & Conditions
        </Link>
      </li>

    </ul>

  </div>

  {/* Connect */}
  <div>

    <h3 className="font-bold text-xl text-pink-700 mb-5">
      Connect With Us
    </h3>

    <p className="text-gray-600 mb-3">
      📧 thecrochetcharms@gmail.com
    </p>

    <p className="text-gray-600 mb-5">
      📞 +91 9519499698
    </p>

    <div className="flex gap-5">

      <a
        href="https://instagram.com/thecrochetcharms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-700 hover:scale-125 transition duration-300"
      >
        <FaInstagram size={28}/>
      </a>

      <a
        href="mailto:thecrochetcharms@gmail.com"
        className="text-pink-600 hover:text-pink-700 hover:scale-125 transition duration-300"
      >
        <FaEnvelope size={28}/>
      </a>

      <a
        href="https://wa.me/919519499698"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-green-500 hover:scale-125 transition duration-300"
      >
        <FaWhatsapp size={28}/>
      </a>

    </div>

  </div>

</div>

     <div className="border-t border-pink-200 mt-10 pt-6 text-center text-gray-600">

  © 2026 The Crochet Charm. All Rights Reserved.

  <br />

  Made with ❤️ in India

</div>

    </footer>
  );
}
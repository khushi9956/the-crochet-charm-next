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
   <footer className="bg-gradient-to-b from-pink-100 to-white border-t border-pink-400 mt-20 shadow-[0_-8px_25px_rgba(236,72,153,0.08)]">

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

  {/* Brand */}
  <div>
    <img
      src="/images/logo.png"
      alt="The Crochet Charm"
      className="w-24 h-24 rounded-full shadow-lg hover:scale-110 transition duration-300 hover:rotate-3"
    />

    <h2 className="text-2xl font-bold text-pink-700 mt-4">
      The Crochet Charm
    </h2>

    <p className="text-gray-600 mt-3 leading-7">
     Premium handmade crochet gifts, bouquets, hair accessories,
and personalized creations crafted with love for every special moment.
    </p>
  </div>

  {/* Quick Links */}
  <div>
    <h3 className="font-bold text-xl text-pink-700 mb-5hover:translate-x-1">
      Quick Links
    </h3>

    <ul className="space-y-3 hover:translate-x-1">

      <li>
     <Link
  href="/"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaHome className="w-5 h-5 flex-shrink-0" />
  <span>Home</span>
</Link>
      </li>

      <li>
        <Link
  href="/products"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaBoxOpen className="w-5 h-5 flex-shrink-0" />
  <span>Products</span>
</Link>
      </li>

      <li>
        <Link
  href="/my-orders"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaBoxOpen className="w-5 h-5 flex-shrink-0" />
  <span>My Orders</span>
</Link>
      </li>

      <li>
       <Link
  href="/#contact"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaPhoneAlt className="w-5 h-5 flex-shrink-0" />
  <span>Contact</span>
</Link>
      </li>

    </ul>
  </div>

  {/* Policies */}
  <div>

    <h3 className="font-bold hover:translate-x-1 text-xl text-pink-700 mb-5">
      Policies
    </h3>
<ul className="space-y-4">

      <li>
       <Link
  href="/shipping-policy"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaShippingFast className="w-5 h-5 flex-shrink-0" />
  <span>Shipping Policy</span>
</Link>
      </li>

      <li>
        <Link
  href="/refund-policy"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaUndoAlt className="w-5 h-5 flex-shrink-0" />
  <span>Refund Policy</span>
</Link>
      </li>

      <li>
       <Link
  href="/privacy-policy"
  className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition"
>
  <FaShieldAlt className="w-5 h-5 flex-shrink-0" />
  <span>Privacy Policy</span>
</Link>
      </li>

      <li>
        <Link href="/terms" className="hover:translate-x-1flex items-center gap-2 text-gray-600 hover:text-pink-600 transition">
          <FaFileContract />
          Terms & Conditions
        </Link>
      </li>

    </ul>

  </div>

  {/* Connect */}
  <div>

    <h3 className="font-bold text-xl hover:translate-x-1 text-pink-700 mb-5">
      Connect With Us
    </h3>

    <p className="flex items-center gap-2 text-gray-600 mb-3">
  <FaEnvelope />
  thecrochetcharms@gmail.com
</p>

<p className="flex items-center gap-2 text-gray-600 mb-5">
  <FaPhoneAlt />
  +91 9519499698
</p>

    <div className="flex gap-5">

      <a
        href="https://instagram.com/thecrochetcharms"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition duration-300"
      >
        <FaInstagram size={28}/>
      </a>

      <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=thecrochetcharms@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition duration-300"
>
  <FaEnvelope size={28} />
</a>

      <a
        href="https://wa.me/919519499698"
        target="_blank"
        rel="noopener noreferrer"
       className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition duration-300"
      >
        <FaWhatsapp size={28}/>
      </a>

    </div>

  </div>

</div>

     <div className="border-t border-pink-200 mt-10 pt-6 text-center text-gray-600">

 © 2026 The Crochet Charm. All Rights Reserved.

🧶 Handmade with ❤️ in India


</div>

    </footer>
  );
}
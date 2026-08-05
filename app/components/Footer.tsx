import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaBoxOpen,
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ background: "#F8EEE4", borderTop: "1px solid #EED2BD" }}>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <img
            src="/images/logo.png"
            alt="The Crochet Charm"
            className="w-24 h-24 rounded-full shadow-lg hover:scale-110 transition duration-300 hover:rotate-3"
          />

          <h2 className="text-2xl font-bold mt-4" style={{ color: "#4A3024" }}>
            The Crochet Charm
          </h2>

          <p className="mt-3 leading-7" style={{ color: "#5F4A40" }}>
            Premium handmade crochet gifts, bouquets, hair accessories,
            and personalized creations crafted with love for every special moment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-5" style={{ color: "#4A3024" }}>
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaHome className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaBoxOpen className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Products</span>
              </Link>
            </li>

            <li>
              <Link
                href="/my-orders"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaBoxOpen className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>My Orders</span>
              </Link>
            </li>

            <li>
              <Link
                href="/#contact"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaPhoneAlt className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-bold text-xl mb-5" style={{ color: "#4A3024" }}>
            Policies
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/shipping-policy"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaShippingFast className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Shipping Policy</span>
              </Link>
            </li>

            <li>
              <Link
                href="/refund-policy"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaUndoAlt className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Refund Policy</span>
              </Link>
            </li>

            <li>
              <Link
                href="/privacy-policy"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaShieldAlt className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Privacy Policy</span>
              </Link>
            </li>

            <li>
              <Link
                href="/terms"
                className="flex items-center gap-3 transition"
                style={{ color: "#5F4A40" }}
              >
                <FaFileContract className="w-5 h-5 flex-shrink-0" style={{ color: "#A84F40" }} />
                <span>Terms & Conditions</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-bold text-xl mb-5" style={{ color: "#4A3024" }}>
            Connect With Us
          </h3>

          <p className="flex items-center gap-2 mb-3" style={{ color: "#5F4A40" }}>
            <FaEnvelope style={{ color: "#A84F40" }} />
            thecrochetcharms@gmail.com
          </p>

          <p className="flex items-center gap-2 mb-5" style={{ color: "#5F4A40" }}>
            <FaPhoneAlt style={{ color: "#A84F40" }} />
            +91 9519499698
          </p>

          <div className="flex gap-5">
            <a
              href="https://instagram.com/thecrochetcharms"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition duration-300 shadow-sm"
              style={{ background: "#FFF9F3", color: "#A84F40", border: "1px solid #EED2BD" }}
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=thecrochetcharms@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition duration-300 shadow-sm"
              style={{ background: "#FFF9F3", color: "#A84F40", border: "1px solid #EED2BD" }}
            >
              <FaEnvelope size={20} />
            </a>

            <a
              href="https://wa.me/919519499698"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center transition duration-300 shadow-sm"
              style={{ background: "#FFF9F3", color: "#A84F40", border: "1px solid #EED2BD" }}
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t py-6 text-center" style={{ borderColor: "#EED2BD", color: "#5F4A40" }}>
        © 2026 The Crochet Charm. All Rights Reserved. 🧶 Handmade with ❤️ in India
      </div>

    </footer>
  );
}
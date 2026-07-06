"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/919519499698?text=Hi!%20I%20need%20help%20with%20The%20Crochet%20Charm."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:bg-green-600 hover:scale-110 hover:shadow-green-400/50 animate-bounce">
        <FaWhatsapp className="text-3xl" />

        <div className="hidden md:block transition-all duration-300 group-hover:translate-x-1">
          <p className="text-sm font-semibold">
            Need Help?
          </p>

          <p className="text-xs">
            Chat with us
          </p>
        </div>

      </div>
    </a>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pink-700 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold">
            The Crochet Charm
          </h2>

          <p className="mt-4 text-pink-100">
            Handmade crochet gifts crafted with love,
            care and creativity.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li><Link href="/">Home</Link></li>

            <li><Link href="/products">Products</Link></li>

            <li><Link href="/my-orders">My Orders</Link></li>

            <li><Link href="/contact">Contact</Link></li>

          </ul>

        </div>

        <div>

          <h3 className="font-bold mb-4">
            Policies
          </h3>

          <ul className="space-y-2">

            <li><Link href="/shipping-policy">Shipping Policy</Link></li>

            <li><Link href="/refund-policy">Refund Policy</Link></li>

            <li><Link href="/privacy-policy">Privacy Policy</Link></li>

            <li><Link href="/terms">Terms & Conditions</Link></li>

          </ul>

        </div>

        <div>

          <h3 className="font-bold mb-4">
            Follow Us
          </h3>

          <ul className="space-y-2">

            <li>Instagram</li>

            <li>Facebook</li>

            <li>Pinterest</li>

            <li>WhatsApp</li>

          </ul>

        </div>

      </div>

      <div className="border-t border-pink-500 py-5 text-center text-sm">

        © 2026 The Crochet Charm.
        All Rights Reserved.

      </div>

    </footer>
  );
}
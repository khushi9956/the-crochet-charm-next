import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { order } = await searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-[30px] shadow-2xl overflow-hidden">

        {/* Top Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center py-10">

          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg">
            ✅
          </div>

          <h1 className="text-4xl font-bold mt-6">
            Payment Successful
          </h1>

          <p className="mt-3 text-pink-100">
            Thank you for shopping with
          </p>

          <h2 className="text-2xl font-bold mt-1">
            The Crochet Charm
          </h2>

        </div>

        {/* Content */}
        <div className="p-8">

          <p className="text-center text-gray-600 text-lg">
            Your order has been placed successfully.
            <br />
            We have received your payment and will start preparing your handmade crochet products shortly.
          </p>

          {order && (
            <div className="mt-8 bg-pink-50 border border-pink-200 rounded-2xl p-6 text-center">

              <p className="text-gray-500 uppercase tracking-widest text-sm">
                Order Number
              </p>
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
  <h4 className="font-bold text-green-700">
    📧 Confirmation Email Sent
  </h4>

  <p className="text-sm text-gray-600 mt-2">
    We've sent your order confirmation to your email.
  </p>
</div>

              <h3 className="text-3xl font-bold text-pink-600 mt-2">
                {order}
              </h3>

            </div>
          )}

          {/* Info Cards */}

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <div className="bg-pink-50 rounded-2xl p-5 text-center">

              <div className="text-3xl">🚚</div>

              <h4 className="font-bold mt-3">
                Fast Delivery
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Your handmade order will be packed carefully.
              </p>

            </div>

            <div className="bg-pink-50 rounded-2xl p-5 text-center">

              <div className="text-3xl">💖</div>

              <h4 className="font-bold mt-3">
                Handmade with Love
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Every crochet product is crafted with care.
              </p>

            </div>

            <div className="bg-pink-50 rounded-2xl p-5 text-center">

              <div className="text-3xl">📦</div>

              <h4 className="font-bold mt-3">
                Order Tracking
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Track your order anytime from My Orders.
              </p>

            </div>

          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">

  <h4 className="font-bold text-lg">
    🚚 Estimated Delivery
  </h4>

  <p className="text-gray-600 mt-2">
    Your handmade products will arrive in
  </p>

  <p className="text-2xl font-bold text-pink-600 mt-2">
    3–7 Business Days
  </p>

</div>

          {/* Buttons */}

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            {order && (

              <Link
                href={`/order/${order}`}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl text-center font-semibold transition"
              >
                View Order
              </Link>

            )}

            <Link
              href="/products"
              className="flex-1 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 py-4 rounded-2xl text-center font-semibold transition"
            >
              Continue Shopping
            </Link>
<a
  href="https://wa.me/919519499698"
  target="_blank"
  className="block mt-5 bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-semibold"
>
  💬 Contact on WhatsApp
</a>
          </div>
<div className="mt-10 border-t border-pink-100 pt-6 text-center">

  <h3 className="text-2xl font-bold text-pink-600">
    🌸 Thank You! 🌸
  </h3>

  <p className="mt-3 text-gray-600 leading-7">
    Every crochet piece is lovingly handmade just for you.
    Thank you for supporting a small handmade business.
    Your purchase truly means the world to us. ❤️
  </p>

  <p className="mt-4 italic text-pink-500 font-medium">
    "Every stitch is made with love."
  </p>

</div>
        </div>

      </div>

    </main>
  );
}
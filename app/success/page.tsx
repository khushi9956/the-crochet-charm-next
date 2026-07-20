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

          </div>

        </div>

      </div>

    </main>
  );
}
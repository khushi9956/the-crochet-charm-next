"use client";

import { useState } from "react";
import Link from "next/link";

export default function MyOrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-orders/?email=${email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
          My Orders
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Find Your Orders
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border rounded-xl p-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={fetchOrders}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 rounded-xl"
            >
              {loading ? "Loading..." : "Find Orders"}
            </button>

          </div>

        </div>

        {orders.length === 0 && !loading && (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-500">
              No Orders Found
            </h2>

            <p className="text-gray-400 mt-2">
              Place your first order to see it here.
            </p>

          </div>

        )}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.order_number}
              className="bg-white rounded-3xl shadow-lg p-6"
            >

              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div>

                  <h2 className="text-2xl font-bold text-pink-600">
                    {order.order_number}
                  </h2>

                  <p className="mt-2">
                    Customer : {order.customer_name}
                  </p>

                  <p>
                    Total : ₹{order.total}
                  </p>

                </div>
                {/* Order Tracking */}

<div className="bg-white rounded-2xl shadow-md p-6 mb-6">

  <h2 className="text-xl font-bold text-pink-600 mb-6">
    Order Tracking
  </h2>

  <div className="space-y-5">

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
        ✓
      </div>

      <div>
        <h3 className="font-semibold">
          Order Confirmed
        </h3>
        <p className="text-gray-500 text-sm">
          Your payment has been received.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center">
        📦
      </div>

      <div>
        <h3 className="font-semibold">
          Preparing
        </h3>
        <p className="text-gray-500 text-sm">
          Handmade crochet product is being prepared.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
        🚚
      </div>

      <div>
        <h3 className="font-semibold">
          Shipped
        </h3>
        <p className="text-gray-500 text-sm">
          Your parcel will be shipped soon.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
        🏠
      </div>

      <div>
        <h3 className="font-semibold">
          Delivered
        </h3>
        <p className="text-gray-500 text-sm">
          Package delivered successfully.
        </p>
      </div>
    </div>

  </div>

</div>

                <div className="text-right">

                  <span className="bg-green-100 text-greem-700 px-4 py-2 rounded-full text-sm">
                    {order.payment_status}
                  </span>

                  <br />

                  <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                    {order.order_status}
                  </span>

                </div>

              </div>

              <Link
                href={`/order/${order.order_number}`}
                className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl transition"
              >
                View Details
              </Link>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
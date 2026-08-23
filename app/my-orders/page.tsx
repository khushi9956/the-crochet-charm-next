"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  order_number: string;
  customer_name: string;
  total: number;
  payment_status: string;
  order_status: string;
  created_at: string;
};

export default function MyOrdersPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();

      if (!token) {
        setError("Please sign in to view your orders.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-orders/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.detail ||
            data?.error ||
            "Unable to fetch your orders."
        );
      }

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchOrders();
    }

    if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#FFF9F3] flex items-center justify-center">
        <p className="text-[#A84F40] font-semibold">
          Loading...
        </p>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#FFF9F3] py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center border border-[#EED2BD]">
          <h1 className="text-3xl font-bold text-[#A84F40]">
            Please Sign In
          </h1>

          <p className="text-[#5F4A40] mt-3">
            Sign in to view your orders.
          </p>

          <Link
            href="/login"
            className="inline-block mt-6 bg-[#A84F40] hover:bg-[#923F31] text-white px-8 py-3 rounded-xl transition"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F3] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-[#A84F40] mb-3">
          My Orders
        </h1>

        <p className="text-center text-[#5F4A40] mb-10">
          Orders for{" "}
          <span className="font-semibold">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
        </p>

        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-[#EED2BD]">
            <p className="text-[#A84F40] font-semibold">
              Loading your orders...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-red-200">
            <h2 className="text-2xl font-bold text-red-600">
              Unable to Load Orders
            </h2>

            <p className="text-gray-600 mt-2">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="mt-6 bg-[#A84F40] hover:bg-[#923F31] text-white px-6 py-3 rounded-xl transition"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-[#EED2BD]">

            <h2 className="text-2xl font-bold text-[#5F4A40]">
              No Orders Found
            </h2>

            <p className="text-[#5F4A40] mt-2">
              Place your first order to see it here.
            </p>

          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.order_number}
                className="bg-white rounded-3xl shadow-lg p-6 border border-[#EED2BD]"
              >

                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-bold text-[#A84F40]">
                      {order.order_number}
                    </h2>

                    <p className="mt-2 text-[#5F4A40]">
                      Customer : {order.customer_name}
                    </p>

                    <p className="text-[#5F4A40]">
                      Total : ₹{order.total}
                    </p>

                  </div>

                  <div className="text-right">

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                      {order.payment_status}
                    </span>

                    <br />

                    <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      {order.order_status}
                    </span>

                  </div>

                </div>

                {/* Order Tracking */}

                <div className="bg-white rounded-2xl shadow-md p-6 mt-6 border border-[#EED2BD]">

                  <h2 className="text-xl font-bold text-[#A84F40] mb-6">
                    Order Tracking
                  </h2>

                  <div className="space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#4A3024]">
                          Order Confirmed
                        </h3>

                        <p className="text-[#5F4A40] text-sm">
                          Your payment has been received.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center">
                        📦
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#4A3024]">
                          Preparing
                        </h3>

                        <p className="text-[#5F4A40] text-sm">
                          Handmade crochet product is being prepared.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
                        🚚
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#4A3024]">
                          Shipped
                        </h3>

                        <p className="text-[#5F4A40] text-sm">
                          Your parcel will be shipped soon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
                        🏠
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#4A3024]">
                          Delivered
                        </h3>

                        <p className="text-[#5F4A40] text-sm">
                          Package delivered successfully.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                <Link
                  href={`/order/${order.order_number}`}
                  className="inline-block mt-6 bg-[#A84F40] hover:bg-[#923F31] text-white px-6 py-3 rounded-xl transition"
                >
                  View Details
                </Link>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}
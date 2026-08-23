"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const params = useParams();

  const orderNumber = params.orderNumber as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded || !orderNumber) return;

    const fetchOrder = async () => {
      if (!isSignedIn) {
        setError("Please sign in to view this order.");
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();

        if (!token) {
          setError("Please sign in to view your orders.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderNumber}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (!res.ok) {
          setError(
            result?.error ||
              result?.detail ||
              "Unable to load order."
          );
          return;
        }

        setData(result);
      } catch (err) {
        console.error(err);
        setError(
          "Something went wrong while loading the order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [isLoaded, isSignedIn, orderNumber, getToken]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <h1 className="text-xl font-semibold text-pink-600">
          Loading order...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            {error}
          </h1>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-pink-600">
            Order #{data.order_number}
          </h1>

          <div className="flex gap-3 mt-4">
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
              {data.payment_status}
            </span>

            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              {data.order_status}
            </span>
          </div>
        </div>

        {/* Customer */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-pink-600 mb-4">
            Customer Details
          </h2>

          <p>
            <strong>Name:</strong> {data.customer_name}
          </p>

          <p>
            <strong>Phone:</strong> {data.phone}
          </p>

          <p>
            <strong>Address:</strong> {data.address}
          </p>

          <p>
            <strong>City:</strong> {data.city}
          </p>

          <p>
            <strong>State:</strong> {data.state}
          </p>

          <p>
            <strong>Pincode:</strong> {data.pincode}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold text-pink-600 mb-4">
            Products
          </h2>

          {data.items?.map(
            (item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-4"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                  }
                  alt={
                    item.product_name || "Product"
                  }
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {item.product_name}
                  </h3>

                  <p>₹{item.price}</p>

                  <p>
                    Qty : {item.quantity}
                  </p>
                </div>
              </div>
            )
          )}

        </div>

        {/* Total */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex justify-between mb-3">
            <span>Delivery Charge</span>
            <span>₹{data.delivery_charge}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold text-pink-600">
            <span>Total</span>
            <span>₹{data.total}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
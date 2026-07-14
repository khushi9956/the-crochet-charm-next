"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedData = data.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    setCart(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
  }, []);

  const deliveryCharge = 60;

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const total =
    subtotal + (cart.length > 0 ? deliveryCharge : 0);

  const removeItem = (id: number) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (
    id: number,
    action: "increase" | "decrease"
  ) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (action === "increase") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        if (
          action === "decrease" &&
          item.quantity > 1
        ) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <main className="min-h-screen bg-pink-50 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-pink-700 mb-10">
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-bold text-pink-700">
              Your Cart is Empty 🛍️
            </h2>

            <p className="text-gray-500 mt-3 mb-8">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

         {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col md:flex-row gap-6 items-center"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-cover rounded-2xl border"
                  />

                  <div className="flex-1 w-full">

                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-pink-600 text-xl font-bold mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-5">

                      <span className="font-medium">
                        Quantity
                      </span>

                      <div className="flex items-center border rounded-full overflow-hidden">

                        <button
                          onClick={() =>
                            updateQuantity(item.id, "decrease")
                          }
                          className="px-4 py-2 bg-pink-100 hover:bg-pink-200 font-bold"
                        >
                          −
                        </button>

                        <span className="px-5 font-bold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, "increase")
                          }
                          className="px-4 py-2 bg-pink-100 hover:bg-pink-200 font-bold"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <p className="mt-4 text-lg">
                      <span className="text-gray-600">
                        Subtotal :
                      </span>

                      <span className="ml-2 font-bold text-pink-700">
                        ₹{item.price * item.quantity}
                      </span>
                    </p>

                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-8">

              <h2 className="text-3xl font-bold text-pink-700 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery</span>
                <span>₹{deliveryCharge}</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link
              className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl text-lg font-semibold transition border border-pink-600 text-center "
  href="/checkout?type=cart"
  onClick={() => {
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
  }}
>
                Proceed to Checkout 💚
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function CartPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
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

  const requireAuth = useCallback(() => {
    if (!isLoaded) return false;
    if (!isSignedIn) {
      router.push("/login");
      return false;
    }
    return true;
  }, [isLoaded, isSignedIn, router]);

  const handleCheckout = (e: React.MouseEvent) => {
    if (!requireAuth()) {
      e.preventDefault();
      return;
    }
    localStorage.setItem("checkoutCart", JSON.stringify(cart));
  };

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
    <main className="min-h-screen bg-[#FFF9F3] py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#4A3024] mb-10">
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-[#EED2BD]">

            <h2 className="text-3xl font-bold text-[#4A3024]">
              Your Cart is Empty 🛍️
            </h2>

            <p className="text-[#5F4A40] mt-3 mb-8">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/products"
              className="bg-[#A84F40] hover:bg-[#923F31] text-white px-8 py-3 rounded-xl"
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
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col md:flex-row gap-6 items-center border border-[#EED2BD]"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-cover rounded-2xl border border-[#EED2BD]"
                  />

                  <div className="flex-1 w-full">

                    <h2 className="text-2xl font-bold text-[#4A3024]">
                      {item.name}
                    </h2>

                    <p className="text-[#A84F40] text-xl font-bold mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-5">

                      <span className="font-medium text-[#5F4A40]">
                        Quantity
                      </span>

                      <div className="flex items-center border border-[#EED2BD] rounded-full overflow-hidden">

                        <button
                          onClick={() =>
                            updateQuantity(item.id, "decrease")
                          }
                          className="px-4 py-2 bg-[#F8EEE4] hover:bg-[#EED2BD] font-bold text-[#4A3024]"
                        >
                          −
                        </button>

                        <span className="px-5 font-bold text-lg text-[#4A3024]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, "increase")
                          }
                          className="px-4 py-2 bg-[#F8EEE4] hover:bg-[#EED2BD] font-bold text-[#4A3024]"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <p className="mt-4 text-lg">
                      <span className="text-[#5F4A40]">
                        Subtotal :
                      </span>

                      <span className="ml-2 font-bold text-[#4A3024]">
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

            <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-8 border border-[#EED2BD]">

              <h2 className="text-3xl font-bold text-[#4A3024] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-[#5F4A40]">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mb-4 text-[#5F4A40]">
                <span>Delivery</span>
                <span>₹{deliveryCharge}</span>
              </div>

              <hr className="my-5 border-[#EED2BD]" />

              <div className="flex justify-between text-2xl font-bold text-[#4A3024]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link
              className={`w-full mt-8 text-white py-4 rounded-2xl text-lg font-semibold transition text-center block ${!isLoaded ? "opacity-50 pointer-events-none bg-gray-400" : "bg-[#A84F40] hover:bg-[#923F31]"}`}
  href="/checkout"
  onClick={handleCheckout}
>
                {isLoaded ? "Proceed to Checkout 💚" : "Loading..."}
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}

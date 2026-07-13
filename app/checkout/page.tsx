"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {

  const [product, setProduct] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    
    const data = localStorage.getItem("buyNow");

    if (data) {
      setProduct(JSON.parse(data));
    }
  }, []);
  const deliveryCharge = 40;

const total =
  Number(product?.price || 0) + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handlePayment = async () => {
  if (
    !form.name ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.pincode
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await fetch(
      "https://the-crochet-charm-api.onrender.com/api/create-order/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100,
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "The Crochet Charm",
      description: product.name,
      image: "/images/logo.png",
      order_id: order.id,

      handler: function (response: any) {
        alert(
          "Payment Successful!\nPayment ID: " +
            response.razorpay_payment_id
        );
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#ec4899",
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  } catch (error) {
    console.error(error);
    alert("Unable to start payment.");
  }
};

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-pink-600">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 py-12">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 px-6">

        {/* Checkout Form */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-pink-700 mb-8">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="border rounded-xl p-4 md:col-span-2"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              className="border rounded-xl p-4 md:col-span-2 h-32"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-8">

          <h2 className="text-2xl font-bold text-pink-700 mb-6">
            Order Summary
          </h2>

          <div className="flex items-center gap-4 mb-6">

            <img
           src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-xl border"
            />
            

            <div>

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-pink-600 text-xl font-bold">
                ₹{product.price}
              </p>

            </div>

          </div>

          <div className="flex justify-between mb-3">
  <span>Delivery Charges</span>
  <span className="font-semibold">
    ₹{deliveryCharge}
  </span>
</div>

          <hr className="my-5"/>

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span>
  ₹{total}
</span>
          </div>
                    <button
          onClick={handlePayment}

        

  className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
>
  💳 Pay Now
</button>

      </div>

    </main>
  );
}
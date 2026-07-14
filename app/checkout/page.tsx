"use client";

import { useEffect, useState } from "react";


export default function CheckoutPage() {

  

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

 useEffect(() => {
  const checkoutCart = JSON.parse(
    localStorage.getItem("checkoutCart") || "[]"
  );

  if (checkoutCart.length > 0) {
    setProducts(checkoutCart);
  } else {
    const buy = JSON.parse(
      localStorage.getItem("buyNow") || "null"
    );

    if (buy) {
      setProducts([buy]);
    }
  }

  setLoading(false);
}, []);

  

  const deliveryCharge =
    products.length > 0 ? 40 : 0;

  const subtotal = products.reduce(

    (sum, item) =>

      sum +
      Number(item.price) *
      (item.quantity || 1),

    0

  );

  const total =
    subtotal + deliveryCharge;

  const handleChange = (

    e:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >

  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

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

    if (!response.ok) {
      throw new Error("Unable to create order");
    }

    const order = await response.json();
    alert("Order ID: " + order.id);
    
    console.log("Order:", order);
    const options = {

      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "The Crochet Charm",

      description: "Handmade Crochet Products",

      image: "/images/logo.png",

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#db2777",
      },

      handler: async function (response:any){

const verify=await fetch(

"https://the-crochet-charm-api.onrender.com/api/verify-payment/",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(response)

}

);

const data=await verify.json();

if(data.success){

alert("Payment Successful ❤️");

localStorage.removeItem("buyNow");

localStorage.removeItem("checkoutCart");

localStorage.removeItem("cart");

window.location.href="/success";

}else{

alert("Payment Verification Failed");

}

}
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.open();

  } 
 catch (error: any) {
  console.error("Payment Error:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert(String(error));
  }
}


};
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-pink-600">

        Loading Checkout...

      </div>

    );

  }
  return (

<main className="min-h-screen bg-pink-50 py-12">

<div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 px-6">

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

placeholder="Email"

value={form.email}

onChange={handleChange}

className="border rounded-xl p-4 md:col-span-2"

/>
<textarea

name="address"

placeholder="Complete Address"

value={form.address}

onChange={handleChange}

className="border rounded-xl p-4 h-32 md:col-span-2"

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

        <h2 className="text-3xl font-bold text-pink-700 mb-8">

          Order Summary

        </h2>

        <div className="space-y-6">

          {products.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-5"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-2xl object-cover border"
              />

              <div className="flex-1">

                <h3 className="font-bold text-lg">

                  {item.name}

                </h3>

                <p className="text-pink-600 font-semibold">

                  ₹{item.price}

                </p>

                <p className="text-gray-500 text-sm">

                  Qty : {item.quantity || 1}

                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between">

            <span>Subtotal</span>

            <span>₹{subtotal}</span>

          </div>

          <div className="flex justify-between">

            <span>Delivery Charges</span>

            <span>₹{deliveryCharge}</span>

          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-pink-700">

              ₹{total}

            </span>

          </div>

        </div>
        <button
  onClick={handlePayment}
  className="w-full mt-8 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
>
  💳 Pay now
</button>

      </div>

    </div>

  </main>

);
}
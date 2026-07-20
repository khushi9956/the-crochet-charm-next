interface PageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  const { orderNumber } = await params;

  const res = await fetch(
    `http://127.0.0.1:8000/api/order/${orderNumber}/`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-600">
          {data.error}
        </h1>
      </div>
    );
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

          <p><strong>Name:</strong> {data.customer_name}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Address:</strong> {data.address}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>State:</strong> {data.state}</p>
          <p><strong>Pincode:</strong> {data.pincode}</p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold text-pink-600 mb-4">
            Products
          </h2>

          {data.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-4"
            >
              <img
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.name}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p>₹{item.price}</p>

                <p>Qty : {item.quantity}</p>
              </div>
            </div>
          ))}

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
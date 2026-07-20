export default function PrivacyPolicy() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-8">

        <p>
          At The Crochet Charm, we value your privacy and are committed to protecting your personal information.
        </p>

        <h2 className="text-2xl font-semibold">
          Information We Collect
        </h2>

        <ul className="list-disc ml-6">
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Shipping Address</li>
        </ul>

        <h2 className="text-2xl font-semibold">
          How We Use Your Information
        </h2>

        <ul className="list-disc ml-6">
          <li>Process your orders</li>
          <li>Provide customer support</li>
          <li>Send order updates</li>
          <li>Improve our services</li>
        </ul>

      </div>
    </main>
  );
}
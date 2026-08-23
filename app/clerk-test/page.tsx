"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ClerkTestPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult("");

    try {
      const token = await getToken();

      if (!token) {
        setResult("No Clerk token found. Please sign in first.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/clerk-test/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
const testMyOrders = async () => {
  setLoading(true);
  setResult("");

  try {
    const token = await getToken();

    if (!token) {
      setResult("No Clerk token found. Please sign in first.");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/my-orders/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setResult(JSON.stringify(data, null, 2));
  } catch (error) {
    setResult(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};
      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-pink-700">
          Clerk Authentication Test 🔐
        </h1>

        <p className="text-gray-500 mt-3">
          This page tests Clerk → Django authentication.
        </p>

        {!isSignedIn ? (
          <div className="mt-8 p-4 rounded-2xl bg-yellow-50 text-yellow-700">
            Please sign in to The Crochet Charm first.
          </div>
        ) : (
          <>
            <div className="mt-6 p-4 rounded-2xl bg-pink-50">
              <p className="font-semibold text-gray-700">
                Signed in as:
              </p>

              <p className="text-pink-700 mt-1">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <button
              onClick={testBackend}
              disabled={loading}
              className="w-full mt-6 py-4 rounded-2xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold transition"
            >
              {loading
                ? "Testing..."
                : "Test Django Authentication"}
            </button>
            <button
  onClick={testMyOrders}
  disabled={loading}
  className="w-full mt-4 py-4 rounded-2xl bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white font-bold transition"
>
  {loading ? "Testing..." : "Test My Orders"}
</button>

            {result && (
              <pre className="mt-6 p-4 rounded-2xl bg-gray-900 text-green-400 text-sm overflow-auto">
                {result}
              </pre>
            )}
          </>
        )}

      </div>
    </main>
  );
}
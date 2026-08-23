"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="hidden md:flex relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-400 text-white p-12 flex-col justify-center items-center text-center">

          <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-center opacity-20" />

          <div className="relative z-10">

            <img
              src="/images/logo.png"
              alt="The Crochet Charm"
              className="w-36 h-36 rounded-full bg-white p-2 shadow-2xl mx-auto"
            />

            <h1 className="text-4xl font-bold mt-8">
              The Crochet Charm
            </h1>

            <p className="text-pink-100 text-lg mt-4 leading-8">
              Handmade creations crafted with love,
              <br />
              specially made for you. 🧶💖
            </p>

            <div className="mt-8 flex justify-center gap-3 text-2xl">
              🌸 🧶 🎁 💖
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12 md:p-14">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 transition mb-8"
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          <div className="text-center md:text-left">

            <div className="md:hidden flex justify-center mb-6">
              <img
                src="/images/logo.png"
                alt="The Crochet Charm"
                className="w-24 h-24 rounded-full shadow-lg"
              />
            </div>

            <h2 className="text-4xl font-bold text-pink-700">
              Welcome Back 💖
            </h2>

            <p className="text-gray-500 mt-3">
              Sign in to continue your Crochet Charm journey.
            </p>

          </div>

          <form className="mt-8 space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-4 rounded-2xl border border-pink-200 bg-pink-50/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">

                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 pr-14 rounded-2xl border border-pink-200 bg-pink-50/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Sign In 💖
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-pink-100" />
            <span className="text-sm text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-pink-100" />
          </div>

          {/* Google - UI only for now */}
          <button
            type="button"
            className="w-full py-4 rounded-2xl border-2 border-pink-100 text-gray-700 font-semibold hover:bg-pink-50 transition"
          >
            <span className="mr-2">G</span>
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-pink-600 font-bold hover:text-pink-700"
            >
              Create Account
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-6">
            Your account information is kept secure and private.
          </p>

        </div>

      </div>

    </main>
  );
}
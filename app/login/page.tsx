"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import {
  SignIn,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";

export default function LoginPage() {
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

          <div className="text-center">

            <div className="md:hidden flex justify-center mb-6">
              <img
                src="/images/logo.png"
                alt="The Crochet Charm"
                className="w-24 h-24 rounded-full shadow-lg"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-pink-700">
              Welcome to The Crochet Charm 💖
            </h2>

            <p className="text-gray-500 mt-3">
              Login or create your account to continue.
            </p>

          </div>

          <div className="mt-8">

            <ClerkLoading>
              <div className="w-full flex justify-center py-10">
                <div className="h-8 w-8 rounded-full border-4 border-pink-200 border-t-pink-600 animate-spin" />
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              <SignIn
                routing="hash"
                appearance={{
                  variables: {
  colorPrimary: "#db2777",
  borderRadius: "1rem",
},

                  elements: {
                    rootBox: "w-full",
                    card: "w-full shadow-none border-0 p-0",

                    headerTitle: "hidden",
                    headerSubtitle: "hidden",

                    socialButtonsBlockButton:
                      "w-full py-4 rounded-2xl border-2 border-pink-100 text-gray-700 font-semibold hover:bg-pink-50 transition",

                    socialButtonsProviderIcon:
                      "w-5 h-5",

                    dividerLine:
                      "bg-pink-100",

                    dividerText:
                      "text-gray-400",

                    formFieldLabel:
                      "text-gray-700 font-semibold",

                    formFieldInput:
                      "rounded-2xl border border-pink-200 bg-pink-50/40 px-5 py-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200",

                    formButtonPrimary:
                      "w-full bg-pink-600 hover:bg-pink-700 text-white rounded-2xl py-4 font-bold text-base shadow-lg",

                    footerActionLink:
                      "text-pink-600 hover:text-pink-700 font-bold",

                    identityPreviewEditButton:
                      "text-pink-600",

                    otpCodeFieldInput:
                      "rounded-xl border-pink-200 text-center",

                    formResendCodeLink:
                      "text-pink-600 font-semibold",

                    alert:
                      "rounded-xl",
                  },
                }}
              />
            </ClerkLoaded>

          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Your account information is kept secure and private.
          </p>

        </div>

      </div>

    </main>
  );
}
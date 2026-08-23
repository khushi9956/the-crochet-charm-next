"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-700">
            My Account 💖
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your Crochet Charm account and profile.
          </p>
        </div>

        <div className="flex justify-center">
          <UserProfile
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full max-w-4xl",
                card: "shadow-xl rounded-[28px] border border-pink-100",
                navbar: "bg-pink-50/50",
                navbarButton:
                  "text-gray-600 hover:text-pink-600",
                navbarButtonActive:
                  "text-pink-600 border-pink-500",
                pageScrollBox: "bg-white",
                formButtonPrimary:
                  "bg-pink-600 hover:bg-pink-700",
                formFieldInput:
                  "rounded-xl border-pink-200",
              },
            }}
          />
        </div>

      </div>
    </main>
  );
}
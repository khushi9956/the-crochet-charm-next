"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { isLoaded } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"identifier" | "password" | "otp">("identifier");
  const [safeIdentifier, setSafeIdentifier] = useState("");
  const [otpIsEmail, setOtpIsEmail] = useState(true);

  const resetToIdentifier = () => {
    setStep("identifier");
    setError("");
    setPassword("");
    setOtpCode("");
  };

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn || !identifier.trim()) return;

    setLoading(true);
    setError("");

    try {
      const { error: createError } = await signIn.create({ identifier: identifier.trim() });

      if (createError) {
        if (createError.code === "form_identifier_not_found") {
          setError("Your account doesn't exist. Please sign up first.");
        } else {
          setError(createError.longMessage || "Something went wrong. Please try again.");
        }
        return;
      }

      setSafeIdentifier(signIn.identifier || identifier.trim());
      const strategies = signIn.supportedFirstFactors || [];

      const passwordStrategy = strategies.find((s) => s.strategy === "password");
      const emailCodeStrategy = strategies.find((s) => s.strategy === "email_code");
      const phoneCodeStrategy = strategies.find((s) => s.strategy === "phone_code");

      if (passwordStrategy) {
        setStep("password");
      } else if (emailCodeStrategy) {
        setOtpIsEmail(true);
        const { error: sendError } = await signIn.emailCode.sendCode();
        if (sendError) {
          setError(sendError.longMessage || "Failed to send verification code.");
          return;
        }
        setStep("otp");
      } else if (phoneCodeStrategy) {
        setOtpIsEmail(false);
        const { error: sendError } = await signIn.phoneCode.sendCode();
        if (sendError) {
          setError(sendError.longMessage || "Failed to send verification code.");
          return;
        }
        setStep("otp");
      } else {
        setError("No supported sign-in method found. Please contact support.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn || !password) return;

    setLoading(true);
    setError("");

    try {
      const { error: passwordError } = await signIn.password({ password });

      if (passwordError) {
        if (passwordError.code === "incorrect_password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError(passwordError.longMessage || "Something went wrong. Please try again.");
        }
        return;
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setError(finalizeError.longMessage || "Failed to complete sign-in.");
        return;
      }

      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn || !otpCode) return;

    setLoading(true);
    setError("");

    try {
      let verifyResult;
      if (otpIsEmail) {
        verifyResult = await signIn.emailCode.verifyCode({ code: otpCode });
      } else {
        verifyResult = await signIn.phoneCode.verifyCode({ code: otpCode });
      }

      if (verifyResult.error) {
        if (verifyResult.error.code === "incorrect_code") {
          setError("Incorrect code. Please try again.");
        } else {
          setError(verifyResult.error.longMessage || "Something went wrong. Please try again.");
        }
        return;
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setError(finalizeError.longMessage || "Failed to complete sign-in.");
        return;
      }

      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signIn) return;
    setError("");
    setOtpCode("");
    try {
      if (otpIsEmail) {
        await signIn.emailCode.sendCode();
      } else {
        await signIn.phoneCode.sendCode();
      }
    } catch {
      // Ignore resend errors
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden">
        {/* Left Side — branding */}
        <div className="hidden md:flex relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-400 text-white p-12 flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative z-10">
            <img src="/images/logo.png" alt="The Crochet Charm" className="w-36 h-36 rounded-full bg-white p-2 shadow-2xl mx-auto" />
            <h1 className="text-4xl font-bold mt-8">The Crochet Charm</h1>
            <p className="text-pink-100 text-lg mt-4 leading-8">
              Handmade creations crafted with love,<br />specially made for you.
            </p>
            <div className="mt-8 flex justify-center gap-3 text-2xl">🌸 🧶 🎁 💖</div>
          </div>
        </div>

        {/* Right Side — Login Form */}
        <div className="p-8 sm:p-12 md:p-14">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 transition mb-8">
            <FaArrowLeft /> Back to Home
          </Link>
          <div className="text-center">
            <div className="md:hidden flex justify-center mb-6">
              <img src="/images/logo.png" alt="The Crochet Charm" className="w-24 h-24 rounded-full shadow-lg" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-700">Welcome to The Crochet Charm 💖</h2>
            <p className="text-gray-500 mt-3">Login to your account to continue.</p>
          </div>

          <div className="mt-8">
            {!isLoaded ? (
              <div className="w-full flex justify-center py-10">
                <div className="h-8 w-8 rounded-full border-4 border-pink-200 border-t-pink-600 animate-spin" />
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2">
                    <span className="mt-0.5">⚠️</span>
                    <div>
                      {error}
                      {error.includes("doesn't exist") && (
                        <>{" "}
                          <Link href="/signup" className="font-bold underline hover:text-red-700">
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {step === "identifier" && (
                  <form onSubmit={handleIdentifierSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or username"
                        className="w-full rounded-2xl border border-pink-200 bg-pink-50/40 px-5 py-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none text-gray-700 placeholder:text-gray-400"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !identifier.trim()}
                      className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white rounded-2xl py-4 font-bold text-base shadow-lg transition"
                    >
                      {loading ? "Checking..." : "Continue"}
                    </button>
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-pink-600 hover:text-pink-700 font-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </form>
                )}

                {step === "password" && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    <p className="text-sm text-gray-500">
                      Signing in as <span className="font-semibold text-gray-700">{safeIdentifier}</span>
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-2xl border border-pink-200 bg-pink-50/40 px-5 py-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none text-gray-700 placeholder:text-gray-400"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !password}
                      className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white rounded-2xl py-4 font-bold text-base shadow-lg transition"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                    <button
                      type="button"
                      onClick={resetToIdentifier}
                      className="w-full text-sm text-gray-500 hover:text-pink-600 transition"
                    >
                      ← Use a different email
                    </button>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleOtpSubmit} className="space-y-5">
                    <p className="text-sm text-gray-500">
                      We sent a verification code to <span className="font-semibold text-gray-700">{safeIdentifier}</span>
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter the code"
                        className="w-full rounded-2xl border border-pink-200 bg-pink-50/40 px-5 py-4 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none text-gray-700 placeholder:text-gray-400 text-center text-lg tracking-widest"
                        autoFocus
                        maxLength={8}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !otpCode}
                      className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white rounded-2xl py-4 font-bold text-base shadow-lg transition"
                    >
                      {loading ? "Verifying..." : "Verify"}
                    </button>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="w-full text-sm text-pink-600 font-semibold hover:text-pink-700 transition"
                    >
                      Resend code
                    </button>
                    <button
                      type="button"
                      onClick={resetToIdentifier}
                      className="w-full text-sm text-gray-500 hover:text-pink-600 transition"
                    >
                      ← Use a different email
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Your account information is kept secure and private.
          </p>
        </div>
      </div>
    </main>
  );
}

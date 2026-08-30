"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useState } from "react";

// ── Brand style tokens (matching policy pages) ───────────────────────────────
const C = {
  cream:           "#FFF9F3",
  creamLight:      "#FFF3E6",
  terracotta:      "#A84F40",
  terracottaLight: "#C77B70",
  darkBrown:       "#4A3024",
  bodyBrown:       "#5F4A40",
  peach:           "#FBF0EB",
  border:          "rgba(168,79,64,0.12)",
};

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
    <main
      style={{
        minHeight: "100vh",
        background: C.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      {/* ── Responsive grid container ─────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 8px 40px rgba(74,48,36,0.10)",
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
        className="cc-login-grid"
      >
        {/* ── Left — branding panel ───────────────────────────────────── */}
        <div
          className="cc-login-left"
          style={{
            position: "relative",
            background: C.creamLight,
            padding: "56px 48px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRight: `1px solid ${C.border}`,
            display: "none",
          }}
        >
          {/* Subtle background texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.07,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            <img
              src="/images/logo.png"
              alt="The Crochet Charm"
              style={{
                width: "136px",
                height: "136px",
                borderRadius: "50%",
                background: "#fff",
                padding: "6px",
                boxShadow: "0 8px 32px rgba(74,48,36,0.14)",
                border: `2px solid ${C.border}`,
              }}
            />
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2.1rem",
                fontWeight: 700,
                color: C.darkBrown,
                marginTop: "28px",
                marginBottom: "12px",
              }}
            >
              The Crochet Charm
            </h1>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: C.bodyBrown,
                maxWidth: "260px",
                margin: "0 auto 24px",
              }}
            >
              Handmade creations crafted with love,
              <br />
              especially made for you.
            </p>
            {/* Heart divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{ display: "block", width: "40px", height: "2px", background: C.terracottaLight, borderRadius: "1px" }} />
              <span style={{ color: C.terracottaLight, fontSize: "12px" }}>&#9829;</span>
              <span style={{ display: "block", width: "40px", height: "2px", background: C.terracottaLight, borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* ── Right — login form ──────────────────────────────────────── */}
        <div className="cc-login-right" style={{ padding: "48px 40px" }}>

          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: C.bodyBrown,
              fontSize: "13.5px",
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: "32px",
              opacity: 0.7,
            }}
          >
            <FaArrowLeft style={{ fontSize: "11px" }} /> Back to Home
          </Link>

          {/* Mobile logo */}
          <div className="cc-mobile-logo" style={{ display: "none", justifyContent: "center", marginBottom: "24px" }}>
            <img
              src="/images/logo.png"
              alt="The Crochet Charm"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                boxShadow: "0 4px 16px rgba(74,48,36,0.12)",
                border: `2px solid ${C.border}`,
              }}
            />
          </div>

          {/* Heading block */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            {/* Eyebrow pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(168,79,64,0.08)",
                border: "1px solid rgba(168,79,64,0.15)",
                borderRadius: "40px",
                padding: "6px 16px 6px 10px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.terracotta}, ${C.terracottaLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                🧶
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: C.terracotta,
                }}
              >
                Welcome Back
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
                fontWeight: 700,
                color: C.darkBrown,
                margin: "0 0 8px",
              }}
            >
              Sign In to Your Account
            </h2>
            <p style={{ fontSize: "14px", color: C.bodyBrown, opacity: 0.8, margin: 0 }}>
              Login to continue your Crochet Charm journey.
            </p>
          </div>

          {/* Forms */}
          <div>
            {!isLoaded ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `3px solid ${C.peach}`,
                    borderTopColor: C.terracotta,
                    animation: "cc-spin 0.8s linear infinite",
                  }}
                />
              </div>
            ) : (
              <>
                {error && (
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      background: "#FEF2F0",
                      border: "1px solid rgba(168,79,64,0.20)",
                      color: C.terracotta,
                      fontSize: "13.5px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <span style={{ marginTop: "1px" }}>⚠️</span>
                    <div>
                      {error}
                      {error.includes("doesn't exist") && (
                        <>{" "}
                          <Link href="/signup" style={{ fontWeight: 700, textDecoration: "underline", color: C.terracotta }}>
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {step === "identifier" && (
                  <form onSubmit={handleIdentifierSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.darkBrown, marginBottom: "8px" }}>
                        Email or Username
                      </label>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or username"
                        autoFocus
                        className="cc-input"
                        style={{
                          width: "100%",
                          borderRadius: "12px",
                          border: `1px solid ${C.border}`,
                          background: C.cream,
                          padding: "14px 16px",
                          fontSize: "14px",
                          color: C.darkBrown,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !identifier.trim()}
                      style={{
                        width: "100%",
                        background: `linear-gradient(135deg, ${C.terracotta}, #BF6055)`,
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontWeight: 700,
                        fontSize: "15px",
                        cursor: loading || !identifier.trim() ? "not-allowed" : "pointer",
                        opacity: loading || !identifier.trim() ? 0.6 : 1,
                        boxShadow: "0 4px 16px rgba(168,79,64,0.25)",
                      }}
                    >
                      {loading ? "Checking..." : "Continue"}
                    </button>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px", color: C.bodyBrown, margin: 0 }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" style={{ color: C.terracotta, fontWeight: 700, textDecoration: "none" }}>
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </form>
                )}

                {step === "password" && (
                  <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p style={{ fontSize: "13px", color: C.bodyBrown, margin: 0 }}>
                      Signing in as <span style={{ fontWeight: 600, color: C.darkBrown }}>{safeIdentifier}</span>
                    </p>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.darkBrown, marginBottom: "8px" }}>
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoFocus
                        className="cc-input"
                        style={{
                          width: "100%",
                          borderRadius: "12px",
                          border: `1px solid ${C.border}`,
                          background: C.cream,
                          padding: "14px 16px",
                          fontSize: "14px",
                          color: C.darkBrown,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !password}
                      style={{
                        width: "100%",
                        background: `linear-gradient(135deg, ${C.terracotta}, #BF6055)`,
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontWeight: 700,
                        fontSize: "15px",
                        cursor: loading || !password ? "not-allowed" : "pointer",
                        opacity: loading || !password ? 0.6 : 1,
                        boxShadow: "0 4px 16px rgba(168,79,64,0.25)",
                      }}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                    <button
                      type="button"
                      onClick={resetToIdentifier}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        color: C.bodyBrown,
                        fontSize: "13px",
                        cursor: "pointer",
                        padding: "6px",
                        opacity: 0.8,
                      }}
                    >
                      ← Use a different email
                    </button>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p style={{ fontSize: "13px", color: C.bodyBrown, margin: 0 }}>
                      We sent a verification code to <span style={{ fontWeight: 600, color: C.darkBrown }}>{safeIdentifier}</span>
                    </p>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.darkBrown, marginBottom: "8px" }}>
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter the code"
                        autoFocus
                        maxLength={8}
                        className="cc-input"
                        style={{
                          width: "100%",
                          borderRadius: "12px",
                          border: `1px solid ${C.border}`,
                          background: C.cream,
                          padding: "14px 16px",
                          fontSize: "18px",
                          color: C.darkBrown,
                          outline: "none",
                          boxSizing: "border-box",
                          textAlign: "center",
                          letterSpacing: "0.3em",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !otpCode}
                      style={{
                        width: "100%",
                        background: `linear-gradient(135deg, ${C.terracotta}, #BF6055)`,
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "15px",
                        fontWeight: 700,
                        fontSize: "15px",
                        cursor: loading || !otpCode ? "not-allowed" : "pointer",
                        opacity: loading || !otpCode ? 0.6 : 1,
                        boxShadow: "0 4px 16px rgba(168,79,64,0.25)",
                      }}
                    >
                      {loading ? "Verifying..." : "Verify"}
                    </button>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: `1px solid ${C.border}`,
                        borderRadius: "12px",
                        color: C.terracotta,
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "10px",
                      }}
                    >
                      Resend code
                    </button>
                    <button
                      type="button"
                      onClick={resetToIdentifier}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        color: C.bodyBrown,
                        fontSize: "13px",
                        cursor: "pointer",
                        padding: "6px",
                        opacity: 0.8,
                      }}
                    >
                      ← Use a different email
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <p style={{ textAlign: "center", fontSize: "11.5px", color: C.bodyBrown, opacity: 0.5, marginTop: "28px" }}>
            Your account information is kept secure and private.
          </p>
        </div>
      </div>

      {/* ── Scoped styles ────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        @keyframes cc-spin {
          to { transform: rotate(360deg); }
        }

        @media (min-width: 768px) {
          .cc-login-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .cc-login-left {
            display: flex !important;
          }
          .cc-mobile-logo {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .cc-login-right {
            padding: 36px 24px !important;
          }
          .cc-mobile-logo {
            display: flex !important;
          }
        }

        .cc-input:focus {
          border-color: ${C.terracottaLight} !important;
          box-shadow: 0 0 0 3px rgba(168,79,64,0.10) !important;
        }

        .cc-input::placeholder {
          color: ${C.bodyBrown};
          opacity: 0.45;
        }
      `}</style>
    </main>
  );
}

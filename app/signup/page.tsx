"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import {
  SignUp,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";

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

export default function SignupPage() {
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
        className="cc-signup-grid"
      >
        {/* ── Left — branding panel ───────────────────────────────────── */}
        <div
          className="cc-signup-left"
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
              Create your account and start
              <br />
              your Crochet Charm journey. 🧶
            </p>
            {/* Heart divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span style={{ display: "block", width: "40px", height: "2px", background: C.terracottaLight, borderRadius: "1px" }} />
              <span style={{ color: C.terracottaLight, fontSize: "12px" }}>&#9829;</span>
              <span style={{ display: "block", width: "40px", height: "2px", background: C.terracottaLight, borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* ── Right — signup form ──────────────────────────────────────── */}
        <div className="cc-signup-right" style={{ padding: "48px 40px" }}>

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
            <FaArrowLeft style={{ fontSize: "11px" }} />
            Back to Home
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
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
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
                🌸
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
                Join the Family
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
              Create Account
            </h2>
            <p style={{ fontSize: "14px", color: C.bodyBrown, opacity: 0.8, margin: 0 }}>
              Join The Crochet Charm family.
            </p>
          </div>

          {/* Clerk forms */}
          <div>
            <ClerkLoading>
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
            </ClerkLoading>

            <ClerkLoaded>
              <SignUp
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "w-full shadow-none border-0 p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "w-full py-4 rounded-xl border border-[rgba(168,79,64,0.18)] text-[#4A3024] font-semibold hover:bg-[#FFF9F3] transition",
                    formButtonPrimary:
                      "bg-[#A84F40] hover:bg-[#8F3E30] text-white rounded-xl py-4 font-bold shadow-md",
                    formFieldInput:
                      "rounded-xl border-[rgba(168,79,64,0.18)] bg-[#FFF9F3] text-[#4A3024] focus:border-[#C77B70] focus:ring-[rgba(168,79,64,0.12)]",
                    formFieldLabel:
                      "text-[#4A3024] font-semibold text-sm",
                    footerActionLink:
                      "text-[#A84F40] hover:text-[#8F3E30] font-bold",
                    dividerLine:
                      "bg-[rgba(168,79,64,0.12)]",
                    dividerText:
                      "text-[#5F4A40] opacity-60 text-xs",
                    identityPreviewEditButton:
                      "text-[#A84F40]",
                    formResendCodeLink:
                      "text-[#A84F40] font-semibold",
                    otpCodeFieldInput:
                      "border-[rgba(168,79,64,0.18)] text-[#4A3024] focus:border-[#C77B70]",
                    alertText:
                      "text-[#A84F40]",
                    formFieldErrorText:
                      "text-[#A84F40]",
                  },
                }}
              />
            </ClerkLoaded>
          </div>

          <p style={{ textAlign: "center", fontSize: "11.5px", color: C.bodyBrown, opacity: 0.5, marginTop: "16px" }}>
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
          .cc-signup-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .cc-signup-left {
            display: flex !important;
          }
          .cc-mobile-logo {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .cc-signup-right {
            padding: 36px 24px !important;
          }
          .cc-mobile-logo {
            display: flex !important;
          }
        }
      `}</style>
    </main>
  );
}

"use client";

import {
  FaClock,
  FaCamera,
  FaCheckCircle,
  FaWallet,
  FaBell,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import Footer from "../components/Footer";

export default function RefundPolicy() {
  return (
    <div style={{ background: "#FFF9F3", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section className="rp-hero">
        <div className="rp-hero-bg" />
        <div className="rp-hero-overlay" />
        <div className="rp-hero-content">
          <span className="rp-hero-eyebrow">AFTER-SALES CARE</span>
          <div className="rp-hero-divider">
            <span className="rp-hero-divider-line" />
            <span className="rp-hero-divider-heart">&#9829;</span>
            <span className="rp-hero-divider-line" />
          </div>
          <h1 className="rp-hero-title">Refund Policy</h1>
          <p className="rp-hero-desc">
            Since every product is handmade, refunds are only available for{" "}
            <strong>damaged or incorrect products.</strong>
          </p>
        </div>
        <div className="rp-hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,60 C360,100 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,100 L0,100 Z"
              fill="#FFF9F3"
            />
          </svg>
        </div>
      </section>

      {/* ── Our Refund Process ── */}
      <section style={{ padding: "60px 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              display: "block",
              flex: 1,
              maxWidth: "80px",
              height: "1px",
              background: "rgba(168,79,64,0.3)",
            }}
          />
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A84F40",
              margin: 0,
            }}
          >
            OUR REFUND PROCESS
          </h2>
          <span
            style={{
              display: "block",
              flex: 1,
              maxWidth: "80px",
              height: "1px",
              background: "rgba(168,79,64,0.3)",
            }}
          />
        </div>
        <div style={{ textAlign: "center", color: "#C77B70", marginBottom: "40px", fontSize: "16px" }}>
          &#9829;
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: <FaClock />,
              step: "1. REQUEST WITHIN",
              name: "48 HOURS",
              desc: "Request within 48 hours of delivery.",
            },
            {
              icon: <FaCamera />,
              step: "2. PRODUCT PHOTOS",
              name: "REQUIRED",
              desc: "Product photos are required.",
            },
            {
              icon: <FaCheckCircle />,
              step: "3. REVIEW & APPROVAL",
              name: "PROCESS",
              desc: "We will review your request and approve if eligible.",
            },
            {
              icon: <FaWallet />,
              step: "4. REFUND PROCESSING",
              name: "7 BUSINESS DAYS",
              desc: "Approved refunds are processed within 7 business days.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "32px 24px",
                boxShadow: "0 4px 20px rgba(74,48,36,0.08)",
                border: "1px solid rgba(168,79,64,0.08)",
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 32px rgba(168,79,64,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 20px rgba(74,48,36,0.08)";
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #A84F40 0%, #C77B70 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "22px",
                  margin: "0 auto 18px",
                  boxShadow: "0 4px 14px rgba(168,79,64,0.28)",
                }}
              >
                {card.icon}
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "#A84F40",
                  textTransform: "uppercase",
                  margin: "0 0 6px",
                }}
              >
                {card.step}
              </p>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#4A3024",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  margin: "0 0 12px",
                }}
              >
                {card.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#5F4A40", lineHeight: 1.6, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Important Notes ── */}
      <section style={{ padding: "0 24px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #4A3024 0%, #7B3D2A 100%)",
            borderRadius: "20px",
            padding: "40px 48px",
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
            boxShadow: "0 8px 32px rgba(74,48,36,0.18)",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F8D5B5",
              fontSize: "24px",
            }}
          >
            <FaBell />
          </div>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F8D5B5",
                margin: "0 0 20px",
              }}
            >
              IMPORTANT NOTES
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Refunds are applicable only for damaged or incorrect products.",
                "Make sure to reach out to us within 48 hours of receiving your order.",
                "Ensure clear product images while raising a refund request.",
                "Refunds will be issued to the original payment method.",
                "For any queries, feel free to contact our support team.",
              ].map((note, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    color: "rgba(255,249,243,0.9)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  <FaCheckCircle
                    style={{ color: "#C77B70", flexShrink: 0, marginTop: "3px", fontSize: "15px" }}
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Need Help ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 4px 20px rgba(74,48,36,0.08)",
            border: "1px solid rgba(168,79,64,0.1)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #A84F40 0%, #C77B70 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "20px",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(168,79,64,0.28)",
              }}
            >
              <FaEnvelope />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#4A3024",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  margin: "0 0 4px",
                }}
              >
                Need Help?
              </h3>
              <p style={{ fontSize: "14px", color: "#5F4A40", margin: "0 0 4px" }}>
                We are here for you!
              </p>
              <p style={{ fontSize: "14px", color: "#5F4A40", margin: 0 }}>
                Email us at{" "}
                <a
                  href="mailto:hello@thecrochetcharm.com"
                  style={{ color: "#A84F40", fontWeight: 600, textDecoration: "none" }}
                >
                  hello@thecrochetcharm.com
                </a>
              </p>
            </div>
          </div>
          <a
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #A84F40 0%, #C77B70 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.04em",
              padding: "14px 28px",
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(168,79,64,0.28)",
              whiteSpace: "nowrap",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 24px rgba(168,79,64,0.38)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 14px rgba(168,79,64,0.28)";
            }}
          >
            <span>Contact Us</span>
            <FaPaperPlane />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

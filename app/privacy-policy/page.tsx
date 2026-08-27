import {
  FaShieldAlt,
  FaClipboardList,
  FaCogs,
  FaShareAlt,
  FaUserShield,
  FaDatabase,
  FaSyncAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | The Crochet Charm",
  description:
    "Read our Privacy Policy to understand how The Crochet Charm collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#FFF9F3", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section className="pp-hero">
        <div className="pp-hero-bg" />
        <div className="pp-hero-overlay" />
        <div className="pp-hero-content">
          <div className="pp-hero-eyebrow">
            <span className="pp-hero-eyebrow-icon">
              <FaShieldAlt />
            </span>
            <span className="pp-hero-eyebrow-text">OUR COMMITMENT TO YOU</span>
          </div>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-desc">
            At The Crochet Charm, we value your privacy and are committed to
            protecting your personal information.
          </p>
          <div className="pp-hero-divider">
            <span className="pp-hero-divider-line" />
            <span className="pp-hero-divider-heart">&#9829;</span>
            <span className="pp-hero-divider-line" />
          </div>
        </div>
        <div className="pp-hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,60 C360,100 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,100 L0,100 Z"
              fill="#FFF9F3"
            />
          </svg>
        </div>
      </section>

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* ── Row 1: Info We Collect + This May Include ── */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Card 1a */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#A84F40,#C77B70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <FaClipboardList />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>1.</div>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                  Information We Collect
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: "0 0 12px" }}>
              We collect personal information that you provide to us when you:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Place an order", "Create an account", "Subscribe to our newsletter", "Contact our customer support"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                  <FaCheckCircle style={{ flexShrink: 0, marginTop: "3px", color: "#A84F40" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 1b – This may include */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#5F4A40", marginBottom: "14px" }}>This may include:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Name",
                "Email Address",
                "Phone Number",
                "Shipping Address",
                "Billing Address",
                "Payment Information (processed securely)",
                "Order Details",
              ].map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#5F4A40" }}
                >
                  <FaCheckCircle style={{ flexShrink: 0, color: "#A84F40", fontSize: "13px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Row 2: How We Use + Information Sharing ── */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Card 2 */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#A84F40,#C77B70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <FaCogs />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>2.</div>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                  How We Use Your Information
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: "0 0 12px" }}>
              We use the information we collect to:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Process and fulfill your orders",
                "Provide customer support",
                "Send order updates and important notices",
                "Improve our products and services",
                "Personalize your shopping experience",
                "Comply with legal obligations",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                  <FaCheckCircle style={{ flexShrink: 0, marginTop: "3px", color: "#A84F40" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#A84F40,#C77B70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <FaShareAlt />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>3.</div>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                  Information Sharing
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: "0 0 12px" }}>
              We do not sell, trade, or rent your personal information to others. We may share your information with:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                <FaCheckCircle style={{ flexShrink: 0, marginTop: "3px", color: "#A84F40" }} />
                <span>
                  Trusted service providers who help us operate our website and business (e.g., payment gateways, courier services)
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                <FaCheckCircle style={{ flexShrink: 0, marginTop: "3px", color: "#A84F40" }} />
                <span>Authorities when required by law or to protect our rights</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Card 4: Your Rights (full width) ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(168,79,64,0.08)",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg,#A84F40,#C77B70)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              <FaUserShield />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>4.</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                Your Rights
              </h2>
            </div>
          </div>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: "0 0 12px" }}>You have the right to:</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "10px 40px",
              marginBottom: "16px",
            }}
          >
            {[
              "Access the personal information we hold about you",
              "Opt-out of marketing communications",
              "Request correction or deletion of your information",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                <FaCheckCircle style={{ flexShrink: 0, marginTop: "3px", color: "#A84F40" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: 0 }}>
            To exercise these rights, please contact us.
          </p>
        </div>

        {/* ── Row 3: Data Retention + Changes ── */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Card 5 */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#A84F40,#C77B70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <FaDatabase />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>5.</div>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                  Data Retention
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: 0 }}>
              We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements.
            </p>
          </div>

          {/* Card 6 */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "#fff",
              border: "1px solid rgba(168,79,64,0.08)",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#A84F40,#C77B70)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                <FaSyncAlt />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>6.</div>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                  Changes to This Policy
                </h2>
              </div>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: 0 }}>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>
        </div>

        {/* ── Card 7: Contact Us ── */}
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(168,79,64,0.08)",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 20px rgba(74,48,36,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg,#A84F40,#C77B70)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              <FaEnvelope />
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#A84F40" }}>7.</div>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#4A3024", margin: 0 }}>
                Contact Us
              </h2>
            </div>
          </div>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5F4A40", margin: "0 0 20px" }}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
            {[
              { icon: <FaEnvelope />, text: "hello@thecrochetcharm.com" },
              { icon: <FaPhoneAlt />, text: "+91 98765 43210" },
              { icon: <FaMapMarkerAlt />, text: "India" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#5F4A40" }}>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#F8EEE4",
                    border: "1px solid rgba(168,79,64,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A84F40",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

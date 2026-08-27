import Link from "next/link";
import {
  FaShieldAlt,
  FaShoppingBag,
  FaRupeeSign,
  FaTruck,
  FaUndoAlt,
  FaFileAlt,
} from "react-icons/fa";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms & Conditions | The Crochet Charm",
  description:
    "Read the Terms & Conditions of The Crochet Charm. By placing an order, you agree to our terms regarding orders, pricing, shipping, returns, and website content.",
};

// ── Reusable style tokens ────────────────────────────────────────────────────
const terracotta = "#A84F40";
const darkBrown = "#4A3024";
const bodyBrown = "#5F4A40";
const cardBorder = "1px solid rgba(168,79,64,0.10)";
const cardShadow = "0 4px 24px rgba(74,48,36,0.05)";

// ── Section data ─────────────────────────────────────────────────────────────
const sections = [
  {
    num: "1",
    icon: <FaShoppingBag />,
    title: "Orders & Availability",
    items: [
      "All orders are subject to product availability.",
      "We reserve the right to refuse or cancel an order for any reason.",
      "Once an order is placed, you will receive an order confirmation email.",
    ],
  },
  {
    num: "2",
    icon: <FaRupeeSign />,
    title: "Pricing & Payments",
    items: [
      "All prices are listed in INR and are inclusive of applicable taxes unless stated otherwise.",
      "Prices may change without prior notice.",
      "We accept major credit/debit cards, UPI, net banking and other secure payment methods.",
    ],
  },
  {
    num: "3",
    icon: <FaTruck />,
    title: "Shipping & Delivery",
    items: [
      "We ship across India.",
      "Orders are processed within the estimated time mentioned on the product or during checkout.",
      "Delivery times may vary based on your location and the shipping method selected.",
      "We are not responsible for delays caused by courier services or unforeseen circumstances.",
    ],
  },
  {
    num: "4",
    icon: <FaUndoAlt />,
    title: "Returns & Refunds",
    items: [
      "As our products are handmade, refunds are only available for damaged or incorrect products.",
      "To request a return or refund, please contact us within the specified time from delivery.",
    ],
    linkText: "Refund Policy",
    linkHref: "/refund-policy",
    linkLabel: "For more details, please refer to our",
  },
  {
    num: "5",
    icon: <FaFileAlt />,
    title: "Website Content & Changes",
    items: [
      "All content on this website, including images, text, logos and designs, is the property of The Crochet Charm.",
      "You may not use, copy or reproduce any content without our written permission.",
      "We may update these Terms & Conditions from time to time.",
      "Any changes will be posted on this page with an updated effective date.",
      "By continuing to use our website, you agree to the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#FFF9F3", minHeight: "100vh" }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#FFF3E6",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/shipping-gift.png')",
            backgroundSize: "cover",
            backgroundPosition: "65% center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient overlay — fades image on left so text is legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(255,249,243,0.92) 0%, rgba(255,243,230,0.72) 38%, rgba(255,249,243,0.18) 100%)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "600px",
            padding: "72px 48px",
            marginLeft: "max(48px, calc((100vw - 1200px) / 2 + 48px))",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(168,79,64,0.10)",
              border: "1px solid rgba(168,79,64,0.18)",
              borderRadius: "40px",
              padding: "8px 18px 8px 12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#A84F40,#C77B70)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              <FaShieldAlt />
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: terracotta,
              }}
            >
              OUR COMMITMENT TO YOU
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 700,
              color: darkBrown,
              lineHeight: 1.1,
              margin: "0 0 16px",
              textShadow: "0 1px 8px rgba(255,249,243,0.6)",
            }}
          >
            Terms &amp; Conditions
          </h1>

          {/* Sub-text */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: bodyBrown,
              margin: "0 0 24px",
              maxWidth: "440px",
              textShadow: "0 1px 6px rgba(255,249,243,0.5)",
            }}
          >
            By placing an order with The Crochet Charm, you agree to our terms.
          </p>

          {/* Heart divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "block",
                width: "40px",
                height: "2px",
                background: "#C77B70",
                borderRadius: "1px",
              }}
            />
            <span style={{ color: "#C77B70", fontSize: "12px", lineHeight: 1 }}>
              &#9829;
            </span>
            <span
              style={{
                display: "block",
                width: "40px",
                height: "2px",
                background: "#C77B70",
                borderRadius: "1px",
              }}
            />
          </div>
        </div>

        {/* Wave bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            lineHeight: 0,
            marginTop: "-1px",
          }}
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "56px" }}
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,65 1380,55 1440,50 L1440,80 L0,80 Z"
              fill="#FFF9F3"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "12px 24px 80px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {sections.map((sec) => (
          <div
            key={sec.num}
            style={{
              background: "#fff",
              border: cardBorder,
              borderRadius: "16px",
              padding: "32px 36px",
              boxShadow: cardShadow,
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "18px",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#FBF0EB",
                  border: "1px solid rgba(168,79,64,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: terracotta,
                  fontSize: "19px",
                  flexShrink: 0,
                }}
              >
                {sec.icon}
              </div>

              {/* Title block */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)",
                  fontWeight: 700,
                  color: darkBrown,
                  margin: 0,
                }}
              >
                {sec.num}.&nbsp;{sec.title}
              </h2>
            </div>

            {/* Bullet list */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {sec.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                    color: bodyBrown,
                  }}
                >
                  {/* Dot bullet */}
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "7px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: terracotta,
                      opacity: 0.7,
                    }}
                  />
                  {item}
                </li>
              ))}

              {/* Optional link item (Refund Policy) */}
              {sec.linkHref && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                    color: bodyBrown,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "7px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: terracotta,
                      opacity: 0.7,
                    }}
                  />
                  <span>
                    {sec.linkLabel}&nbsp;
                    <Link
                      href={sec.linkHref}
                      style={{
                        color: terracotta,
                        fontWeight: 600,
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {sec.linkText}
                    </Link>
                    .
                  </span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
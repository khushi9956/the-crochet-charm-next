import {
  FaTruck,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMap,
  FaBoxOpen,
  FaEnvelopeOpenText,
  FaCheckCircle,
  FaStickyNote,
} from "react-icons/fa";
import Footer from "../components/Footer";

export default function ShippingPolicy() {
  return (
    <main className="shipping-policy-page">
      {/* ── Hero Banner ── */}
      <section className="sp-hero">
        <div className="sp-hero-bg" />
        <div className="sp-hero-content">
          <div className="sp-hero-icon">
            <FaTruck />
          </div>
          <h1 className="sp-hero-title">Shipping Policy</h1>
          <div className="sp-hero-divider">
            <span className="sp-hero-divider-line" />
            <span className="sp-hero-divider-heart">&#9829;</span>
            <span className="sp-hero-divider-line" />
          </div>
          <p className="sp-hero-subtitle">
            At The Crochet Charm, we ensure your handmade products<br />
            reach you with care and love.
          </p>
        </div>
        <div className="sp-hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,60 C360,100 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,100 L0,100 Z"
              fill="#FFF9F3"
            />
          </svg>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="sp-cards-section">
        <div className="sp-cards-grid">
          {/* Processing Time */}
          <div className="sp-card">
            <div className="sp-card-left">
              <div className="sp-card-icon-circle">
                <FaClock />
              </div>
              <div className="sp-card-text">
                <h3 className="sp-card-title">Processing Time</h3>
                <p className="sp-card-desc">
                  All our products are handmade with care.<br />
                  Orders are processed within:
                </p>
              </div>
            </div>
            <div className="sp-card-right">
              <div className="sp-card-highlight-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <span className="sp-card-highlight-value">2–5 Business Days</span>
                <span className="sp-card-highlight-sub">(Excluding Sundays &amp; Public Holidays)</span>
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="sp-card">
            <div className="sp-card-left">
              <div className="sp-card-icon-circle">
                <FaTruck />
              </div>
              <div className="sp-card-text">
                <h3 className="sp-card-title">Delivery Time</h3>
                <p className="sp-card-desc">
                  Once your order is shipped,<br />
                  it will be delivered within:
                </p>
              </div>
            </div>
            <div className="sp-card-right">
              <div className="sp-card-highlight-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <span className="sp-card-highlight-value">4–8 Business Days</span>
                <span className="sp-card-highlight-sub">(Excluding Sundays &amp; Public Holidays)</span>
              </div>
            </div>
          </div>

          {/* Delivery Across India */}
          <div className="sp-card">
            <div className="sp-card-left">
              <div className="sp-card-icon-circle">
                <FaMapMarkerAlt />
              </div>
              <div className="sp-card-text">
                <h3 className="sp-card-title">Delivery Across India</h3>
                <p className="sp-card-desc">
                  We deliver PAN India with our trusted<br />
                  shipping partners.
                </p>
              </div>
            </div>
            <div className="sp-card-right">
              <div className="sp-card-highlight-icon">
                <FaMap />
              </div>
              <div>
                <span className="sp-card-highlight-value">PAN India</span>
                <span className="sp-card-highlight-sub">Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          <div className="sp-card">
            <div className="sp-card-left">
              <div className="sp-card-icon-circle">
                <FaBoxOpen />
              </div>
              <div className="sp-card-text">
                <h3 className="sp-card-title">Tracking Information</h3>
                <p className="sp-card-desc">
                  Once your order is shipped,<br />
                  tracking details will be shared<br />
                  via email/WhatsApp.
                </p>
              </div>
            </div>
            <div className="sp-card-right">
              <div className="sp-card-highlight-icon">
                <FaEnvelopeOpenText />
              </div>
              <div>
                <span className="sp-card-highlight-value">
                  Tracking details will be<br />shared once shipped.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Important Notes ── */}
      <section className="sp-notes-section">
        <div className="sp-notes-card">
          <div className="sp-notes-content">
            <div className="sp-notes-header">
              <FaStickyNote className="sp-notes-icon" />
              <h2 className="sp-notes-title">Important Notes</h2>
            </div>
            <ul className="sp-notes-list">
              <li>
                <FaCheckCircle className="sp-notes-check" />
                <span>Delivery times may vary slightly depending on your location.</span>
              </li>
              <li>
                <FaCheckCircle className="sp-notes-check" />
                <span>During festive seasons or special sale periods, there might be slight delays.</span>
              </li>
              <li>
                <FaCheckCircle className="sp-notes-check" />
                <span>We ensure every order is packed with love and care to reach you in perfect condition.</span>
              </li>
              <li>
                <FaCheckCircle className="sp-notes-check" />
                <span>For any shipping-related queries, feel free to contact us.</span>
              </li>
            </ul>
          </div>
          <div className="sp-notes-yarn" />
        </div>
      </section>

      {/* ── Thank You ── */}
      <section className="sp-thankyou">
        <div className="sp-thankyou-divider">
          <span className="sp-hero-divider-line" />
          <span className="sp-hero-divider-heart">&#9829;</span>
          <span className="sp-hero-divider-line" />
        </div>
        <p className="sp-thankyou-main">
          Thank you for supporting handmade and choosing The Crochet Charm.
        </p>
        <p className="sp-thankyou-italic">
          We appreciate your love and trust! &#10084;
        </p>
      </section>

      <Footer />
    </main>
  );
}

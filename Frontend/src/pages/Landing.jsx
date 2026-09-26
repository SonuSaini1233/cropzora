import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CloudSun,
  Leaf,
  Menu,
  ScanSearch,
  Sparkles,
  Store,
  X,
} from "lucide-react";

import "../pages_styles/Landing.css";

const features = [
  {
    icon: ScanSearch,
    title: "AI Disease Detection",
    text: "Scan crop images and understand possible health issues quickly.",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    text: "Get farm-focused weather conditions and practical guidance.",
  },
  {
    icon: Store,
    title: "Market Insights",
    text: "Track crop prices and market movement in one workspace.",
  },
];

export default function Landing({ onLogin, onGetStarted }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  const goLogin = () => {
    closeMenu();
    if (typeof onLogin === "function") onLogin();
  };

  const goStarted = () => {
    closeMenu();
    if (typeof onGetStarted === "function") {
      onGetStarted();
      return;
    }

    document
      .getElementById("landing-features")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTo = (id) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <button
            type="button"
            className="landing-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="landing-brand-mark">
              <Leaf size={21} strokeWidth={2.3} />
            </span>

            <span className="landing-brand-copy">
              <strong>CropZora</strong>
              <small>SMART AGRICULTURE</small>
            </span>
          </button>

          <nav
            className={`landing-nav-links ${
              mobileOpen ? "is-open" : ""
            }`}
          >
            <button type="button" onClick={() => scrollTo("landing-features")}>
              Features
            </button>

            <button type="button" onClick={() => scrollTo("landing-ai")}>
              AI Diagnosis
            </button>

            <button type="button" onClick={() => scrollTo("landing-about")}>
              About
            </button>

            <div className="landing-mobile-actions">
              <button type="button" onClick={goLogin}>
                Log in
              </button>

              <button
                type="button"
                className="mobile-primary"
                onClick={goStarted}
              >
                Get started
                <ArrowRight size={15} />
              </button>
            </div>
          </nav>

          <div className="landing-desktop-actions">
            <button type="button" className="landing-login" onClick={goLogin}>
              Log in
            </button>

            <button
              type="button"
              className="landing-nav-primary"
              onClick={goStarted}
            >
              Get started
              <ArrowRight size={15} />
            </button>
          </div>

          <button
            type="button"
            className="landing-mobile-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-inner">
            <div className="landing-hero-copy">
              <span className="landing-eyebrow">
                <span />
                INTELLIGENT AGRICULTURE
              </span>

              <h1>
                Farm smarter.
                <span>Grow with confidence.</span>
              </h1>

              <p>
                One focused workspace for crop health, weather, market
                intelligence and AI-powered farming guidance.
              </p>

              <div className="landing-hero-actions">
                <button
                  type="button"
                  className="landing-hero-primary"
                  onClick={goStarted}
                >
                  Start with CropZora
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="landing-hero-secondary"
                  onClick={() => scrollTo("landing-features")}
                >
                  Explore platform
                </button>
              </div>

              <div className="landing-proof">
                <span>
                  <CheckCircle2 size={15} />
                  AI-assisted
                </span>
                <span>
                  <CheckCircle2 size={15} />
                  Farmer-first
                </span>
                <span>
                  <CheckCircle2 size={15} />
                  One workspace
                </span>
              </div>
            </div>

            <div className="landing-hero-visual">
              <div className="landing-dashboard">
                <div className="dashboard-topbar">
                  <div className="dashboard-brand">
                    <span>
                      <Leaf size={13} />
                    </span>
                    CropZora
                  </div>

                  <div className="dashboard-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="dashboard-content">
                  <div className="dashboard-heading">
                    <div>
                      <small>FARM OVERVIEW</small>
                      <strong>Your farm at a glance</strong>
                    </div>

                    <span className="dashboard-live">
                      <i />
                      Live
                    </span>
                  </div>

                  <div className="dashboard-summary">
                    <div className="summary-card">
                      <span className="summary-icon weather">
                        <CloudSun size={19} />
                      </span>
                      <div>
                        <small>WEATHER</small>
                        <strong>28°C</strong>
                        <span>Clear skies</span>
                      </div>
                    </div>

                    <div className="summary-card">
                      <span className="summary-icon health">
                        <ScanSearch size={19} />
                      </span>
                      <div>
                        <small>CROP HEALTH</small>
                        <strong>94%</strong>
                        <span>Healthy signal</span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-feature">
                    <div className="dashboard-chart">
                      <div className="chart-heading">
                        <div>
                          <small>MARKET TREND</small>
                          <strong>Tomato · 7 days</strong>
                        </div>
                        <span>+8.4%</span>
                      </div>

                      <svg viewBox="0 0 420 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient
                            id="landingChartFill"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#49b77e"
                              stopOpacity="0.18"
                            />
                            <stop
                              offset="100%"
                              stopColor="#49b77e"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        <path
                          d="M0 115 C34 110 54 93 82 102 C110 111 125 84 152 91 C181 98 196 68 224 78 C253 89 267 64 294 69 C323 75 338 41 365 54 C387 63 401 34 420 25 L420 150 L0 150 Z"
                          fill="url(#landingChartFill)"
                        />

                        <path
                          d="M0 115 C34 110 54 93 82 102 C110 111 125 84 152 91 C181 98 196 68 224 78 C253 89 267 64 294 69 C323 75 338 41 365 54 C387 63 401 34 420 25"
                          fill="none"
                          stroke="#49b77e"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="chart-labels">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>

                    <div className="dashboard-alert">
                      <span>
                        <Sparkles size={13} />
                        AI ALERT
                      </span>

                      <strong>Early blight risk</strong>

                      <p>Check lower leaves within the next 24–48 hours.</p>

                      <button type="button" onClick={() => scrollTo("landing-ai")}>
                        View guidance
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-card floating-weather">
                <span>
                  <CloudSun size={16} />
                </span>
                <div>
                  <small>FIELD WEATHER</small>
                  <strong>Good spray window</strong>
                </div>
              </div>

              <div className="floating-card floating-ai">
                <span>
                  <Sparkles size={16} />
                </span>
                <div>
                  <small>AI ASSISTANT</small>
                  <strong>3 insights ready</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="landing-section features-section"
          id="landing-features"
        >
          <div className="landing-container">
            <div className="section-intro">
              <div>
                <span className="section-eyebrow">ESSENTIAL TOOLS</span>

                <h2>
                  The essentials,
                  <span>in one place.</span>
                </h2>
              </div>

              <p>
                Everything you need for smarter daily farm decisions,
                without unnecessary clutter.
              </p>
            </div>

            <div className="feature-grid">
              {features.map(({ icon: Icon, title, text }) => (
                <article className="feature-card" key={title}>
                  <span className="feature-icon">
                    <Icon size={22} />
                  </span>

                  <h3>{title}</h3>

                  <p>{text}</p>

                  <span className="feature-link">
                    Explore
                    <ArrowRight size={14} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section ai-section" id="landing-ai">
          <div className="landing-container ai-layout">
            <div className="ai-copy">
              <span className="section-eyebrow">AI CROP HEALTH</span>

              <h2>
                See the problem.
                <span>Know the next move.</span>
              </h2>

              <p>
                Upload a crop photo and get a clear health summary,
                confidence score and practical next-step guidance.
              </p>

              <div className="ai-points">
                <span>
                  <CheckCircle2 size={17} />
                  Crop health signal
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  Confidence score
                </span>
                <span>
                  <CheckCircle2 size={17} />
                  Action guidance
                </span>
              </div>

              <button type="button" className="ai-button" onClick={goStarted}>
                Try CropZora
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="ai-preview">
              <div className="ai-preview-top">
                <span>
                  <ScanSearch size={14} />
                  CROP SCAN
                </span>

                <b>ANALYSIS READY</b>
              </div>

              <div className="ai-preview-grid">
                <div className="ai-image">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=90"
                    alt="Tomato crop"
                  />

                  <span className="scan-line" />
                  <span className="scan-corner top-left" />
                  <span className="scan-corner bottom-right" />
                </div>

                <div className="ai-result">
                  <small>POSSIBLE CONDITION</small>
                  <strong>Early Blight</strong>

                  <div className="confidence-row">
                    <span>94%</span>
                    <small>confidence</small>
                  </div>

                  <div className="confidence-bar">
                    <i />
                  </div>

                  <div className="result-meta">
                    <div>
                      <small>SEVERITY</small>
                      <strong>Moderate</strong>
                    </div>

                    <div>
                      <small>STATUS</small>
                      <strong>Action suggested</strong>
                    </div>
                  </div>

                  <div className="result-note">
                    <Sparkles size={14} />
                    <span>
                      Remove affected leaves and monitor the lower canopy.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section final-section" id="landing-about">
          <div className="landing-container final-card">
            <div>
              <span className="section-eyebrow">CROPZORA</span>

              <h2>
                A calmer way to
                <span>farm smarter.</span>
              </h2>

              <p>
                One focused workspace for the information that matters
                every day.
              </p>
            </div>

            <button type="button" className="final-button" onClick={goStarted}>
              Get started
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-container footer-inner">
          <div className="footer-brand">
            <span className="landing-brand-mark small">
              <Leaf size={16} />
            </span>

            <div>
              <strong>CropZora</strong>
              <span>Smart agriculture platform</span>
            </div>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => scrollTo("landing-features")}>
              Features
            </button>
            <button type="button" onClick={() => scrollTo("landing-ai")}>
              AI Diagnosis
            </button>
            <button type="button" onClick={() => scrollTo("landing-about")}>
              About
            </button>
          </div>

          <span className="footer-copy">
            © {new Date().getFullYear()} CropZora
          </span>
        </div>
      </footer>
    </div>
  );
}

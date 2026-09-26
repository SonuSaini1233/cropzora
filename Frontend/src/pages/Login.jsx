import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "../pages_styles/Login.css";

const highlights = [
  "AI-assisted crop health insights",
  "Weather and market intelligence",
  "One connected farm workspace",
];

export default function Login({
  onLogin,
  onRegister,
  onBack,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof onLogin === "function") {
      onLogin({
        email,
        password,
        remember,
      });
    }
  };

  const handleRegister = () => {
    if (typeof onRegister === "function") {
      onRegister();
    }
  };

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
      return;
    }

    window.history.back();
  };

  return (
    <div className="login-page">
      <div className="login-background-orb orb-left" />
      <div className="login-background-orb orb-right" />

      <div className="login-shell">
        <aside className="login-brand-panel">
          <button
            type="button"
            className="login-brand"
            onClick={handleBack}
            aria-label="Back"
          >
            <span className="login-brand-mark">
              <Leaf size={22} strokeWidth={2.3} />
            </span>

            <span className="login-brand-copy">
              <strong>CropZora</strong>
              <small>SMART AGRICULTURE</small>
            </span>
          </button>

          <div className="login-panel-content">
            <span className="login-panel-eyebrow">
              <Sparkles size={13} />
              YOUR SMART FARMING WORKSPACE
            </span>

            <h1>
              Smarter farming
              <span>starts here.</span>
            </h1>

            <p>
              Sign in to keep your crop health, farm activity,
              weather intelligence and AI guidance connected in one
              place.
            </p>

            <div className="login-highlight-list">
              {highlights.map((item) => (
                <div key={item}>
                  <span className="login-highlight-icon">
                    <Check size={13} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="login-panel-visual">
              <div className="login-visual-glow" />

              <div className="login-farm-card">
                <div className="login-farm-card-top">
                  <div>
                    <small>FARM STATUS</small>
                    <strong>Healthy & monitored</strong>
                  </div>

                  <span className="login-live-pill">
                    <i />
                    LIVE
                  </span>
                </div>

                <div className="login-farm-progress">
                  <span>
                    <Leaf size={14} />
                    Crop health
                  </span>
                  <strong>94%</strong>
                </div>

                <div className="login-progress-line">
                  <span />
                </div>

                <div className="login-farm-stats">
                  <div>
                    <small>WEATHER</small>
                    <strong>28°</strong>
                  </div>

                  <div>
                    <small>CROPS</small>
                    <strong>04</strong>
                  </div>

                  <div>
                    <small>AI INSIGHTS</small>
                    <strong>03</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="login-panel-footer">
            <span>
              <ShieldCheck size={13} />
              Built for a connected, farmer-first experience.
            </span>
          </div>
        </aside>

        <main className="login-form-panel">
          <div className="login-form-top">
            <button
              type="button"
              className="login-back-button"
              onClick={handleBack}
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <div className="login-security">
              <LockKeyhole size={13} />
              Secure sign in
            </div>
          </div>

          <div className="login-form-content">
            <div className="login-mobile-brand">
              <span className="login-brand-mark">
                <Leaf size={20} />
              </span>
              <strong>CropZora</strong>
            </div>

            <div className="login-heading">
              <span className="login-form-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to CropZora</h2>

              <p>
                Continue to your smart agriculture workspace.
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="cropzora-email">
                  Email address
                </label>

                <div className="login-input-wrap">
                  <Mail size={17} />

                  <input
                    id="cropzora-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <div className="login-field-label-row">
                  <label htmlFor="cropzora-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="login-forgot-button"
                    onClick={() => {
                      window.alert(
                        "Password recovery will be connected in the authentication step."
                      );
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="login-input-wrap">
                  <LockKeyhole size={17} />

                  <input
                    id="cropzora-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) =>
                    setRemember(event.target.checked)
                  }
                />

                <span className="login-checkmark">
                  <Check size={11} />
                </span>

                <span>Remember me on this device</span>
              </label>

              <button type="submit" className="login-submit-button">
                Sign in
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <button
              type="button"
              className="login-google-button"
              onClick={() => {
                window.alert(
                  "Google authentication will be connected in the backend step."
                );
              }}
            >
              <span className="login-google-logo">G</span>
              Continue with Google
            </button>

            <div className="login-register">
              <span>New to CropZora?</span>

              <button
                type="button"
                onClick={handleRegister}
              >
                Create an account
              </button>
            </div>

            <div className="login-form-note">
              <ShieldCheck size={14} />
              <span>
                Your account and farm data will be protected by
                authenticated access.
              </span>
            </div>
          </div>

          <div className="login-form-footer">
            <span>© {new Date().getFullYear()} CropZora</span>
            <span>Smart agriculture platform</span>
          </div>
        </main>
      </div>
    </div>
  );
}

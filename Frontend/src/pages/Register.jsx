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
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import "../pages_styles/Register.css";

const benefits = [
  "Personalized crop health workspace",
  "Weather and market intelligence",
  "AI-powered farming assistance",
];

export default function Register({
  onRegister,
  onLogin,
  onBack,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    if (!form.agree) {
      window.alert("Please accept the terms to continue.");
      return;
    }

    if (typeof onRegister === "function") {
      onRegister(form);
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
    <div className="register-page">
      <div className="register-background-orb register-orb-left" />
      <div className="register-background-orb register-orb-right" />

      <div className="register-shell">
        <aside className="register-brand-panel">
          <button
            type="button"
            className="register-brand"
            onClick={handleBack}
            aria-label="Back"
          >
            <span className="register-brand-mark">
              <Leaf size={22} strokeWidth={2.3} />
            </span>

            <span className="register-brand-copy">
              <strong>CropZora</strong>
              <small>SMART AGRICULTURE</small>
            </span>
          </button>

          <div className="register-panel-content">
            <span className="register-panel-eyebrow">
              <Sparkles size={13} />
              WELCOME TO CROPZORA
            </span>

            <h1>
              Build your
              <span>smarter farm.</span>
            </h1>

            <p>
              Create your CropZora account and bring crop health,
              weather, markets and AI-powered guidance into one
              connected workspace.
            </p>

            <div className="register-benefits">
              {benefits.map((item) => (
                <div key={item}>
                  <span className="register-benefit-icon">
                    <Check size={13} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="register-stat-grid">
              <div>
                <strong>AI</strong>
                <span>Crop insights</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Connected intelligence</span>
              </div>

              <div>
                <strong>360°</strong>
                <span>Farm visibility</span>
              </div>
            </div>
          </div>

          <div className="register-panel-footer">
            <ShieldCheck size={13} />
            <span>Farmer-first. Intelligence-led.</span>
          </div>
        </aside>

        <main className="register-form-panel">
          <div className="register-form-top">
            <button
              type="button"
              className="register-back-button"
              onClick={handleBack}
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <div className="register-security">
              <LockKeyhole size={13} />
              Secure account setup
            </div>
          </div>

          <div className="register-mobile-brand">
            <span className="register-brand-mark">
              <Leaf size={20} />
            </span>
            <strong>CropZora</strong>
          </div>

          <div className="register-form-content">
            <div className="register-heading">
              <span className="register-form-eyebrow">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Set up your workspace and start building a smarter
                farming workflow.
              </p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-form-grid">
                <div className="register-field">
                  <label htmlFor="cropzora-name">
                    Full name
                  </label>

                  <div className="register-input-wrap">
                    <UserRound size={16} />

                    <input
                      id="cropzora-name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="cropzora-location">
                    Location
                  </label>

                  <div className="register-input-wrap">
                    <MapPin size={16} />

                    <input
                      id="cropzora-location"
                      type="text"
                      placeholder="City, state"
                      value={form.location}
                      onChange={(event) =>
                        updateField("location", event.target.value)
                      }
                      autoComplete="address-level2"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="cropzora-register-email">
                  Email address
                </label>

                <div className="register-input-wrap">
                  <Mail size={16} />

                  <input
                    id="cropzora-register-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="register-form-grid">
                <div className="register-field">
                  <label htmlFor="cropzora-register-password">
                    Password
                  </label>

                  <div className="register-input-wrap">
                    <LockKeyhole size={16} />

                    <input
                      id="cropzora-register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
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
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="cropzora-confirm-password">
                    Confirm password
                  </label>

                  <div className="register-input-wrap">
                    <LockKeyhole size={16} />

                    <input
                      id="cropzora-confirm-password"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      placeholder="Repeat password"
                      value={form.confirmPassword}
                      onChange={(event) =>
                        updateField(
                          "confirmPassword",
                          event.target.value
                        )
                      }
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className="register-agreement">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(event) =>
                    updateField("agree", event.target.checked)
                  }
                  required
                />

                <span className="register-checkbox">
                  <Check size={11} />
                </span>

                <span>
                  I agree to CropZora's terms and privacy policy.
                </span>
              </label>

              <button
                type="submit"
                className="register-submit-button"
              >
                Create account
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="register-login">
              <span>Already have an account?</span>

              <button type="button" onClick={onLogin}>
                Sign in
              </button>
            </div>

            <div className="register-form-note">
              <ShieldCheck size={14} />
              <span>
                Your account will be used to securely organise
                your farm, crops and personalized insights.
              </span>
            </div>
          </div>

          <div className="register-form-footer">
            <span>© {new Date().getFullYear()} CropZora</span>
            <span>Smart agriculture platform</span>
          </div>
        </main>
      </div>
    </div>
  );
}

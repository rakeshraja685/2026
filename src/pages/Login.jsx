import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const CORRECT_PASSWORD = "Admin@123";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief loading feel
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        sessionStorage.setItem("farewell_auth", "true");
        navigate("/");
      } else {
        setError("Incorrect password. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-bg">
      {/* Ambient particles */}
      <div className="login-particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="particle" style={{ "--i": i }} />
        ))}
      </div>

      <div className="login-card" role="main">
        {/* Crest */}
        <div className="login-crest" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32 8L8 20v4l24 12 24-12v-4L32 8z"
              fill="url(#capGrad)"
            />
            <path d="M20 27v12c0 5 5.4 9 12 9s12-4 12-9V27L32 33 20 27z" fill="url(#capGrad)" opacity="0.85" />
            <rect x="52" y="22" width="3" height="14" rx="1.5" fill="url(#capGrad)" />
            <circle cx="53.5" cy="37" r="2.5" fill="#D4AF37" />
            <defs>
              <linearGradient id="capGrad" x1="8" y1="8" x2="56" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2CA50" />
                <stop offset="1" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="login-headline">Welcome Back</h1>
        <p className="login-subheadline">Class Farewell Tribute&nbsp;•&nbsp;Batch 2026</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Password only */}
          <div className="login-field">
            <label htmlFor="login-password" className="login-label">Access Password</label>
            <div className="login-input-wrap">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                autoFocus
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button
            id="login-submit-btn"
            type="submit"
            className={`login-btn${loading ? " loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="login-spinner" aria-hidden="true" />
            ) : (
              "Enter"
            )}
          </button>
        </form>

        <p className="login-footer-text">
          A tribute to the class of 2026 — memories that last forever
        </p>
      </div>
    </div>
  );
}

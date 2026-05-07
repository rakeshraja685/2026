import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const CORRECT_PASSWORD = "Admin@123";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mascotState, setMascotState] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  let pupilX = 0;
  let pupilY = 0;
  if (typeof window !== "undefined") {
    pupilX = (mousePos.x / window.innerWidth - 0.5) * 12; // Max offset X
    pupilY = (mousePos.y / window.innerHeight - 0.5) * 12; // Max offset Y

    // Constrain pupil inside the eye
    const maxR = 6;
    const dist = Math.sqrt(pupilX * pupilX + pupilY * pupilY);
    if (dist > maxR) {
      pupilX = (pupilX / dist) * maxR;
      pupilY = (pupilY / dist) * maxR;
    }
  }

  const visualState = 
    mascotState !== "idle" 
      ? mascotState 
      : (isPasswordFocused && !showPassword) ? "hiding" : "idle";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief loading feel
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setMascotState("happy");
        setTimeout(() => {
          sessionStorage.setItem("farewell_auth", "true");
          navigate("/");
        }, 1200);
      } else {
        setMascotState("error");
        setError("Incorrect password. Please try again.");
        setTimeout(() => setMascotState("idle"), 2500);
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
        {/* Interactive Mascot */}
        <div className="login-mascot" aria-hidden="true" style={{ width: '90px', height: '90px', marginBottom: '1.25rem' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2CA50" />
                <stop offset="1" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            
            {/* Owl Ears */}
            <path d="M28 45 L 20 20 L 45 35 Z" fill="url(#goldGrad)" />
            <path d="M72 45 L 80 20 L 55 35 Z" fill="url(#goldGrad)" />
            
            {/* Owl Body/Head */}
            <path d="M25 60 C 25 30, 75 30, 75 60 C 75 90, 25 90, 25 60 Z" fill="#1A1A1A" stroke="url(#goldGrad)" strokeWidth="2" />
            
            {/* Graduation Cap on Owl */}
            <g transform="translate(34, -5) scale(0.5)">
              <path d="M32 8L8 20v4l24 12 24-12v-4L32 8z" fill="url(#goldGrad)" />
              <path d="M20 27v12c0 5 5.4 9 12 9s12-4 12-9V27L32 33 20 27z" fill="url(#goldGrad)" opacity="0.85" />
              <rect x="52" y="22" width="3" height="14" rx="1.5" fill="url(#goldGrad)" />
              <circle cx="53.5" cy="37" r="2.5" fill="#D4AF37" />
            </g>

            {/* Eyes and Wings based on state */}
            {visualState === "happy" && (
              <>
                {/* Happy Eyes ^ ^ */}
                <path d="M 33 55 Q 38 48 43 55" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 57 55 Q 62 48 67 55" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                {/* Happy Wings up */}
                <path d="M 18 65 Q 5 45 15 30" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 82 65 Q 95 45 85 30" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              </>
            )}

            {visualState === "error" && (
              <>
                {/* Angry/Sad Eyes - Slanted inward */}
                <path d="M 32 50 L 44 55" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 68 50 L 56 55" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
                {/* Shaking pupils */}
                <circle cx="38" cy="56" r="3" fill="#FFB4AB" />
                <circle cx="62" cy="56" r="3" fill="#FFB4AB" />
                {/* Tear drop */}
                <path d="M 41 60 Q 43 65 41 65 Q 39 65 41 60" fill="#88CCFF" />
                {/* Wings tense down */}
                <path d="M 18 65 Q 25 75 22 85" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 82 65 Q 75 75 78 85" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
              </>
            )}

            {visualState === "hiding" && (
              <>
                {/* Closed Eyes */}
                <path d="M 33 55 Q 38 60 43 55" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 57 55 Q 62 60 67 55" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
                {/* Wings covering eyes */}
                <path d="M 10 80 Q 30 45 45 55" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 90 80 Q 70 45 55 55" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
              </>
            )}

            {visualState === "idle" && (
              <>
                {/* Open Eyes Background */}
                <circle cx="38" cy="53" r="11" fill="#0A0A0A" stroke="url(#goldGrad)" strokeWidth="2" />
                <circle cx="62" cy="53" r="11" fill="#0A0A0A" stroke="url(#goldGrad)" strokeWidth="2" />
                {/* Pupils */}
                <circle cx={38 + pupilX} cy={53 + pupilY} r="5" fill="url(#goldGrad)" />
                <circle cx={62 + pupilX} cy={53 + pupilY} r="5" fill="url(#goldGrad)" />
                {/* Catchlights */}
                <circle cx={38 + pupilX - 1.5} cy={53 + pupilY - 1.5} r="1.5" fill="#FFF" opacity="0.8" />
                <circle cx={62 + pupilX - 1.5} cy={53 + pupilY - 1.5} r="1.5" fill="#FFF" opacity="0.8" />
                {/* Wings resting */}
                <path d="M 18 65 Q 10 80 20 90" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
                <path d="M 82 65 Q 90 80 80 90" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
              </>
            )}

            {/* Beak */}
            {visualState === "happy" ? (
              <path d="M 45 64 Q 50 74 55 64 Z" fill="url(#goldGrad)" />
            ) : visualState === "error" ? (
              <path d="M 46 68 L 54 68 L 50 64 Z" fill="url(#goldGrad)" />
            ) : (
              <path d="M 46 64 L 54 64 L 50 72 Z" fill="url(#goldGrad)" />
            )}
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
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
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

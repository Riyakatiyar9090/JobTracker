import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-navbar">
        <h2 className="logo">🚀 JobTracker</h2>

        <div className="nav-links">
          <a href="#features">Features</a>

          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>Simplify Your Job Search.</h1>

          <p>
            Track, manage and organize all your job applications in one place.
          </p>

          <button className="hero-btn" onClick={() => navigate("/register")}>
            Get Started Free
          </button>
        </div>

        <div className="hero-right">
          <span className="bubble bubble1"></span>
          <span className="bubble bubble2"></span>
          <span className="bubble bubble3"></span>
          <span className="bubble bubble4"></span>
          <span className="bubble bubble5"></span>
          <span className="bubble bubble6"></span>
          <span className="bubble bubble7"></span>
          <span className="bubble bubble8"></span>
          <span className="bubble bubble9"></span>
          <span className="bubble bubble10"></span>

          <div className="hero-image-card">
            <img
              src="https://banner2.cleanpng.com/lnd/20240926/wk/a586d4cca016403991a2311737653f.webp"
              alt="Job Search"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <h2>Features</h2>

        <div className="features-grid">
          <div className="feature-card featured">
            <h3>Dashboard</h3>
            <p>View all applications and statistics in one place.</p>
          </div>

          <div className="feature-card featured">
            <h3>Tracking</h3>
            <p>Track interview rounds and application stages.</p>
          </div>

          <div className="feature-card featured">
            <h3>Analytics</h3>
            <p>Monitor your progress with charts and reports.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Land Your Dream Job?</h2>

        <button className="hero-btn" onClick={() => navigate("/register")}>
          Create Free Account
        </button>
      </section>
    </div>
  );
}

export default LandingPage;

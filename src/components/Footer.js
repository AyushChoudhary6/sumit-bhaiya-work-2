import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <i className="fas fa-scale-balanced"></i> LawMaster
            </h3>
            <p className="footer-description">
              Revolutionizing legal practice through AI-powered tools and
              comprehensive legal intelligence.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Legal Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Criminal Law</a></li>
              <li><a href="#">Civil Law</a></li>
              <li><a href="#">Corporate Law</a></li>
              <li><a href="#">Property Law</a></li>
              <li><a href="#">Family Law</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">Subscribe to get updates on new features and legal insights.</p>
            {subscribed ? (
              <div className="newsletter-success">
                <i className="fas fa-check-circle"></i> Thank you for subscribing!
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2023 LawMaster. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
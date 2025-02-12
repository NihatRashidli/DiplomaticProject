import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <h2>Ready to snip?</h2>
          <p>
            Learn how you can achieve greater efficiency, productivity, and
            effectively mitigate risks across your organization.
          </p>
          <div className="footer-buttons">
            <button className="btn-secondary">Tax Calculate</button>
          </div>
        </div>
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Product</h3>
            <ul>
              <li>Platform</li>
              <li>Financial Statement Suite</li>
              <li>Advanced Extraction Suite</li>
              <li>UpLink</li>
              <li>DocuMine</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Teams</h3>
            <ul>
              <li>External Audit</li>
              <li>Internal Audit</li>
              <li>Tax</li>
              <li>Financial Control</li>
              <li>Government Audit</li>
              <li>Advisory</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Roles</h3>
            <ul>
              <li>Team Contributor</li>
              <li>Manager</li>
              <li>C-level / Partner</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Industries</h3>
            <ul>
              <li>Banking</li>
              <li>Manufacturing</li>
              <li>Insurance</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>Top videos</li>
              <li>Knowledge Base</li>
              <li>Academy</li>
              <li>Community</li>
              <li>Events & Webinars</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About us</li>
              <li>Partners</li>
              <li>1% for the planet</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Datasnipper 2025</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

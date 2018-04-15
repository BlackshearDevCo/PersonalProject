import React from "react";
import "./footer.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-left">
          <h3 className="footer-title">Links</h3>
          <ul>
            <li className="footer-link">
              <Link to="/" />Home
            </li>
            <li className="footer-link">
              <Link to="/developers" />Developers
            </li>
            <li className="footer-link">
              <Link to="/companies" />Companies
            </li>
            <li className="footer-link">
              <Link to="/profile" />Profile
            </li>
            <li className="footer-link">
              <Link to="/about" />About
            </li>
            <li className="footer-link">
              <Link to="/contact" />Contact
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3 className="footer-title">Social Media</h3>
          <ul>
            <li className="footer-link">Twitter</li>
            <li className="footer-link">Facebook</li>
            <li className="footer-link">Instagram</li>
          </ul>
        </div>
      </footer>
      <p className="copyright">Copyright ConnectDev 2018 &copy; </p>
    </div>
  );
}

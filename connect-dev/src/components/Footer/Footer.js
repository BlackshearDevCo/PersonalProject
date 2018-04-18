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
              <Link to="/">Home</Link>
            </li>
            <li className="footer-link">
              <Link to="/devs">Developers</Link>
            </li>
            <li className="footer-link">
              <Link to="/employers">Companies</Link>
            </li>
            <li className="footer-link">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="footer-link">
              <Link to="/about">About</Link>
            </li>
            <li className="footer-link">
              <Link to="/contact">Contact</Link>
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

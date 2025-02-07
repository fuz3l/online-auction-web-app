import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo & About */}
                <div className="footer-section">
                    <h2 className="footer-logo">AuctionHouse</h2>
                    <p>Your trusted platform for luxury auctions.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div className="footer-section">
                    <h3>Stay Connected</h3>
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedin /></a>
                    </div>

                    <h3>Newsletter</h3>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} AuctionHouse. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;

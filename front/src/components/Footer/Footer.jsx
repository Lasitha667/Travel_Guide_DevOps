import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Column 1: Brand & Social */}
                    <div className="footer-section brand-section">
                        <div className="brand-logo">
                            <h3>Lanka Voyager</h3>
                        </div>
                        <p className="brand-desc">
                            Explore the world with us. Discover new places and create unforgettable memories with our curated travel experiences.
                        </p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-section links-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#destinations">Destinations</a></li>
                            <li><a href="#tours">Tours</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className="footer-section links-section">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="footer-section newsletter-section">
                        <h4>Newsletter</h4>
                        <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <input type="email" placeholder="Your email address" required />
                                <button type="submit" className="btn btn-primary">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TravelGuide. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

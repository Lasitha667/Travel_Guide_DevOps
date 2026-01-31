import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPlane } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <FaPlane className="navbar-icon" />
                    TravelGuide
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="#destinations" className="nav-links" onClick={closeMobileMenu}>
                            Destinations
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                </ul>
                <div className="nav-btn">
                    <Link to="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>Login</Link>
                    <Link to="/signup" className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './Home.css';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-overlay"></div>
                    <div className="hero-content container">
                        <h1>Explore the World With Us</h1>
                        <p>Lasitha and create unforgettable memories. Your adventure starts here.</p>
                        <div className="search-box">
                            <input type="text" placeholder="Where do you want to go?" />
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </section>
                
                {/* Featured Destinations */}
                <section className="section destinations-section" id="destinations">
                    <div className="container">
                        <h2 className="section-title">Popular Destinations</h2>
                        <p className="section-subtitle">Curated experiences in the world's most breathtaking locations.</p>
                        <div className="destinations-grid">
                            <div className="destination-card">
                                <div className="card-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499856871940-b609c9217c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}></div>
                                <div className="card-content">
                                    <h3>Paris, France</h3>
                                    <p>Experience the romance of the Eiffel Tower and the charm of Montmartre.</p>
                                </div>
                            </div>
                            <div className="destination-card">
                                <div className="card-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80)' }}></div>
                                <div className="card-content">
                                    <h3>Cinque Terre, Italy</h3>
                                    <p>Discover colorful fishing villages perched high on the Italian Riviera.</p>
                                </div>
                            </div>
                            <div className="destination-card">
                                <div className="card-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}></div>
                                <div className="card-content">
                                    <h3>Alps, Switzerland</h3>
                                    <p>Immerse yourself in nature with breathtaking mountain views and hiking trails.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section features-section">
                    <div className="container">
                        <h2 className="section-title">Why Choose Us</h2>
                        <p className="section-subtitle">We are dedicated to providing you with the best travel experience possible.</p>
                        <div className="features-grid">
                            <div className="feature-item">
                                <h3>Best Prices</h3>
                                <p>We guarantee the best prices for your trips.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Top Guides</h3>
                                <p>Our guides are experts and locals.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Easy Booking</h3>
                                <p>Book your next trip in just a few clicks.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Home;

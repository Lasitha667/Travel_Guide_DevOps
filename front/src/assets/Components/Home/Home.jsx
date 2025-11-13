import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">TravelLanka</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>Destinations</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Discover the Beauty of Sri Lanka</h2>
          <p>
            From golden beaches to lush mountains — your adventure begins here.
          </p>
          <button className="btn">Explore Now</button>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="destinations">
        <h3>Popular Destinations</h3>
        <div className="destinations-list">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1586864387774-6b3f2d1fef46"
              alt="Sigiriya"
            />
            <h4>Sigiriya Rock Fortress</h4>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1589308078059-46e3ad88a11b"
              alt="Ella"
            />
            <h4>Ella Mountains</h4>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1542089363-08d65de6470a"
              alt="Mirissa"
            />
            <h4>Mirissa Beach</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TravelLanka. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

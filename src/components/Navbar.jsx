import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="app-navbar">
      <div className="navbar-brand">
        <h1>Moody<span className="accent-text">Player</span></h1>
      </div>
      <div className="navbar-links">
        <a href="#detector">Detector</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#footer-contact">CONTACT ME</a>

      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle menu toggle for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`lawmaster-navbar ${isScrolled ? 'lawmaster-navbar-scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="lawmaster-navbar-container">
          <div className="lawmaster-navbar-logo">
            <a href="#home" onClick={handleLinkClick}>
              <span className="lawmaster-logo-icon">⚖️</span>
              <span className="lawmaster-logo-text">LawMaster</span>
            </a>
          </div>
          
          <div className={`lawmaster-navbar-links ${isOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
              <li><a href="#features" onClick={handleLinkClick}>Features</a></li>
              <li><a href="#resources" onClick={handleLinkClick}>Resources</a></li>
              <li><a href="#pricing" onClick={handleLinkClick}>Pricing</a></li>
              <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
              <li className="lawmaster-nav-search">
                <div className="lawmaster-search-box">
                  <input type="text" placeholder="Type here to search" />
                  <button aria-label="Search">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>
              <li>
                <button className="lawmaster-btn lawmaster-btn-primary" onClick={handleLinkClick}>
                  Get Started
                </button>
              </li>
            </ul>
          </div>
          
          <button 
            className={`lawmaster-navbar-toggle ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
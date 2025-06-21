import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggleButton from './controls/ThemeToggleButton';
import '../styles/Navbar.scss';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${showNavbar ? '' : 'navbar--hidden'}`}>
      <div className="navbar-left">
        <div className="navbar-title">Andrei Zubrytski</div>
        <ThemeToggleButton isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      </div>
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" className="nav-link" end onClick={closeMobileMenu}>
          About Me
        </NavLink>
        <NavLink to="/blog" className="nav-link" onClick={closeMobileMenu}>
          Blog
        </NavLink>
        <NavLink to="/beats" className="nav-link" onClick={closeMobileMenu}>
          My Beats
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar; 
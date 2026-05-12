'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggleButton from './controls/ThemeToggleButton';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

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
        <Link
          href="/"
          className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          About Me
        </Link>
        <Link
          href="/blog"
          className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          Blog
        </Link>
        <Link
          href="/beats"
          className={`nav-link ${pathname === '/beats' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          My Beats
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 

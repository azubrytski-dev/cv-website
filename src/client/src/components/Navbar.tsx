'use client';

import Link from 'next/link';
import ThemeToggleButton from './controls/ThemeToggleButton';
import { SectionLinks } from './SectionNavigation';
import type { SectionNavigationProps } from './SectionNavigation';

interface NavbarProps extends SectionNavigationProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDarkMode, onToggleTheme, activeSection, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner cv-frame">
        <Link href="/" className="navbar-title">Andrei Zubrytski</Link>
        <div className="navbar-actions">
          <div className="navbar-sections">
            <SectionLinks activeSection={activeSection} onNavigate={onNavigate} />
          </div>
          <ThemeToggleButton isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
        </div>
      </div>
    </nav>
  );
}

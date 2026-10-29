'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from '../components/Navbar';
import ContactFooter from '../components/ContactFooter';
import SectionNavigation from '../components/SectionNavigation';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import { darkTheme, lightTheme } from '../themes/themes';

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const { activeSection, navigateToSection } = useSectionNavigation();

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsDarkMode((previous) => !previous);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        className="cv-site"
        data-cv-theme={isDarkMode ? 'dark' : 'light'}
        sx={{
          minHeight: '100vh',
          '@supports (min-height: 100dvh)': { minHeight: '100dvh' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} activeSection={activeSection} onNavigate={navigateToSection} />
        <Box className="cv-content-shell cv-frame">
          <SectionNavigation activeSection={activeSection} onNavigate={navigateToSection} />
          <Container maxWidth={false} disableGutters component="main" sx={{ minWidth: 0 }}>
            {children}
          </Container>
        </Box>
        <ContactFooter />
      </Box>
    </ThemeProvider>
  );
}

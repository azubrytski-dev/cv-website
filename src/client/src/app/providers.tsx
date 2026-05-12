'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from '../components/Navbar';
import { darkTheme, lightTheme } from '../themes/themes';

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setIsDarkMode((previous) => !previous);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box className={isDarkMode ? 'dark-theme' : 'light-theme'}>
        <Navbar isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} />
        <Container sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', minHeight: '100vh' }}>{children}</Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

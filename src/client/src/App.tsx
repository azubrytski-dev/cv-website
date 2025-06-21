import React from 'react';
import { darkTheme, lightTheme } from './themes/themes';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;
  
    const handleThemeToggle = () => {
      setIsDarkMode((prev) => !prev);
    };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box className={isDarkMode ? 'dark-theme' : 'light-theme'}>
        <Navbar isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle} />
        <Container sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<AboutMe />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

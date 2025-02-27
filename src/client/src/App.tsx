import React from 'react';
import { darkTheme, lightTheme } from './themes/themes';
import { Box, Button, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ThemeToggleButton from './components/controls/ThemeToggleButton';
import PortfolioGrid from './components/PortfolioGrid';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;
  
    const handleThemeToggle = () => {
      setIsDarkMode((prev) => !prev);
    };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      
      <Container sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <ThemeToggleButton
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
          <PortfolioGrid />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

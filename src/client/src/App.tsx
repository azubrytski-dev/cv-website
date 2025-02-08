import React from 'react';
import { darkTheme, lightTheme } from './themes/themes';
import { Button, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import ThemeToggleButton from './controls/ThemeToggleButton';

const App: React.FC = () => {
    // State to track which theme is active
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    // Decide which theme to use based on the state
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
  
    // Toggle between dark and light themes
    const handleThemeToggle = () => {
      setIsDarkMode((prev) => !prev);
    };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      
      <Container sx={{ textAlign: 'center', py: 4 }}>
        {/* Button to switch themes */}
        <ThemeToggleButton isDarkMode={isDarkMode} onToggleTheme={handleThemeToggle}/>

        <Header />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
      </Container>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
    </Container>
  );
}

export default App;

'use client';

import { Box } from '@mui/material';
import Header from './Header';
import Experience from './Experience';
import Skills from './Skills';
import Education from './Education';

export default function PortfolioGrid() {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 6, md: 9 }, pt: { xs: 5, md: 8 } }}>
      <Header />
      <Experience />
      <Skills />
      <Education />
    </Box>
  );
}

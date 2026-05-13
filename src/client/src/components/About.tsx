'use client';

import React from 'react';
import { Typography, Paper, useTheme } from '@mui/material';
import { getGlassSurfaceStyles } from '../styles/glass.styles';

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '1.5rem',
        textAlign: 'left',
        width: '100%',
        borderRadius: '0.75rem',
        ...getGlassSurfaceStyles(theme),
      }}
      >
      <Typography variant="h5">About Me</Typography>
      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
        I&apos;m a full-stack, full-cycle software engineer with 7+ years of experience building backend-heavy products across FinTech, Healthcare, PLM, E-Commerce, and Insurance. I work from architecture and delivery planning through implementation and release, and I care about making systems practical, maintainable, and scalable.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1.25, fontSize: '1.1rem', lineHeight: 1.6 }}>
        Outside of work, I&apos;m an AI enthusiast who likes exploring practical automation and developer tooling, and I also enjoy traveling and music. That mix keeps me curious, adaptable, and always learning.
      </Typography>
    </Paper>
  );
}

export default About;

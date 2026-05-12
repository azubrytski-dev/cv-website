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
      <Typography variant="body1" sx={{fontSize: '1.4rem'}}>
        I am a Senior .NET Engineer with over 7 years of experience in software development. I hold a Bachelor&apos;s degree in Computer Science and a Master&apos;s degree in Engineering from Belarusian State University of Informatics and Radioelectronics. My expertise spans various domains including E-Commerce, Fintech, PLM, Insurance, and Healthcare.
      </Typography>
    </Paper>
  );
}

export default About;

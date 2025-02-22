import React from 'react';
import { Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0', textAlign: 'left', width: '100%' }}>
      <Typography variant="h5">About Me</Typography>
      <Typography variant="body1" sx={{fontSize: '1.4rem'}}>
        I am a Senior .NET Engineer with over 7 years of experience in software development. I hold a Bachelor's degree in Computer Science and a Master's degree in Engineering from Belarusian State University of Informatics and Radioelectronics. My expertise spans various domains including E-Commerce, Fintech, PLM, Insurance, and Healthcare.
      </Typography>
    </Box>
  );
}

export default About;

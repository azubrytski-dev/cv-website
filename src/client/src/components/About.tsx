import React from 'react';
import { Typography, Box } from '@mui/material';
import Typical from 'react-typical';


const About: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0', textAlign: 'left', width: '100%' }}>
      <Typography variant="h5">About Me</Typography>
      <Typography variant="body1" sx={{fontSize: '1.4rem'}}>
        <Typical
            steps={[
              "I am a Senior .NET Engineer...",
              2000, // Pause for 2s
              "I have 7+ years of experience...",
              2000,
              "I specialize in E-Commerce, Fintech, and more...",
              2000,
              "Expertise in .NET, React, PostgreSQL, and more...",
              2000
            ]}
            loop={Infinity}
            wrapper="span"
          />
        </Typography>
    </Box>
  );
}

export default About;

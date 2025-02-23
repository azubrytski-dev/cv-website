import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const educationData = [
  {
    institution: "Belarusian State University of Informatics and Radioelectronics",
    degree: "Bachelor’s in Computer Science",
    specialization: "Software Engineering",
  },
  {
    institution: "Belarusian National Technical University",
    degree: "Bachelor’s and Master’s in Engineering",
    specialization: "Hydraulic Engineering and Scientific Research",
  },
];

const EducationPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const Education: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0', width: '100%' }}>
      <Typography variant="h5" gutterBottom>Education</Typography>
      <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
        {educationData.map((edu, index) => (
          <Grid item xs={12} key={index}>
            <EducationPaper elevation={3}>
              <Typography variant="h6">{edu.institution}</Typography>
              <Typography variant="body1">{edu.degree}</Typography>
              <Typography variant="body2">{edu.specialization}</Typography>
            </EducationPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Education;

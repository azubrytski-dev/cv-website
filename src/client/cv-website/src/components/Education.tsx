import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const educationData = [
  {
    institution: "Belarusian State University of Informatics and Radioelectronics",
    degree: "Bachelor’s in Computer Science",
  },
  {
    institution: "Belarusian State University of Informatics and Radioelectronics",
    degree: "Bachelor’s and Master’s in Engineering",
  },
];

const EducationPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const Education: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0' }}>
      <Typography variant="h5" gutterBottom>Education</Typography>
      <Grid container spacing={2}>
        {educationData.map((edu, index) => (
          <Grid item xs={12} key={index}>
            <EducationPaper elevation={3}>
              <Typography variant="h6">{edu.institution}</Typography>
              <Typography variant="body1">{edu.degree}</Typography>
            </EducationPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Education;

'use client';

import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Grid, useTheme } from "@mui/material";
import { Education as EducationModel } from "../models/Education";
import { getEducationInformation } from "../services/portfolio.service";
import { getGlassSurfaceStyles } from "../styles/glass.styles";

const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationModel[]>([]);
  const theme = useTheme();

  useEffect(() => {
    setEducationData(getEducationInformation());
  }, []);

  if (!educationData.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "2rem 0", width: "100%" }}>
      <Typography variant="h5" gutterBottom>Education</Typography>
      <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
        {educationData.map((edu, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "0.75rem",
                ...getGlassSurfaceStyles(theme),
              }}
            >
              <Typography variant="h6">{edu.institution}</Typography>
              <Typography variant="body1">{edu.degree}</Typography>
              <Typography variant="body2">{edu.specialization}</Typography>
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>{edu.description}</Typography>
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                <a href={edu.website} target="_blank" rel="noopener noreferrer">{edu.website}</a>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Typography variant="caption" color="text.secondary">{edu.graduatedYear}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Education;

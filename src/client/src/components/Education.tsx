import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { Education as EducationModel } from "../models/Education";
import { getEducationInformation } from "../services/portfolio.service";

const EducationPaper = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "0.75rem",
}));

const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationModel[]>([]);

  useEffect(() => {
    setEducationData(getEducationInformation());
  }, []);

  if (!educationData.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "2rem 0", width: "100%" }}>
      <Typography variant="h5" gutterBottom>Education</Typography>
      <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
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
};

export default Education;
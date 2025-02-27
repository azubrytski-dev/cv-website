import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import FlipCard from "./shared/FlipCard";
import { Experience as ExperienceModel } from "../models/Experience";
import { getExperienceInformation } from "../services/portfolio.service";
import { calculateDuration } from "../utils/string.utils";

const ExperiencePaper = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  margin: "1rem 0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "15.625rem",
  borderRadius: "0.75rem",
}));

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);

  useEffect(() => {
    setExperiences(getExperienceInformation());
  }, []);

  if (!experiences.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "2rem 0", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Professional Experience
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
        {experiences.map((exp, index) => (
          <Grid item xs={12} md={4} key={index}>
            <ExperiencePaper elevation={3}>
              <FlipCard
                frontText={`${exp.company} - ${exp.role}`}
                backText={`${exp.description}\n\nTech Stack: ${exp.techStack}\nDuration: ${calculateDuration(exp.startDate, exp.endDate)}`}
              />
            </ExperiencePaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;

import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { Technology } from "../models/Technology";
import { getTechnologiesInformation } from "../services/portfolio.service";
import SkillItem from "./shared/SkillItem";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Technology[]>([]);

  useEffect(() => {
    setSkills(getTechnologiesInformation());
  }, []);

  if (!skills.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "2rem 0", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Skills & Technologies
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {skills.map((tech, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SkillItem
              name={tech.name}
              title={tech.title}
              description={tech.description}
              rate={tech.rate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;

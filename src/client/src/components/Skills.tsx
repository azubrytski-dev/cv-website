'use client';

import React from "react";
import { Typography, Box, Grid, Chip, Stack } from "@mui/material";
import { getSkillCategoriesInformation } from "../services/portfolio.service";
import SkillItem from "./shared/SkillItem";

const skillCategories = getSkillCategoriesInformation();

const Skills: React.FC = () => {
  return (
    <Box sx={{ padding: "2rem 0", width: "100%", px: { xs: 1.5, md: 1 } }}>
      <Typography variant="h5" gutterBottom>
        Skills & Technologies
      </Typography>

      <Stack spacing={4}>
        {skillCategories.map((category) => (
          <Box key={category.key} sx={{ width: "100%", px: { xs: 0.75, md: 0.5 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "left", color: "text.secondary" }}>
                  {category.description}
                </Typography>
              </Box>
              <Chip
                label={`${category.skills.length} skills`}
                size="small"
                variant="outlined"
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              />
            </Stack>

            <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
              {category.skills.map((skill) => (
                <Grid item xs={12} sm={6} md={4} key={skill.key}>
                  <SkillItem
                    skillKey={skill.key}
                    title={skill.title}
                    description={skill.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Skills;

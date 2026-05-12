'use client';

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import { Experience as ExperienceModel } from "../models/Experience";
import { getExperienceInformation } from "../services/portfolio.service";
import { calculateDuration } from "../utils/string.utils";
import { getGlassSurfaceStyles } from "../styles/glass.styles";

const ExperienceCard: React.FC<{
  experience: ExperienceModel;
  onClick: () => void;
}> = ({ experience, onClick }) => {
  const theme = useTheme();
  const techStackItems = experience.techStack.split(",").map((item) => item.trim());
  const visibleTechStack = techStackItems.slice(0, 4);
  const remainingTechCount = Math.max(0, techStackItems.length - visibleTechStack.length);

  return (
    <Paper
      elevation={3}
      onClick={onClick}
      sx={{
        padding: "1.25rem",
        width: "100%",
        minHeight: "16rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        ...getGlassSurfaceStyles(theme),
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.75rem",
            fontWeight: 700,
            opacity: 0.8,
          }}
        >
          {experience.company}
        </Typography>
        <Typography variant="h6" sx={{ mt: 0.5, lineHeight: 1.15, fontWeight: 700 }}>
          {experience.role}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {experience.startDate} - {experience.endDate} ({calculateDuration(experience.startDate, experience.endDate)})
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {experience.description}
        </Typography>

        <Stack direction="row" sx={{ mt: 2, flexWrap: "wrap", gap: "0.5rem" }}>
          {visibleTechStack.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
          {remainingTechCount > 0 && (
            <Chip key="more" label={`+${remainingTechCount} more`} size="small" variant="outlined" />
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceModel[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceModel | null>(null);

  useEffect(() => {
    setExperiences(getExperienceInformation());
  }, []);

  const handleOpen = (exp: ExperienceModel) => {
    setSelectedExperience(exp);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExperience(null);
  };

  if (!experiences.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "2rem 0", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Professional Experience
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
        {experiences.map((exp, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ExperienceCard experience={exp} onClick={() => handleOpen(exp)} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "text.secondary", textAlign: "center" }}>
          {selectedExperience?.company} - {selectedExperience?.role}
        </DialogTitle>
        {selectedExperience && (
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: "text.secondary", fontWeight: 400, mb: 1 }}
          >
            {selectedExperience.startDate} - {selectedExperience.endDate}
            {` (` + calculateDuration(selectedExperience.startDate, selectedExperience.endDate) + `)`}
          </Typography>
        )}
        <DialogContent dividers>
          {selectedExperience && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedExperience.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tech Stack:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedExperience.techStack}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Responsibilities:
              </Typography>
              <List dense>
                {selectedExperience.responsibilities.map((resp, idx) => (
                  <ListItem key={idx} sx={{ py: 0, my: 0, minHeight: 0 }}>
                    <Checkbox checked disabled sx={{ p: 0.5, mr: 1 }} />
                    <ListItemText primary={resp} sx={{ my: 0 }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ color: "black" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Experience;

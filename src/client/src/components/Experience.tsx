import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Paper, Modal, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Checkbox } from "@mui/material";
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
          <Grid item xs={12} md={4} key={index}>
            <ExperiencePaper elevation={3} onClick={() => handleOpen(exp)} sx={{ cursor: 'pointer' }}>
              <FlipCard
                frontText={`${exp.company} - ${exp.role}`}
                backText={`${exp.description}\n\nTech Stack: ${exp.techStack}\nDuration: ${calculateDuration(exp.startDate, exp.endDate)}`}
              />
            </ExperiencePaper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {selectedExperience?.company} - {selectedExperience?.role}
        </DialogTitle>
        {selectedExperience && (
          <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary', fontWeight: 400, mb: 1 }}>
            {selectedExperience.startDate} - {selectedExperience.endDate}
            {` (` + calculateDuration(selectedExperience.startDate, selectedExperience.endDate) + `)`}
          </Typography>
        )}
        <DialogContent dividers>
          {selectedExperience && (
            <Box>
              <Typography variant="body1" gutterBottom>Description:</Typography>
              <Typography variant="body2" gutterBottom>{selectedExperience.description}</Typography>
              <Typography variant="body1" gutterBottom>Tech Stack:</Typography>
              <Typography variant="body2" gutterBottom>{selectedExperience.techStack}</Typography>
              <Typography variant="body1" gutterBottom>Responsibilities:</Typography>
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
          <Button onClick={handleClose} color="primary" sx={{ color: 'black' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Experience;

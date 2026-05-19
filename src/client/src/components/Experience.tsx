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

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: (theme) => ({
            borderRadius: 4,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(10, 12, 11, 0.96), rgba(6, 8, 8, 0.92))'
                : 'linear-gradient(180deg, rgba(255,255,255,0.94), rgba(248,250,252,0.98))',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid rgba(13,255,158,0.12)'
                : '1px solid rgba(25,118,210,0.14)',
            backdropFilter: 'blur(18px) saturate(145%)',
            WebkitBackdropFilter: 'blur(18px) saturate(145%)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 20px 52px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 20px 52px rgba(25,118,210,0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
          }),
        }}
      >
        <DialogTitle
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? 'rgba(238,238,238,0.96)' : 'text.primary',
            textAlign: 'center',
            pb: 0.75,
          })}
        >
          {selectedExperience?.company} - {selectedExperience?.role}
        </DialogTitle>
        {selectedExperience && (
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: 'text.secondary', fontWeight: 400, mb: 1.5, px: 3 }}
          >
            {selectedExperience.startDate} - {selectedExperience.endDate}
            {` (` + calculateDuration(selectedExperience.startDate, selectedExperience.endDate) + `)`}
          </Typography>
        )}
        <DialogContent
          dividers
          sx={(theme) => ({
            px: 3,
            py: 2.5,
            borderTopColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(127,127,127,0.18)',
            borderBottomColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(127,127,127,0.18)',
          })}
        >
          {selectedExperience && (
            <Box
              sx={(theme) => ({
                p: 2.5,
                borderRadius: 3,
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(13,255,158,0.10)'
                  : '1px solid rgba(25,118,210,0.12)',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              })}
            >
              <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
                Description:
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ lineHeight: 1.7 }}>
                {selectedExperience.description}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                Tech Stack:
              </Typography>
              <Typography variant="body2" gutterBottom>
                {selectedExperience.techStack}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
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
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={(theme) => ({
              textTransform: 'none',
              fontWeight: 800,
              borderRadius: 999,
              minWidth: 124,
              py: 1,
              px: 2.5,
              backgroundImage: 'none',
              borderWidth: 1,
              borderStyle: 'solid',
              color: theme.palette.mode === 'dark' ? 'common.white' : '#111111',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.22)' : 'rgba(25,118,210,0.42)',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.16)',
              backdropFilter: 'blur(14px) saturate(155%)',
              WebkitBackdropFilter: 'blur(14px) saturate(155%)',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 0 0 1px rgba(13,255,158,0.08), 0 8px 18px rgba(0,0,0,0.14)'
                  : '0 0 0 1px rgba(25,118,210,0.05), 0 8px 18px rgba(25,118,210,0.08)',
              '&:hover': {
                backgroundImage: 'none',
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 0 0 1px rgba(13,255,158,0.10), 0 10px 20px rgba(0,0,0,0.16)'
                    : '0 0 0 1px rgba(25,118,210,0.08), 0 10px 20px rgba(25,118,210,0.10)',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.26)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.30)' : 'rgba(25,118,210,0.58)',
              },
            })}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Experience;

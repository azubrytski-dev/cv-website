'use client';

import { useState } from 'react';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Experience as ExperienceModel } from '../models/Experience';
import { getExperienceInformation } from '../services/portfolio.service';
import { calculateDuration } from '../utils/string.utils';

const experiences = getExperienceInformation();

export default function Experience() {
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceModel | null>(null);

  const handleOpen = (experience: ExperienceModel) => {
    setSelectedExperience(experience);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box component="section" id="experience" aria-labelledby="experience-title">
      <Typography id="experience-title" variant="h2" component="h2">Professional Experience</Typography>
      <Box sx={{ mt: 3.5 }}>
        {experiences.map((experience, index) => (
          <Box
            key={`${experience.company}-${experience.role}-${experience.startDate}`}
            component="article"
            aria-labelledby={`role-${index}`}
            sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '10rem minmax(0, 1fr)' }, gap: { xs: 1.25, md: 4 }, py: { xs: 3, md: 3.5 }, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Box sx={{ color: 'text.secondary', pt: { md: 0.25 } }}>
              <Typography variant="caption" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                <Box component="span" sx={{ display: { xs: 'inline', md: 'block' } }}>{experience.startDate} </Box>
                <Box component="span">— {experience.endDate}</Box>
              </Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.25 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{experience.company}</Typography>
                {experience.endDate.toLowerCase() === 'present' && <Chip label="Current" size="small" variant="outlined" sx={{ color: 'primary.main', borderColor: 'primary.main', height: 22 }} />}
              </Box>
              <Typography id={`role-${index}`} component="h3" variant="h3" sx={{ mt: 0.5 }}>{experience.role}</Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>{experience.description}</Typography>
              <Box component="ul" sx={{ pl: 2.25, my: 1.5, color: 'text.secondary', '& li + li': { mt: 0.5 } }}>
                {experience.responsibilities.slice(0, 2).map(item => <li key={item}><Typography variant="body2">{item}</Typography></li>)}
              </Box>
              <Typography variant="caption" color="text.secondary" component="p">
                <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>Technologies: </Box>{experience.techStack}
              </Typography>
              <Button
                aria-label={`View role details: ${experience.company}, ${experience.role}`}
                aria-haspopup="dialog"
                disableRipple
                onClick={() => handleOpen(experience)}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 1, ml: '-10px', p: '8px 10px', minWidth: 0, gap: '8px',
                  color: 'primary.main', fontWeight: 500, background: 'transparent',
                  border: 0, borderRadius: 0, boxShadow: 'none',
                  '& .MuiButton-endIcon': { m: 0, '& svg': { fontSize: '1rem' } },
                  '&:hover': { color: 'primary.dark', background: 'transparent', boxShadow: 'none', textDecoration: 'underline', textUnderlineOffset: '4px' },
                  '&.Mui-focusVisible, &:focus:not(:focus-visible)': { outline: 'none' },
                  '&:focus-visible': { outline: '1px solid var(--cv-color-primary)', outlineOffset: '3px' },
                }}
              >
                View role details
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedExperience?.company} - {selectedExperience?.role}
        </DialogTitle>
        {selectedExperience && (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", px: 3, pb: 2 }}
          >
            {selectedExperience.startDate} - {selectedExperience.endDate}
            {` (` + calculateDuration(selectedExperience.startDate, selectedExperience.endDate) + `)`}
          </Typography>
        )}
        <DialogContent dividers>
          {selectedExperience && (
            <Box sx={{ display: "grid", gap: 3 }}>
              <Box component="section">
                <Typography variant="subtitle2" component="h3" color="text.primary" gutterBottom>
                  Description:
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  {selectedExperience.description}
                </Typography>
              </Box>
              <Box component="section">
                <Typography variant="subtitle2" component="h3" color="text.primary" gutterBottom>
                  Tech Stack:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedExperience.techStack.split(",").map((tech) => (
                    <Chip key={tech.trim()} label={tech.trim()} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box component="section">
                <Typography variant="subtitle2" component="h3" color="text.primary" gutterBottom>
                  Responsibilities:
                </Typography>
                <List dense disablePadding>
                  {selectedExperience.responsibilities.map((resp, idx) => (
                    <ListItem key={idx} disableGutters alignItems="flex-start" sx={{ py: 0.5 }}>
                      <CheckCircleOutlineIcon fontSize="small" sx={{ color: "primary.main", mt: 0.4, mr: 1.25 }} />
                      <ListItemText
                        primary={resp}
                        primaryTypographyProps={{ variant: "body2", sx: { color: "text.secondary", lineHeight: 1.6 } }}
                        sx={{ my: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" sx={{ minWidth: 120, width: { xs: "100%", sm: "auto" } }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

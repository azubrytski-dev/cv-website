import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Skills: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0' }}>
      <Typography variant="h5">Skills</Typography>
      <Typography variant="h6">Hard Skills</Typography>
      <List>
        {[
          "Software Architecture and Design",
          "Project Estimation and Technical Documentation",
          "Test-Driven Development (TDD) and Domain-Driven Design (DDD)",
          "Development Best Practices: OOP, SOLID, KISS, DRY",
          "Agile Methodologies: Scrum, Kanban",
          "Technical Interviewing"
        ].map(skill => (
          <ListItem key={skill}>
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Soft Skills</Typography>
      <List>
        {[
          "Leadership and Mentoring",
          "Effective Communication",
          "Self-Organization",
          "Risk Assessment",
          "Delegation",
          "Presentation Skills"
        ].map(skill => (
          <ListItem key={skill}>
            <ListItemText primary={skill} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Skills;

import React from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const experiences = [
  {
    company: "Intetics",
    role: "Senior Software Engineer / Team Lead",
    duration: "October 2021 - Present",
    description: "Led a team of 10 developers. Developed architecture and design. Automated tasks and improved billing processes for healthcare projects.",
    techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, AWS"
  },
  {
    company: "Aras",
    role: "System Architect",
    duration: "April 2020 - October 2021",
    description: "Optimized solutions based on non-functional requirements. Led development teams and mentored developers.",
    techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps"
  },
  {
    company: "Aras",
    role: "Senior Software Engineer (.NET)",
    duration: "April 2019 - April 2020",
    description: "Customized platform solutions. Integrated third-party services.",
    techStack: "REST/SOAP, .NET, MS SQL, Azure DevOps"
  },
  {
    company: "Disprz",
    role: ".NET Developer/Team Lead",
    duration: "February 2019 - April 2019",
    description: "Developed MVP chat bot for bank employee onboarding.",
    techStack: "C#, ASP.NET Core, Azure"
  },
  {
    company: "Andersen Labs",
    role: ".NET Developer/Team Lead",
    duration: "June 2017 - April 2019",
    description: "Developed E-Commerce platform services. Planned and led migrations.",
    techStack: "C#, ASP.NET MVC, React, Dapper"
  },
  {
    company: "Andersen Labs",
    role: "Junior .NET Developer",
    duration: "December 2016 - June 2017",
    description: "Developed vehicle insurance system.",
    techStack: "C#, ASP.NET MVC, JavaScript"
  }
];

const ExperiencePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const Experience: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0' }}>
      <Typography variant="h5" gutterBottom>Professional Experience</Typography>
      <Grid container spacing={2}>
        {experiences.map((exp, index) => (
          <Grid item xs={12} key={index}>
            <ExperiencePaper elevation={3}>
              <Typography variant="h6">{exp.company}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{exp.role}</Typography>
              <Typography variant="body2" color="textSecondary">{exp.duration}</Typography>
              <Typography variant="body1" paragraph>{exp.description}</Typography>
              <Typography variant="body2"><strong>Tech Stack:</strong> {exp.techStack}</Typography>
            </ExperiencePaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Experience;

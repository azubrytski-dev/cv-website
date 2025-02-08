import React from 'react';
import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { styled } from '@mui/system';

const projects = [
  {
    name: "Health Care/Mass Medicine",
    role: "Senior Software Engineer / Team Lead",
    description: "Multiple projects for the network of clinics, billing department, and automation processes.",
    company: "Intetics",
    date: "October 2021 - Present",
    techStack: ".NET Core, React, CouchDB, RabbitMQ, MSSQL, Redis, ElasticSearch, Grafana, Jenkins, AWS (EC2, S3, PostgreSQL)"
  },
  {
    name: "Aras Innovator (PLM)",
    role: "System Architect",
    description: "Low-code platform for faster and more flexible deployments and enterprise applications.",
    company: "Aras",
    date: "April 2020 - October 2021",
    techStack: "REST/SOAP, .NET, .NET Core, MS SQL, C#, NAnt, Groovy, JavaScript, Node.js, Git, Active Directory, LDAP, SSO, SAP, IIS, Azure DevOps"
  },
  {
    name: "Aras Innovator (PLM)",
    role: "Senior Software Engineer (.NET)",
    description: "Customizing platform solutions and integrating third-party services.",
    company: "Aras",
    date: "April 2019 - April 2020",
    techStack: "REST/SOAP, .NET, .NET Core, MS SQL, C#, NAnt, Groovy, JavaScript, Node.js, Git, Active Directory, LDAP, SSO, SAP, IIS, Azure DevOps"
  },
  {
    name: "Chat Bot (MVP)",
    role: ".NET Developer/Team Lead",
    description: "Onboarding chat bot MVP for new bank employees, providing a short course with learning materials and quizzes.",
    company: "Disprz",
    date: "February 2019 - April 2019",
    techStack: "C#, ASP.NET Core WebAPI, Azure Bot Framework, Azure Speech Services, Git, Azure DevOps, Azure Pipelines"
  },
  {
    name: "E-Commerce Platform",
    role: ".NET Developer/Team Lead",
    description: "Platform for multi-level marketing companies with services for accounting, document circulation, reporting, and correspondence.",
    company: "Andersen Labs",
    date: "June 2017 - April 2019",
    techStack: "C#, ASP.NET MVC, MS SQL, JavaScript, React, jQuery, Dapper, HTML5, SCSS"
  },
  {
    name: "Vehicle Insurance",
    role: "Junior .NET Developer",
    description: "Insurance policy system for collecting customer information, preliminary data analysis, and forecasting potential offers.",
    company: "Andersen Labs",
    date: "December 2016 - June 2017",
    techStack: "C#, ASP.NET MVC, ASP.NET Web API, JavaScript, jQuery, T-SQL, Jira, CSS3"
  }
];

const ProjectsTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const Projects: React.FC = () => {
  return (
    <Box sx={{ padding: '20px 0' }}>
      <Typography variant="h5" gutterBottom>Projects</Typography>
      <Paper>
        <Table aria-label="projects table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Tech Stack</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.role}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.company}</TableCell>
                <TableCell>{project.date}</TableCell>
                <TableCell>{project.techStack}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Projects;

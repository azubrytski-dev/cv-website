import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/system";
import { getProjectsInformation } from "../services/portfolio.service";
import { Project } from "../models/Project";
import { calculateDuration } from "../utils/string.utils";

const ProjectsTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "1.25rem 0",
  borderRadius: "0.75rem",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
}));

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjectsInformation());
  }, []);

  return (
    <Box sx={{ padding: "1.25rem 0" }}>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <ProjectsTableContainer>
        <Table aria-label="projects table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Tech Stack</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.role}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.company}</TableCell>
                <TableCell>{calculateDuration(project.startDate, project.endDate)}</TableCell>
                <TableCell>{project.techStack}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ProjectsTableContainer>
    </Box>
  );
};

export default Projects;

'use client';

import React, { useEffect, useState } from "react";
import { Avatar, Typography, Box, Paper, IconButton, Stack, useTheme } from "@mui/material";
import { Contact } from "../models/Contact";
import { getContactInfodmation } from "../services/portfolio.service";
import { getGlassSurfaceStyles } from "../styles/glass.styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Header: React.FC = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setContact(getContactInfodmation());
  }, []);

  if (!contact) return <Typography>Loading...</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1.5rem",
        textAlign: "center",
        width: "100%",
        borderRadius: "0.75rem",
        ...getGlassSurfaceStyles(theme),
      }}
    >
      <Avatar
        alt={contact.name}
        src={contact.avatar}
        sx={{ width: "7rem", height: "7rem", margin: "auto" }}
      />
      <Typography variant="h5" gutterBottom>
        {contact.name}
      </Typography>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        {contact.title}
      </Typography>

      <Typography variant="body2" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
        <LocationOnIcon fontSize="small" /> {contact.location}
      </Typography>

      {/* Icons for Contact Links */}
      <Stack direction="row" sx={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <IconButton component="a" href={`tel:${contact.phone}`} color="primary">
          <PhoneIcon />
        </IconButton>
        <IconButton component="a" href={`mailto:${contact.email}`} color="primary">
          <EmailIcon />
        </IconButton>
        <IconButton component="a" href={contact.github} target="_blank" rel="noopener noreferrer" color="primary">
          <GitHubIcon />
        </IconButton>
        <IconButton component="a" href={contact.linkedin} target="_blank" rel="noopener noreferrer" color="primary">
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default Header;

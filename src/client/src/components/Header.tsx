'use client';

import React, { useEffect, useState } from "react";
import { Avatar, Typography, Paper, IconButton, Stack, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Contact } from "../models/Contact";
import { getContactInfodmation } from "../services/portfolio.service";
import { getGlassSurfaceStyles } from "../styles/glass.styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DownloadIcon from "@mui/icons-material/Download";

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

      <Button
        component="a"
        href="/api/cv"
        download="andrei-zubrytski-cv.pdf"
        variant="outlined"
        startIcon={<DownloadIcon />}
        sx={{
          mt: 3,
          minWidth: 240,
          px: 3.5,
          py: 1.3,
          borderRadius: 999,
          textTransform: "none",
          fontSize: "0.98rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: theme.palette.text.primary,
          background: "transparent",
          backgroundImage: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(12px) saturate(130%)",
          WebkitBackdropFilter: "blur(12px) saturate(130%)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? alpha(theme.palette.common.white, 0.12)
              : alpha(theme.palette.primary.main, 0.16)
          }`,
          transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease",
          '&&': {
            background: "transparent",
            backgroundImage: "none",
            boxShadow: "none",
          },
          "&:hover": {
            transform: "none",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "transparent"
                : "transparent",
            borderColor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.primary.main, 0.34)
                : alpha(theme.palette.primary.main, 0.28),
          },
          '&&:hover': {
            background: "transparent",
            backgroundImage: "none",
            boxShadow: "none",
            transform: "none",
          },
          "& .MuiButton-startIcon": {
            mr: 1.25,
            "& svg": {
              fontSize: "1.1rem",
            },
          },
        }}
      >
        Download CV
      </Button>
    </Paper>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Avatar, Typography, Box, Paper, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Contact } from "../models/Contact";
import { getContactInfodmation } from "../services/portfolio.service";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: "1.5rem",
  textAlign: "center",
  width: "100%",
  borderRadius: "0.75rem",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: "7rem",
  height: "7rem",
  margin: "auto",
}));

const IconContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
}));

const Header: React.FC = () => {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    setContact(getContactInfodmation());
  }, []);

  if (!contact) return <Typography>Loading...</Typography>;

  return (
    <HeaderPaper elevation={3}>
      <AvatarStyled alt={contact.name} src={contact.avatar} />
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
      <IconContainer direction="row">
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
      </IconContainer>
    </HeaderPaper>
  );
};

export default Header;

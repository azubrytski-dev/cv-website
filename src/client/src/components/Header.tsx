import React from 'react';
import { Avatar, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import ProfilePhoto from '../shared/img/profile-photo.jpeg'; // Replace with the actual path to your profile photo
import { AnimatedNeonTitle } from '../controls/Title';

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  textAlign: 'left',
  width: '100%',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(18),
  height: theme.spacing(18),
  margin: 'auto',
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& a': {
    textDecoration: 'none',
    color: theme.palette.primary,
  },
}));

const Header: React.FC = () => {
  return (
    <HeaderPaper elevation={3}>
      <AvatarStyled
        alt="Andrei Zubrytski"
        src={ProfilePhoto} />
      <Typography variant="h5" gutterBottom>
        Andrei Zubrytski
      </Typography>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Senior .NET Engineer
      </Typography>
      <ContactInfo>
        <Typography variant="body1">
          <strong>Birthdate:</strong> 30.11.1991
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> Tbilisi, Georgia
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> <a href="tel:+995591141320">+995 591 141 320</a>
        </Typography>
        <Typography variant="body1">
          <strong>Skype:</strong> live:azubrytski.dev
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> <a href="mailto:azubrytski.dev@gmail.com">azubrytski.dev@gmail.com</a>
        </Typography>
        <Typography variant="body1">
          <strong>GitHub:</strong> <a href="https://github.com/azubrytski-dev" target="_blank" rel="noopener noreferrer">azubrytski-dev</a>
        </Typography>
      </ContactInfo>
    </HeaderPaper>
  );
}

export default Header;

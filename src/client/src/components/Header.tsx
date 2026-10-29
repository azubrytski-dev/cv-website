'use client';

import { Box, Button, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import heroPortrait from '../shared/img/hero-portrait.webp';
import { cvData } from '../data/cv';
import { getContactInfodmation } from '../services/portfolio.service';

export default function Header() {
  const contact = getContactInfodmation();

  return (
    <Box component="section" id="overview" aria-labelledby="introduction-title" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) 200px', md: 'minmax(0, 1fr) minmax(260px, 34%)' }, gap: { xs: 2, sm: 4 }, alignItems: 'center' }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography id="introduction-title" component="h1" variant="h1">{contact.name}</Typography>
        <Typography sx={{ mt: 1.25, fontSize: { xs: '1.125rem', md: '1.375rem' }, fontWeight: 500, color: 'text.secondary' }}>
          {contact.title}
        </Typography>
        <Typography sx={{ mt: 2.5, maxWidth: '42rem' }}>
          {cvData.summary}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 2 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: '1rem' }} /> {contact.location}
        </Typography>
        <Box sx={{ display: 'flex', gap: 'var(--cv-control-gap)', flexWrap: 'wrap', mt: 3 }}>
          <Button component="a" href="/api/cv" download="andrei-zubrytski-cv.pdf" variant="contained" startIcon={<DownloadOutlinedIcon />}>
            Download CV
          </Button>
          <Button component="a" href={`mailto:${contact.email}`} variant="outlined" startIcon={<MailOutlineIcon />}>
            Email me
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
          Outside work: practical AI tooling, travel, and music.
        </Typography>
      </Box>
      <Box
        component="img"
        alt={`${contact.name}, waist-up illustrated portrait`}
        src={heroPortrait.src}
        width={heroPortrait.width}
        height={heroPortrait.height}
        sx={{ display: 'block', width: { xs: 136, sm: '100%' }, maxWidth: '100%', height: 'auto', justifySelf: { xs: 'end', sm: 'center' }, alignSelf: 'end' }}
      />
    </Box>
  );
}

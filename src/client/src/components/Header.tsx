'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import heroPortrait from '../shared/img/hero-photo.jpg';
import { cvData } from '../data/cv';
import { getContactInfodmation } from '../services/portfolio.service';

export default function Header() {
  const contact = getContactInfodmation();

  return (
    <Box component="section" id="overview" aria-labelledby="introduction-title" sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'minmax(0, 1fr) 200px', md: 'minmax(0, 1fr) minmax(260px, 34%)' }, gap: 4, alignItems: 'center' }}>
      <Box
        sx={{
          gridColumn: { xs: 1, sm: 2 },
          gridRow: 1,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100%',
          aspectRatio: { xs: '4 / 5', sm: 'auto' },
          alignSelf: { xs: 'center', sm: 'stretch' },
          minHeight: 0,
          justifySelf: 'center',
          borderRadius: { xs: '16px', md: '20px' },
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          '& img': {
            objectFit: 'cover',
            objectPosition: '54% 34%',
            // Keep the original photo intact; frame the head and shoulders in the card.
            transform: { xs: 'scale(2.4)', sm: 'scale(2)' },
            transformOrigin: '54% 34%',
          },
        }}
      >
        <Image
          src={heroPortrait}
          alt={`${contact.name} wearing a white shirt and round sunglasses`}
          fill
          priority
          sizes="(max-width: 599px) calc(240vw - 96px), (max-width: 899px) 480px, 850px"
        />
      </Box>
      <Box sx={{ minWidth: 0, gridColumn: 1, gridRow: { xs: 2, sm: 1 } }}>
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
    </Box>
  );
}

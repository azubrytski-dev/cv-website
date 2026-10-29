'use client';

import { Box, Link, Typography } from '@mui/material';
import { getEducationInformation } from '../services/portfolio.service';

const education = [...getEducationInformation()].sort((a, b) => b.graduatedYear - a.graduatedYear);

export default function Education() {
  return (
    <Box component="section" id="education" aria-labelledby="education-title">
      <Typography id="education-title" variant="h2" component="h2">Education</Typography>
      <Box sx={{ mt: 3 }}>
        {education.map(item => (
          <Box key={`${item.degree}-${item.graduatedYear}`} component="article" sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 2, py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box>
              <Typography component="h3" sx={{ fontWeight: 600 }}>{item.degree}</Typography>
              <Link href={item.website} variant="body2" color="text.secondary" target="_blank" rel="noopener noreferrer" underline="hover">{item.institution}</Link>
              <Typography variant="body2" color="text.secondary">{item.specialization}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>{item.graduatedYear}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

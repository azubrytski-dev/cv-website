'use client';

import { Box, Typography } from '@mui/material';
import { cvData } from '../data/cv';

export default function Skills() {
  return (
    <Box component="section" id="skills" aria-labelledby="skills-title">
      <Typography id="skills-title" variant="h2" component="h2">Skills</Typography>
      <Box component="dl" sx={{ m: 0, mt: 3 }}>
        {cvData.skills.map(group => (
          <Box key={group.title} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '12rem 1fr' }, gap: { xs: 0.75, sm: 3 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box component="dt">
              <Typography component="span" sx={{ fontWeight: 600 }}>{group.title}</Typography>
              {group.note && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{group.note}</Typography>}
            </Box>
            <Typography component="dd" sx={{ m: 0, color: 'text.secondary' }}>
              {group.items.join(' · ')}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

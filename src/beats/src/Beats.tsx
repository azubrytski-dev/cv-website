'use client';

import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { getGlassSurfaceStyles } from '@cv/design-system';

export default function Beats() {
  const theme = useTheme();

  return (
    <Stack spacing={4} sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 }, textAlign: 'left' }}>
      <Typography variant="h3" component="h1">My Beats</Typography>
      <Paper elevation={0} sx={{ p: 3, ...getGlassSurfaceStyles(theme) }}>
        <Typography variant="h5" component="h2" gutterBottom>Featured Tracks</Typography>
        <Typography color="text.secondary">
          Your beat collection will appear here. Start creating and uploading your tracks!
        </Typography>
      </Paper>
    </Stack>
  );
}

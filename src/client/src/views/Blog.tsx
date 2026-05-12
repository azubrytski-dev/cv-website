'use client';

import React from 'react';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

import type { BlogPost } from '../models/Post';
import { getGlassSurfaceStyles } from '../styles/glass.styles';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const glassSurface = getGlassSurfaceStyles(theme, isDark ? '0 255 153' : '25 118 210');
  const pageBackground = isDark
    ? 'radial-gradient(circle at top left, rgba(0, 255, 153, 0.10), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 26%)'
    : 'radial-gradient(circle at top left, rgba(25,118,210,0.10), transparent 32%), linear-gradient(180deg, rgba(15,23,42,0.03), transparent 26%)';

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        background: pageBackground,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 850,
          letterSpacing: '-0.05em',
          lineHeight: 1.05,
          textAlign: 'left',
        }}
      >
        Blog
      </Typography>

      <Stack spacing={1.5}>
        {posts.map((post) => (
          <Paper
            key={post.slug}
            component={Link}
            href={`/blog/${post.slug}`}
            elevation={0}
            sx={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 4,
              p: { xs: 2, md: 2.5 },
              opacity: post.status === 'planned' ? 0.9 : 1,
              filter: post.status === 'planned' ? 'blur(0.8px)' : 'none',
              transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease, filter 180ms ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              ...glassSurface,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  textAlign: 'left',
                  lineHeight: 1.2,
                }}
              >
                {post.topic}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  flexShrink: 0,
                  ml: 2,
                }}
              >
                {post.status}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Blog;


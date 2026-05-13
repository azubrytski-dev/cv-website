'use client';

import React from 'react';
import { Paper, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

import type { BlogPost } from '../models/Post';

interface BlogProps {
  posts: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const borderColor = isDark ? 'rgba(0, 255, 153, 0.16)' : 'rgba(25, 118, 210, 0.16)';

  return (
    <Stack
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        backgroundColor: 'transparent',
        background: 'transparent',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4.5,
          fontWeight: 850,
          letterSpacing: '-0.05em',
          lineHeight: 1.05,
          textAlign: 'left',
        }}
        >
        Blog
      </Typography>

      <Stack spacing={2} sx={{ backgroundColor: 'transparent' }}>
        {posts.map((post) => (
          <Paper
            key={post.slug}
            component={post.status === 'published' ? Link : 'div'}
            href={post.status === 'published' ? `/blog/${post.slug}` : undefined}
            aria-disabled={post.status === 'planned' ? true : undefined}
            elevation={0}
            sx={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 4,
              p: { xs: 2, md: 2.5 },
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              border: `1px solid ${borderColor}`,
              opacity: post.status === 'planned' ? 0.9 : 1,
              filter: post.status === 'planned' ? 'blur(0.8px)' : 'none',
              cursor: post.status === 'planned' ? 'default' : 'pointer',
              pointerEvents: post.status === 'planned' ? 'none' : 'auto',
              transition: 'border-color 180ms ease, opacity 180ms ease, filter 180ms ease',
              '&:hover': {
                borderColor: isDark ? 'rgba(0, 255, 153, 0.32)' : 'rgba(25, 118, 210, 0.28)',
              },
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
    </Stack>
  );
};

export default Blog;

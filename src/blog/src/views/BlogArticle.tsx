'use client';

import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';

import { renderMarkdown } from '../lib/markdown';
import type { BlogPost } from '../models/Post';
import { getGlassSurfaceStyles } from '@cv/design-system';

interface BlogArticleProps {
  post: BlogPost;
  basePath?: string;
}

function stripLeadingHeading(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);

  if (firstContentIndex === -1) {
    return markdown;
  }

  if (!/^#\s+/.test(lines[firstContentIndex])) {
    return markdown;
  }

  const remainingLines = [...lines];
  remainingLines.splice(firstContentIndex, 1);
  return remainingLines.join('\n').trim();
}

export default function BlogArticle({ post, basePath = "/blog" }: BlogArticleProps) {
  const theme = useTheme();
  const glassSurface = getGlassSurfaceStyles(theme);
  const articleBody = stripLeadingHeading(post.content);

  return (
    <Stack
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        background: 'var(--cv-page-background)',
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

      <Stack spacing={2.75} sx={{ maxWidth: 980, width: '100%', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
        <Stack direction="row" spacing={1.5} sx={{ width: '100%', alignItems: 'center', minWidth: 0 }}>
          <IconButton
            component={Link}
            href={basePath}
            aria-label="Back to blog"
            sx={{
              width: 56,
              height: 56,
              flexShrink: 0,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'var(--cv-glass-border)',
              backgroundColor: 'transparent',
              color: 'primary.main',
              transition: 'background-color 180ms ease, border-color 180ms ease',
              '&:hover': {
                backgroundColor: 'rgb(var(--cv-primary-rgb) / 8%)',
                borderColor: 'rgb(var(--cv-primary-rgb) / 28%)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component="h1"
            sx={{
              margin: 0,
              flex: 1,
              minWidth: 0,
              fontSize: { xs: '1.45rem', md: '2rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              fontWeight: 800,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.topic}
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 2.5, md: 3.75 },
            textAlign: 'left',
            ...glassSurface,
          }}
        >
          <Box
            sx={{
              '& p, & li, & h1, & h2, & h3, & blockquote, & pre': {
                color: 'inherit',
              },
              '& h1:first-of-type': {
                marginTop: 0,
              },
              '& pre, & blockquote': {
                maxWidth: '100%',
              },
            }}
          >
            {renderMarkdown(articleBody)}
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
}

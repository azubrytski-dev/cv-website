'use client';

import React from 'react';
import { Box, Button, Chip, Paper, Stack, Typography, useTheme } from '@mui/material';

import { LeaseOption } from '../../models/Beat';

interface LeaseOptionCardProps {
  lease: LeaseOption;
  selected: boolean;
  onSelect: (lease: LeaseOption) => void;
  onCheckout: (lease: LeaseOption) => void;
  onExclusiveInquiry: (lease: LeaseOption) => void;
  compact?: boolean;
  fullHeight?: boolean;
}

const LeaseOptionCard: React.FC<LeaseOptionCardProps> = ({
  lease,
  selected,
  onSelect,
  onCheckout,
  onExclusiveInquiry,
  compact = false,
  fullHeight = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const borderColor = isDark ? 'rgba(52, 255, 161, 0.16)' : 'rgba(25, 118, 210, 0.16)';
  const activeBorderColor = theme.palette.primary.main;
  const selectedBackground = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.70)';
  const actionLabel = lease.type === 'exclusive' ? 'Contact' : 'Purchase';
  const lightButtonBase = {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(25, 118, 210, 0.42)',
    color: '#111111',
    boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.05), 0 8px 18px rgba(25, 118, 210, 0.08)',
  } as const;

  return (
    <Paper
      elevation={0}
      onClick={() => onSelect(lease)}
      sx={{
        p: compact ? 1.5 : 2.25,
        borderRadius: compact ? 3 : 4,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
        border: `1px solid ${selected ? activeBorderColor : borderColor}`,
        backgroundColor: selected ? selectedBackground : 'transparent',
        backdropFilter: 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
        boxShadow: selected
          ? isDark
            ? '0 8px 24px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 8px 24px rgba(25, 118, 210, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
          : 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: activeBorderColor,
          boxShadow: isDark
            ? '0 16px 34px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 16px 34px rgba(25, 118, 210, 0.10), inset 0 1px 0 rgba(255,255,255,0.56)',
          zIndex: 1,
        },
        display: 'flex',
        flexDirection: 'column',
        height: fullHeight ? '100%' : 'auto',
        minHeight: fullHeight ? '100%' : compact ? 320 : 420,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Stack spacing={compact ? 1 : 1.25} sx={{ flex: 1 }}>
        <Stack direction="row" alignItems="start" justifyContent="space-between" spacing={1}>
          <Box>
            <Typography variant={compact ? 'subtitle1' : 'h6'} sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {lease.name}
            </Typography>
            <Typography
              variant={compact ? 'h5' : 'h4'}
              sx={{ mt: 0.5, fontWeight: 900, letterSpacing: '-0.03em' }}
            >
              {lease.price}
            </Typography>
          </Box>

          {lease.recommended && (
            <Chip
              label="Recommended"
              size="small"
            sx={{
              fontWeight: 700,
                backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(25,118,210,0.10)',
                color: '#05110b',
                height: compact ? 24 : 28,
                backdropFilter: 'blur(6px)',
              }}
            />
          )}
        </Stack>

        <Box sx={{ flex: 1 }}>
          <Typography variant={compact ? 'caption' : 'subtitle2'} sx={{ mb: 0.5, fontWeight: 700 }}>
            Included files
          </Typography>
          <Stack spacing={0.35} sx={{ mb: compact ? 1 : 1.5 }}>
            {lease.includedFiles.map((item) => (
              <Typography key={item} variant={compact ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                • {item}
              </Typography>
            ))}
          </Stack>

          <Typography variant={compact ? 'caption' : 'subtitle2'} sx={{ mb: 0.5, fontWeight: 700 }}>
            Rights
          </Typography>
          <Stack spacing={0.35}>
            {lease.rights.map((right) => (
              <Typography key={right} variant={compact ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                • {right}
              </Typography>
            ))}
          </Stack>

          {lease.limitations.length > 0 && (
            <>
              <Typography variant={compact ? 'caption' : 'subtitle2'} sx={{ mt: compact ? 1 : 1.5, mb: 0.5, fontWeight: 700 }}>
                Limitations
              </Typography>
              <Stack spacing={0.35}>
                {lease.limitations.map((limitation) => (
                  <Typography key={limitation} variant={compact ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                    • {limitation}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </Box>

        <Box sx={{ pt: 0.5, mt: 'auto' }}>
          <Button
            variant={selected ? 'contained' : 'outlined'}
            fullWidth
            onClick={(event) => {
              event.stopPropagation();
              onSelect(lease);

              if (lease.type === 'exclusive') {
                onExclusiveInquiry(lease);
                return;
              }

              onCheckout(lease);
            }}
            sx={{
              textTransform: 'none',
              fontWeight: 800,
              borderRadius: 999,
              py: compact ? 0.8 : 1.1,
              minHeight: compact ? 36 : 44,
              alignSelf: 'stretch',
              backgroundImage: 'none',
              backdropFilter: 'blur(14px) saturate(155%)',
              WebkitBackdropFilter: 'blur(14px) saturate(155%)',
              ...(isDark
                ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'common.white',
                    borderColor: 'rgba(13, 255, 158, 0.28)',
                    boxShadow: '0 0 0 1px rgba(13, 255, 158, 0.10), 0 8px 18px rgba(0, 0, 0, 0.10)',
                  }
                : lightButtonBase),
              borderWidth: 1,
              borderStyle: 'solid',
              '&:hover': {
                backgroundImage: 'none',
                ...(isDark
                  ? {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: 'rgba(13, 255, 158, 0.42)',
                      boxShadow: '0 0 0 1px rgba(13, 255, 158, 0.12), 0 10px 20px rgba(0, 0, 0, 0.12)',
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.26)',
                      borderColor: 'rgba(25, 118, 210, 0.58)',
                      boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.08), 0 10px 20px rgba(25, 118, 210, 0.10)',
                    }),
              },
            }}
          >
            {compact ? actionLabel : lease.ctaLabel}
          </Button>
        </Box>
      </Stack>
      </Box>
    </Paper>
  );
};

export default LeaseOptionCard;

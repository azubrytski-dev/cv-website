'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

import { BeatTrack } from '../../models/Beat';

interface BeatPlayerFooterProps {
  track: BeatTrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenLicenses: () => void;
}

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

const BeatPlayerFooter: React.FC<BeatPlayerFooterProps> = ({
  track,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onPrevious,
  onNext,
  onOpenLicenses,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent = isDark ? 'rgba(13, 255, 158, 0.92)' : theme.palette.primary.main;
  const accentHover = isDark ? 'rgba(13, 255, 158, 1)' : theme.palette.primary.dark;
  const accentText = '#05110b';
  const lightButtonBase = {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    border: '1px solid rgba(25, 118, 210, 0.42)',
    color: '#111111',
    boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.05), 0 8px 18px rgba(25, 118, 210, 0.08)',
  } as const;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        width: '100%',
        m: 0,
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        px: { xs: 1, md: 2 },
        py: { xs: 0.65, md: 1.15 },
        borderTop: `1px solid ${isDark ? 'rgba(52,255,161,0.10)' : 'rgba(25,118,210,0.12)'}`,
        background:
          isDark
            ? 'linear-gradient(180deg, rgba(8, 16, 12, 0.66), rgba(5, 10, 8, 0.78))'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(248, 250, 252, 0.82))',
        backdropFilter: 'blur(8px) saturate(145%)',
        WebkitBackdropFilter: 'blur(8px) saturate(145%)',
        boxShadow:
          isDark
            ? '0 16px 34px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 46px rgba(25, 118, 210, 0.08), inset 0 1px 0 rgba(255,255,255,0.55)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            isDark
              ? 'linear-gradient(135deg, rgba(13,255,158,0.05), transparent 35%, rgba(255,255,255,0.02) 70%)'
              : 'linear-gradient(135deg, rgba(25,118,210,0.08), transparent 35%, rgba(255,255,255,0.24) 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', maxWidth: 1360, mx: 'auto', zIndex: 1 }}>
        <Stack spacing={0.45}>
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.08,
                  maxWidth: { xs: '100%', sm: 'none' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 2, sm: 1 },
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {track.artist} - {track.title}
              </Typography>
            </Box>

            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', flexShrink: 0 }}>
              <Chip label={`${track.bpm} BPM`} size="small" sx={{ height: 22, '& .MuiChip-label': { px: 0.875 } }} />
              <Chip label={track.key} size="small" sx={{ height: 22, '& .MuiChip-label': { px: 0.875 } }} />
            </Stack>
          </Stack>

          <Box>
            <Box
              sx={{
                height: { xs: 5, sm: 8 },
                borderRadius: 999,
                backgroundColor: 'rgba(127, 127, 127, 0.18)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: (currentTheme) =>
                    `linear-gradient(90deg, ${currentTheme.palette.primary.main}, ${currentTheme.palette.primary.light})`,
                  transition: 'width 120ms linear',
                }}
              />
            </Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.25, color: 'text.secondary' }}>
                <Typography variant="caption">{formatTime(currentTime)}</Typography>
                <Typography variant="caption">{formatTime(duration)}</Typography>
              </Stack>
            </Box>

          <Stack
            direction="row"
            spacing={{ xs: 0.75, sm: 0.9 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={{ xs: 0.75, sm: 0.9 }} alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
              <IconButton
                onClick={onPrevious}
                aria-label="Previous track"
                sx={(theme) => ({
                  width: { xs: 34, sm: 40 },
                  height: { xs: 34, sm: 40 },
                  borderRadius: '50%',
                  ...(isDark
                    ? {
                        background: `linear-gradient(180deg, ${accent}, rgba(0, 222, 121, 0.86))`,
                        color: accentText,
                        boxShadow:
                          '0 0 0 1px rgba(13, 255, 158, 0.18), 0 0 12px rgba(13, 255, 158, 0.22)',
                      }
                    : {
                        ...lightButtonBase,
                        backdropFilter: 'blur(14px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(14px) saturate(150%)',
                      }),
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                  '&:hover': {
                    ...(isDark
                      ? {
                          background: `linear-gradient(180deg, ${accentHover}, rgba(0, 222, 121, 0.92))`,
                          boxShadow:
                            '0 0 0 1px rgba(13, 255, 158, 0.24), 0 0 16px rgba(13, 255, 158, 0.26)',
                        }
                      : {
                          backgroundColor: 'rgba(255, 255, 255, 0.26)',
                          borderColor: 'rgba(25, 118, 210, 0.58)',
                          boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.08), 0 10px 20px rgba(25, 118, 210, 0.10)',
                        }),
                    transform: 'translateY(-1px) scale(1.01)',
                  },
                })}
              >
                <SkipPreviousRoundedIcon />
              </IconButton>
              <Button
                onClick={onPlayPause}
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
                variant={isDark ? 'contained' : 'outlined'}
                sx={(theme) => ({
                  minWidth: { xs: 74, sm: 92 },
                  height: { xs: 34, sm: 40 },
                  borderRadius: 999,
                  px: { xs: 1, sm: 1.5 },
                  ...(isDark
                    ? {
                        background: `linear-gradient(90deg, ${accent}, rgba(0, 255, 124, 0.88))`,
                        color: accentText,
                        boxShadow:
                          '0 0 0 1px rgba(13, 255, 158, 0.20), 0 0 14px rgba(13, 255, 158, 0.24)',
                      }
                    : {
                        ...lightButtonBase,
                        backdropFilter: 'blur(14px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(14px) saturate(150%)',
                      }),
                  borderWidth: 1,
                  borderStyle: 'solid',
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                  '&:hover': {
                    ...(isDark
                      ? {
                          background: `linear-gradient(90deg, ${accentHover}, rgba(0, 255, 138, 0.92))`,
                          boxShadow:
                            '0 0 0 1px rgba(13, 255, 158, 0.24), 0 0 16px rgba(13, 255, 158, 0.28)',
                        }
                      : {
                          backgroundColor: 'rgba(255, 255, 255, 0.26)',
                          borderColor: 'rgba(25, 118, 210, 0.58)',
                          boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.08), 0 10px 20px rgba(25, 118, 210, 0.10)',
                        }),
                    transform: 'translateY(-1px) scale(1.005)',
                  },
                })}
              >
                {isPlaying ? (
                  <PauseRoundedIcon sx={{ fontSize: 22 }} />
                ) : (
                  <PlayArrowRoundedIcon sx={{ fontSize: 24, ml: 0.15 }} />
                )}
              </Button>
              <IconButton
                onClick={onNext}
                aria-label="Next track"
                sx={(theme) => ({
                  width: { xs: 34, sm: 40 },
                  height: { xs: 34, sm: 40 },
                  borderRadius: '50%',
                  ...(isDark
                    ? {
                        background: `linear-gradient(180deg, ${accent}, rgba(0, 222, 121, 0.86))`,
                        color: accentText,
                        boxShadow:
                          '0 0 0 1px rgba(13, 255, 158, 0.18), 0 0 12px rgba(13, 255, 158, 0.22)',
                      }
                    : {
                        ...lightButtonBase,
                        backdropFilter: 'blur(14px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(14px) saturate(150%)',
                      }),
                  transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
                  '&:hover': {
                    ...(isDark
                      ? {
                          background: `linear-gradient(180deg, ${accentHover}, rgba(0, 222, 121, 0.92))`,
                          boxShadow:
                            '0 0 0 1px rgba(13, 255, 158, 0.24), 0 0 16px rgba(13, 255, 158, 0.26)',
                        }
                      : {
                          backgroundColor: 'rgba(255, 255, 255, 0.26)',
                          borderColor: 'rgba(25, 118, 210, 0.58)',
                          boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.08), 0 10px 20px rgba(25, 118, 210, 0.10)',
                        }),
                    transform: 'translateY(-1px) scale(1.01)',
                  },
                })}
              >
                <SkipNextRoundedIcon />
              </IconButton>
            </Stack>

              <Button
                onClick={onOpenLicenses}
                variant={isDark ? 'contained' : 'outlined'}
                sx={(theme) => ({
                minWidth: { xs: 86, sm: 118 },
                height: { xs: 34, sm: 40 },
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 800,
                fontSize: { xs: '0.78rem', sm: '0.86rem' },
                  ...(isDark
                    ? {
                        background: `linear-gradient(90deg, ${accent}, rgba(0, 255, 124, 0.88))`,
                        color: accentText,
                        boxShadow:
                          '0 0 0 1px rgba(13, 255, 158, 0.20), 0 0 14px rgba(13, 255, 158, 0.24)',
                      }
                    : {
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        color: '#111111',
                        borderColor: 'rgba(25, 118, 210, 0.42)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.05), 0 8px 18px rgba(25, 118, 210, 0.08)',
                        backdropFilter: 'blur(14px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(14px) saturate(150%)',
                      }),
                transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease, background-color 160ms ease',
                '&:hover': {
                  ...(isDark
                    ? {
                        background: `linear-gradient(90deg, ${accentHover}, rgba(0, 255, 138, 0.92))`,
                        boxShadow:
                          '0 0 0 1px rgba(13, 255, 158, 0.24), 0 0 16px rgba(13, 255, 158, 0.28)',
                      }
                    : {
                        backgroundColor: 'rgba(255, 255, 255, 0.26)',
                        borderColor: 'rgba(25, 118, 210, 0.58)',
                        boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.08), 0 10px 20px rgba(25, 118, 210, 0.10)',
                      }),
                  transform: 'translateY(-1px) scale(1.005)',
                },
              })}
            >
              Licenses
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BeatPlayerFooter;

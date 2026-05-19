'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import BeatCartDialog from '../components/beats/BeatCartDialog';
import BeatInquiryDialog from '../components/beats/BeatInquiryDialog';
import BeatLicenseDialog from '../components/beats/BeatLicenseDialog';
import BeatPlayerFooter from '../components/beats/BeatPlayerFooter';
import { BeatTrack, LeaseOption, LeaseType } from '../models/Beat';
import { getBeatsInformation, getLeaseOptionsInformation } from '../services/beats.service';

type BeatTrackWithPreview = BeatTrack & { previewUrl: string };

interface CheckoutIntent {
  beatId: string;
  beatTitle: string;
  leaseId: LeaseType;
  leaseName: string;
  leasePrice: string;
  leaseRights: string[];
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

function writeString(view: DataView, offset: number, value: string): number {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }

  return offset + value.length;
}

function createPreviewUrl(frequency: number, durationSeconds: number): string {
  const sampleRate = 22050;
  const totalSamples = Math.max(1, Math.floor(sampleRate * durationSeconds));
  const bytesPerSample = 2;
  const buffer = new ArrayBuffer(44 + totalSamples * bytesPerSample);
  const view = new DataView(buffer);

  let offset = 0;
  offset = writeString(view, offset, 'RIFF');
  view.setUint32(offset, 36 + totalSamples * bytesPerSample, true);
  offset += 4;
  offset = writeString(view, offset, 'WAVE');
  offset = writeString(view, offset, 'fmt ');
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint32(offset, sampleRate, true);
  offset += 4;
  view.setUint32(offset, sampleRate * bytesPerSample, true);
  offset += 4;
  view.setUint16(offset, bytesPerSample, true);
  offset += 2;
  view.setUint16(offset, 16, true);
  offset += 2;
  offset = writeString(view, offset, 'data');
  view.setUint32(offset, totalSamples * bytesPerSample, true);
  offset += 4;

  for (let sampleIndex = 0; sampleIndex < totalSamples; sampleIndex += 1) {
    const time = sampleIndex / sampleRate;
    const pulsePosition = time % 0.5;
    const pulse = Math.exp(-pulsePosition * 10);
    const rhythm = Math.sin(2 * Math.PI * frequency * time) * pulse;
    const overtone = Math.sin(2 * Math.PI * frequency * 2 * time + Math.PI / 4) * pulse * 0.25;
    const sample = Math.max(-1, Math.min(1, (rhythm + overtone) * 0.45));
    view.setInt16(offset, sample * 0x7fff, true);
    offset += bytesPerSample;
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

const BeatHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={{ xs: 0.75, md: 3 }}
    alignItems={{ xs: 'flex-start', md: 'flex-start' }}
    justifyContent="space-between"
    sx={{
      textAlign: 'left',
      p: { xs: 0, md: 0.5 },
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 900,
        letterSpacing: '-0.05em',
        lineHeight: 0.95,
        fontSize: { xs: 'clamp(2.3rem, 9vw, 3.4rem)', md: 'clamp(2.8rem, 4vw, 4rem)' },
        color: (theme) => (theme.palette.mode === 'dark' ? '#15f79a' : '#111111'),
        textShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 0 18px rgba(21, 247, 154, 0.16)'
            : 'none',
        flex: { xs: 'unset', md: '0 1 42%' },
        maxWidth: { xs: '100%', md: 420 },
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: 'text.secondary',
        maxWidth: { xs: '100%', md: 620 },
        fontSize: { xs: '0.98rem', md: '1.02rem' },
        lineHeight: 1.5,
        flex: { xs: 'unset', md: '0 1 54%' },
        pt: { xs: 0, md: 0.75 },
      }}
    >
      {subtitle}
    </Typography>
  </Stack>
);

const TrackList: React.FC<{
  tracks: BeatTrackWithPreview[];
  activeTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
  onGenreSelect: (genre: string) => void;
}> = ({ tracks, activeTrackId, onSelectTrack, onGenreSelect }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const selectedBackground = isDark ? 'rgba(0, 255, 153, 0.04)' : 'rgba(25, 118, 210, 0.05)';

  return (
    <Stack spacing={1.25}>
      <Stack spacing={1}>
        {tracks.map((track) => {
          const isActive = track.id === activeTrackId;

          return (
            <Paper
              key={track.id}
              elevation={0}
              onClick={() => onSelectTrack(track.id)}
              sx={{
                p: 1.25,
                borderRadius: 2.5,
                cursor: 'pointer',
                textAlign: 'left',
                border: (theme) =>
                  `1px solid ${isActive ? theme.palette.primary.main : 'rgba(127, 127, 127, 0.18)'}`,
                background: isActive ? selectedBackground : 'transparent',
                transition: 'transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  borderColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={{ xs: 1.25, sm: 2 }} alignItems={{ sm: 'center' }}>
                <Box
                  sx={{
                    width: { xs: 88, sm: 72 },
                    height: { xs: 88, sm: 72 },
                    borderRadius: 2.5,
                    background: track.coverGradient,
                    flexShrink: 0,
                    boxShadow: '0 8px 18px rgba(0,0,0,0.14)',
                  }}
                />

                <Stack spacing={0.5} sx={{ flex: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                        {track.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.25, display: 'block' }}>
                        {track.artist}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
                      {formatTime(track.durationSeconds)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', pt: 0.25 }}>
                    <Chip
                      label={`#${track.genre}`}
                      size="small"
                      variant="outlined"
                      onClick={(event) => {
                        event.stopPropagation();
                        onGenreSelect(track.genre);
                      }}
                      sx={{
                        height: 24,
                        cursor: 'pointer',
                        fontWeight: 700,
                        borderColor: 'rgba(255,255,255,0.18)',
                        color: 'text.primary',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(10px) saturate(145%)',
                        WebkitBackdropFilter: 'blur(10px) saturate(145%)',
                        '& .MuiChip-label': {
                          px: 0.9,
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
};

const TrackMeta: React.FC<{ track: BeatTrackWithPreview }> = ({ track }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 4,
      textAlign: 'left',
      background: track.coverGradient,
      color: 'common.white',
      boxShadow: '0 18px 42px rgba(0,0,0,0.22)',
    }}
  >
    <Stack spacing={1}>
      <Typography variant="overline" sx={{ letterSpacing: '0.18em', opacity: 0.78 }}>
        Now Playing
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        {track.title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.86, lineHeight: 1.6 }}>
        {track.description}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', pt: 0.5 }}>
        <Chip
          label={`${track.bpm} BPM`}
          size="small"
          sx={{ backgroundColor: 'rgba(255,255,255,0.14)', color: 'common.white' }}
        />
        <Chip
          label={track.key}
          size="small"
          sx={{ backgroundColor: 'rgba(255,255,255,0.14)', color: 'common.white' }}
        />
        <Chip
          label={track.genre}
          size="small"
          sx={{ backgroundColor: 'rgba(255,255,255,0.14)', color: 'common.white' }}
        />
      </Stack>
    </Stack>
  </Paper>
);

const Beats: React.FC = () => {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  const [tracks, setTracks] = useState<BeatTrackWithPreview[]>([]);
  const [leaseOptions, setLeaseOptions] = useState<LeaseOption[]>([]);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [activeLeaseId, setActiveLeaseId] = useState<LeaseType | null>('premium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isLicenseDialogOpen, setIsLicenseDialogOpen] = useState(false);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [checkoutIntent, setCheckoutIntent] = useState<CheckoutIntent | null>(null);

  useEffect(() => {
    const baseTracks = getBeatsInformation();
    const previews = baseTracks.map((track) => {
      const previewUrl = createPreviewUrl(track.previewFrequency, track.durationSeconds);
      objectUrlsRef.current.push(previewUrl);
      return {
        ...track,
        previewUrl,
      };
    });

    setTracks(previews);
    setLeaseOptions(getLeaseOptionsInformation());
    setActiveTrackIndex(0);

    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  const activeTrack = tracks[activeTrackIndex];
  const selectedLease = leaseOptions.find((lease) => lease.id === activeLeaseId) ?? null;
  const genreOptions = Array.from(new Set(tracks.map((track) => track.genre)));
  const filteredTracks = tracks.filter((track) => {
    const query = filterText.trim().toLowerCase();
    const matchesGenre = !selectedGenre || track.genre === selectedGenre;

    if (!query) {
      return matchesGenre;
    }

    return (
      matchesGenre &&
      (track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query))
    );
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) {
      return;
    }

    audio.pause();
    audio.src = activeTrack.previewUrl;
    audio.load();
    setCurrentTime(0);
    setDuration(activeTrack.durationSeconds);

    if (isPlaying) {
      void audio.play();
    }
  }, [activeTrack, isPlaying]);

  const handleSelectTrack = (trackId: string) => {
    const nextIndex = tracks.findIndex((track) => track.id === trackId);
    if (nextIndex < 0) {
      return;
    }

    setActiveTrackIndex(nextIndex);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre((current) => (current === genre ? null : genre));
  };

  const handleGenreDropdownChange = (event: SelectChangeEvent) => {
    const nextGenre = event.target.value;
    setSelectedGenre(nextGenre === 'all' ? null : nextGenre);
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !activeTrack) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    if (!tracks.length) {
      return;
    }

    setActiveTrackIndex((current) => (current - 1 + tracks.length) % tracks.length);
  };

  const handleNext = () => {
    if (!tracks.length) {
      return;
    }

    setActiveTrackIndex((current) => (current + 1) % tracks.length);
  };

  const handleLeaseSelect = (lease: LeaseOption) => {
    setActiveLeaseId(lease.id);
  };

  const handleCheckout = (lease: LeaseOption) => {
    if (!activeTrack) {
      return;
    }

    if (lease.type === 'exclusive') {
      setIsInquiryDialogOpen(true);
      setIsLicenseDialogOpen(false);
      return;
    }

    setCheckoutIntent({
      beatId: activeTrack.id,
      beatTitle: activeTrack.title,
      leaseId: lease.id,
      leaseName: lease.name,
      leasePrice: lease.price,
      leaseRights: lease.rights,
    });
    setIsCartDialogOpen(true);
    setIsLicenseDialogOpen(false);
  };

  const handleExclusiveInquiry = (_lease: LeaseOption) => {
    setIsInquiryDialogOpen(true);
    setIsLicenseDialogOpen(false);
  };

  const handleOpenLicenses = () => {
    setIsLicenseDialogOpen(true);
  };

  const handleCloseLicenses = () => {
    setIsLicenseDialogOpen(false);
  };

  const handleCloseInquiry = () => {
    setIsInquiryDialogOpen(false);
  };

  const handleCloseCart = () => {
    setIsCartDialogOpen(false);
  };

  if (!tracks.length) {
    return (
      <Box sx={{ py: 6 }}>
        <Typography variant="body1">Loading beats...</Typography>
      </Box>
    );
  }

  return (
    <Stack
      spacing={4}
      sx={{
        textAlign: 'left',
        px: { xs: 0, md: 1 },
        pb: { xs: 'calc(24rem + env(safe-area-inset-bottom, 0px))', md: 'calc(20rem + env(safe-area-inset-bottom, 0px))' },
      }}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        style={{ display: 'none' }}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (!audio) {
            return;
          }

          setCurrentTime(audio.currentTime);
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration);
          }
        }}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (!audio) {
            return;
          }

          setDuration(audio.duration || activeTrack.durationSeconds);
          setCurrentTime(audio.currentTime || 0);
        }}
        onPlay={() => setIsPlaying(true)}
        onEnded={handleNext}
      />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.75 },
          borderRadius: { xs: 3, md: 4 },
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(52,255,161,0.14)' : 'rgba(25,118,210,0.12)'}`,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(12, 28, 20, 0.78), rgba(8, 16, 12, 0.66))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.90), rgba(248, 250, 252, 0.95))',
          backdropFilter: 'blur(22px) saturate(155%)',
          WebkitBackdropFilter: 'blur(22px) saturate(155%)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 18px 42px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.04)'
              : '0 18px 38px rgba(25, 118, 210, 0.06), inset 0 1px 0 rgba(255,255,255,0.72)',
        }}
      >
        <BeatHeader
          title="8ZEE MUSIC"
          subtitle="Beatmaker since 2010, crafting records across genres and experimenting with sound design to create tracks that feel alive, cinematic, and ready for artists to make their own."
        />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, md: 2 },
          borderRadius: 3,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(52,255,161,0.10)' : 'rgba(127,127,127,0.16)'}`,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(12, 28, 20, 0.68), rgba(8, 16, 12, 0.56))'
              : 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(18px) saturate(150%)',
          WebkitBackdropFilter: 'blur(18px) saturate(150%)',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          This beats page is a prototype for now. Full drops are coming soon. Some of my beats are already on{' '}
          <Box
            component="a"
            href="https://soundcloud.com/azee_music"
            target="_blank"
            rel="noreferrer"
            sx={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none' }}
          >
            SoundCloud
          </Box>
          .
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(52,255,161,0.12)' : 'rgba(25,118,210,0.12)'}`,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(12, 28, 20, 0.54), rgba(8, 16, 12, 0.40))'
              : 'transparent',
          backdropFilter: theme.palette.mode === 'dark' ? 'blur(18px) saturate(150%)' : 'none',
          WebkitBackdropFilter: theme.palette.mode === 'dark' ? 'blur(18px) saturate(150%)' : 'none',
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1.5}>
            <FormControl size="small" fullWidth>
              <InputLabel id="genre-filter-label">Genre</InputLabel>
              <Select
                labelId="genre-filter-label"
                value={selectedGenre ?? 'all'}
                label="Genre"
                onChange={handleGenreDropdownChange}
                sx={{
                  '& .MuiSelect-select': {
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px) saturate(145%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(145%)',
                  },
                }}
              >
                <MenuItem value="all">All genres</MenuItem>
                {genreOptions.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
              placeholder="Search title or genre"
              size="small"
              fullWidth
            />
          </Stack>

          <TrackList
            tracks={filteredTracks}
            activeTrackId={activeTrack.id}
            onSelectTrack={handleSelectTrack}
            onGenreSelect={handleGenreSelect}
          />
        </Stack>
      </Paper>

      <BeatPlayerFooter
        track={activeTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onOpenLicenses={handleOpenLicenses}
      />

      <BeatLicenseDialog
        open={isLicenseDialogOpen}
        beatId={activeTrack.id}
        beatTitle={activeTrack.title}
        leaseOptions={leaseOptions}
        selectedLease={activeLeaseId}
        onClose={handleCloseLicenses}
        onLeaseSelect={handleLeaseSelect}
        onCheckout={handleCheckout}
        onExclusiveInquiry={handleExclusiveInquiry}
      />

      <BeatInquiryDialog open={isInquiryDialogOpen} beatTitle={activeTrack.title} onClose={handleCloseInquiry} />

      <BeatCartDialog
        open={isCartDialogOpen}
        beatTitle={checkoutIntent?.beatTitle ?? activeTrack.title}
        leaseName={checkoutIntent?.leaseName ?? selectedLease?.name ?? 'Lease'}
        leasePrice={checkoutIntent?.leasePrice ?? selectedLease?.price ?? '—'}
        leaseRights={checkoutIntent?.leaseRights ?? selectedLease?.rights ?? []}
        onClose={handleCloseCart}
      />
    </Stack>
  );
};

export default Beats;

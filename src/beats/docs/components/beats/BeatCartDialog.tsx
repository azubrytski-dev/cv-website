'use client';

import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface BeatCartDialogProps {
  open: boolean;
  beatTitle: string;
  leaseName: string;
  leasePrice: string;
  leaseRights: string[];
  onClose: () => void;
}

const BeatCartDialog: React.FC<BeatCartDialogProps> = ({
  open,
  beatTitle,
  leaseName,
  leasePrice,
  leaseRights,
  onClose,
}) => {
  const rightItems = leaseRights.slice(0, 4);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(8, 28, 18, 0.94), rgba(5, 16, 11, 0.90))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(250, 250, 250, 0.96))',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 18px 42px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 18px 38px rgba(25, 118, 210, 0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        },
      }}
    >
      <DialogTitle
        sx={{
          position: 'relative',
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 2.5 },
          pb: { xs: 1.25, sm: 1.5 },
          pr: 8,
        }}
      >
        <Stack spacing={0.2}>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
            Added to cart
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
            <strong>{leaseName}</strong> for <strong>{beatTitle}</strong>.
          </Typography>
        </Stack>
        <IconButton
          aria-label="Close cart dialog"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pt: 0, pb: { xs: 2, sm: 2.5 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.25,
            borderRadius: 3,
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(52,255,161,0.12)' : '1px solid rgba(25,118,210,0.14)',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(14px) saturate(150%)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%)',
          }}
        >
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: '0.16em', opacity: 0.7 }}>
                Item
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                {beatTitle}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                License
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {leaseName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>
                Rights
              </Typography>
              <Stack spacing={0.35}>
                {rightItems.map((right) => (
                  <Typography key={right} variant="body2" sx={{ color: 'text.secondary' }}>
                    • {right}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pt: 0.75,
                borderTop: '1px solid rgba(127,127,127,0.18)',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Cost
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {leasePrice}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 800,
            borderRadius: 999,
            backgroundImage: 'none',
            boxShadow: 'none',
            color: (theme) => (theme.palette.mode === 'dark' ? 'common.white' : '#111111'),
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(52,255,161,0.28)' : 'rgba(25,118,210,0.34)',
            backdropFilter: 'blur(14px) saturate(150%)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%)',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.06)' : 'rgba(255,255,255,0.58)'),
            '&:hover': {
              backgroundImage: 'none',
              boxShadow: 'none',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.10)' : 'rgba(255,255,255,0.72)'),
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(52,255,161,0.44)' : 'rgba(25,118,210,0.48)',
            },
          }}
        >
          Close
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 800,
            borderRadius: 999,
            backgroundImage: 'none',
            boxShadow: 'none',
            color: (theme) => (theme.palette.mode === 'dark' ? '#05110b' : '#111111'),
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.18)' : 'rgba(255,255,255,0.58)'),
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(13,255,158,0.26)'
                : '1px solid rgba(25,118,210,0.34)',
            backdropFilter: 'blur(14px) saturate(150%)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%)',
            '&:hover': {
              backgroundImage: 'none',
              boxShadow: 'none',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.24)' : 'rgba(255,255,255,0.72)',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(13,255,158,0.40)' : 'rgba(25,118,210,0.48)',
            },
          }}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BeatCartDialog;

'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface BeatInquiryDialogProps {
  open: boolean;
  beatTitle: string;
  onClose: () => void;
}

const BeatInquiryDialog: React.FC<BeatInquiryDialogProps> = ({ open, beatTitle, onClose }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        <Stack spacing={0.75}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Exclusive inquiry
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Send a request for <strong>{beatTitle}</strong>.
          </Typography>
        </Stack>
        <IconButton
          aria-label="Close inquiry dialog"
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1.5} component="form" sx={{ pt: 1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField fullWidth label="Your name" size="small" />
            <TextField fullWidth label="Email" size="small" />
          </Stack>
          <TextField fullWidth label="Message" size="small" multiline minRows={4} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 800,
            borderRadius: 999,
            color: isDark ? 'common.white' : 'text.primary',
            borderColor: isDark ? 'rgba(52,255,161,0.28)' : 'rgba(25,118,210,0.34)',
            backgroundColor: isDark ? 'rgba(13,255,158,0.06)' : 'rgba(255,255,255,0.58)',
            backdropFilter: 'blur(14px) saturate(150%)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%)',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(13,255,158,0.10)' : 'rgba(255,255,255,0.72)',
              borderColor: isDark ? 'rgba(52,255,161,0.44)' : 'rgba(25,118,210,0.48)',
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
            color: isDark ? '#05110b' : 'text.primary',
            borderColor: isDark ? 'rgba(13,255,158,0.26)' : 'rgba(25,118,210,0.34)',
            backgroundColor: isDark ? 'rgba(13,255,158,0.18)' : 'rgba(255,255,255,0.58)',
            backdropFilter: 'blur(14px) saturate(150%)',
            WebkitBackdropFilter: 'blur(14px) saturate(150%)',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(13,255,158,0.24)' : 'rgba(255,255,255,0.72)',
              borderColor: isDark ? 'rgba(13,255,158,0.40)' : 'rgba(25,118,210,0.48)',
            },
          }}
        >
          Send inquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BeatInquiryDialog;

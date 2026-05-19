'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { LeaseOption, LeaseType } from '../../models/Beat';
import LeaseOptions from './LeaseOptions';

interface BeatLicenseDialogProps {
  open: boolean;
  beatId: string;
  beatTitle: string;
  leaseOptions: LeaseOption[];
  selectedLease: LeaseType | null;
  onClose: () => void;
  onLeaseSelect: (lease: LeaseOption) => void;
  onCheckout: (lease: LeaseOption) => void;
  onExclusiveInquiry: (lease: LeaseOption) => void;
}

const BeatLicenseDialog: React.FC<BeatLicenseDialogProps> = ({
  open,
  beatTitle,
  beatId,
  leaseOptions,
  selectedLease,
  onClose,
  onLeaseSelect,
  onCheckout,
  onExclusiveInquiry,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isMobile}
      maxWidth="xl"
      scroll="paper"
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          borderRadius: { xs: 0, sm: 4 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(18, 18, 18, 0.88), rgba(12, 12, 12, 0.92))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(248, 250, 252, 0.92))',
          backdropFilter: 'blur(12px) saturate(135%)',
          WebkitBackdropFilter: 'blur(12px) saturate(135%)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 18px 42px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.04)'
              : '0 18px 38px rgba(25, 118, 210, 0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        },
      }}
    >
      <DialogTitle
        sx={{
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 2.5 },
          pb: { xs: 1.25, sm: 1.5 },
        }}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Stack spacing={0.15} sx={{ pr: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
            License options
          </Typography>
          </Stack>
          <IconButton
            aria-label="Close license dialog"
            onClick={onClose}
            sx={{
              flexShrink: 0,
              mt: -0.25,
              mr: -0.25,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          pt: { xs: 1.5, sm: 0 },
          pb: { xs: 2, sm: 2.5 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <LeaseOptions
          beatId={beatId}
          beatTitle={beatTitle}
          leaseOptions={leaseOptions}
          selectedLease={selectedLease}
          onLeaseSelect={onLeaseSelect}
          onCheckout={onCheckout}
          onExclusiveInquiry={onExclusiveInquiry}
          compact
          showHeader={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BeatLicenseDialog;

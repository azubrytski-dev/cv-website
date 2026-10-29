'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { LeaseOption, LeaseType } from '../../models/Beat';
import LeaseOptionCard from './LeaseOptionCard';

interface LeaseOptionsProps {
  beatId: string;
  beatTitle: string;
  leaseOptions: LeaseOption[];
  selectedLease: LeaseType | null;
  onLeaseSelect: (lease: LeaseOption) => void;
  onCheckout: (lease: LeaseOption) => void;
  onExclusiveInquiry: (lease: LeaseOption) => void;
  compact?: boolean;
  showHeader?: boolean;
}

const LeaseOptions: React.FC<LeaseOptionsProps> = ({
  beatTitle,
  leaseOptions,
  selectedLease,
  onLeaseSelect,
  onCheckout,
  onExclusiveInquiry,
  compact = false,
  showHeader = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const carouselMode = compact && isMobile;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = useMemo(() => {
    const index = leaseOptions.findIndex((lease) => lease.id === selectedLease);
    return index >= 0 ? index : 0;
  }, [leaseOptions, selectedLease]);

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (!carouselMode) {
      return;
    }

    const container = carouselRef.current;
    if (!container) {
      return;
    }

    const target = container.children[selectedIndex] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [carouselMode, selectedIndex]);

  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    if (!container || !container.children.length) {
      return;
    }

    const child = container.children[0] as HTMLElement;
    const childWidth = child.getBoundingClientRect().width;
    if (!childWidth) {
      return;
    }

    const nextIndex = Math.round(container.scrollLeft / childWidth);
    const clampedIndex = Math.max(0, Math.min(leaseOptions.length - 1, nextIndex));
    setActiveIndex(clampedIndex);
  };

  return (
    <Stack spacing={compact ? 1.5 : 2.5} sx={{ height: carouselMode ? '100%' : 'auto', minHeight: 0 }}>
      {showHeader && (
        <Box>
          <Typography
            variant={compact ? 'h5' : 'h4'}
            sx={{ fontWeight: 850, letterSpacing: '-0.04em', textAlign: 'left' }}
          >
            Lease Options
          </Typography>
          <Typography variant={compact ? 'body2' : 'body1'} sx={{ mt: 1, color: 'text.secondary', textAlign: 'left' }}>
            Choose a license for <strong>{beatTitle}</strong> before checkout.
          </Typography>
        </Box>
      )}

      {carouselMode ? (
        <Stack spacing={1} sx={{ height: '100%', minHeight: 0, pt: { xs: 1, sm: 0 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexShrink: 0 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              Swipe to browse licenses
            </Typography>
            <Chip
              label={`${activeIndex + 1} / ${leaseOptions.length}`}
              size="small"
              variant="outlined"
              sx={{ height: 24, fontWeight: 700 }}
            />
          </Stack>

          <Box
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            sx={{
              display: 'flex',
              gap: 1,
              flex: 1,
              minHeight: 0,
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollPaddingInline: 16,
              px: 2,
              pt: { xs: 1, sm: 0 },
              py: 0.75,
              boxSizing: 'border-box',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {leaseOptions.map((lease) => {
              const isSelected = selectedLease === lease.id;

              return (
                <Box
                  key={lease.id}
                  sx={{
                    flex: '0 0 100%',
                    scrollSnapAlign: 'center',
                    minWidth: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <LeaseOptionCard
                      lease={lease}
                      selected={isSelected}
                      onSelect={onLeaseSelect}
                      onCheckout={onCheckout}
                      onExclusiveInquiry={onExclusiveInquiry}
                      compact
                      fullHeight
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mt: 'auto', flexShrink: 0, pb: 0.5 }}>
            {leaseOptions.map((lease, index) => (
              <Box
                key={lease.id}
                sx={{
                  width: index === activeIndex ? 18 : 6,
                  height: 6,
                  borderRadius: 999,
                  transition: 'width 160ms ease, background-color 160ms ease',
                  backgroundColor:
                    index === activeIndex
                      ? theme.palette.primary.main
                      : 'rgba(127, 127, 127, 0.26)',
                }}
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: compact ? 1.25 : 2,
            pt: { xs: 0.5, md: 1.5 },
            pb: { xs: 0.5, md: 0 },
            gridTemplateColumns: {
              xs: '1fr',
              md: compact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))',
              lg: compact ? 'repeat(4, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
            },
          }}
        >
          {leaseOptions.map((lease) => {
            const isSelected = selectedLease === lease.id;

            return (
              <LeaseOptionCard
                key={lease.id}
                lease={lease}
                selected={isSelected}
                onSelect={onLeaseSelect}
                onCheckout={onCheckout}
                onExclusiveInquiry={onExclusiveInquiry}
                compact={compact}
              />
            );
          })}
        </Box>
      )}
    </Stack>
  );
};

export default LeaseOptions;

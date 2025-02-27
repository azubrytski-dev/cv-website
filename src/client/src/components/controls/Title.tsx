import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const AnimatedNeonTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    animation: 'neonPulse 2s infinite',
  }));
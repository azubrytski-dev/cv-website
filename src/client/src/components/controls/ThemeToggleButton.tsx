'use client';

import { IconButton, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function ThemeToggleButton({ isDarkMode, onToggleTheme }: ThemeToggleButtonProps) {
  return (
    <Tooltip title={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}>
      <IconButton onClick={onToggleTheme} aria-label="toggle theme" aria-pressed={isDarkMode} sx={{ color: 'text.secondary' }}>
        {isDarkMode ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

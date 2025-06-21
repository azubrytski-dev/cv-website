import React from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <IconButton
      onClick={onToggleTheme}
      color="primary"
      aria-label="toggle theme"
      className="theme-toggle-button" 
      sx={{
        zIndex: 1000,
        boxShadow: isDarkMode
          ? '0 0 5px #0ff, inset 0 0 5px #0ff'
          : 'none',
        borderRadius: 2,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: isDarkMode
            ? '0 0 10px #0ff, inset 0 0 10px #0ff'
            : '0 0 5px rgba(0,0,0,0.3)',
        },
      }}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
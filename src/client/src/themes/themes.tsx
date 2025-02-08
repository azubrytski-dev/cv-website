// themes.ts
import { createTheme } from '@mui/material/styles';

// Dark/Neon theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0ff', // neon cyan
    },
    background: {
      default: '#1a1a1a',
      paper: '#262626',
    },
    text: {
      primary: '#0ff',
    },
  },
  typography: {
    fontFamily: 'Consolas, "Courier New", monospace',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: '0 0 5px #0ff, inset 0 0 5px #0ff',
          borderRadius: '4px',
          '&:hover': {
            boxShadow: '0 0 10px #0ff, inset 0 0 10px #0ff',
          },
        },
      },
    },
  },
});

// Bright/Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#fdfdfd',
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

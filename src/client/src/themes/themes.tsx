import { createTheme } from '@mui/material/styles';
import '../styles/global.scss'; // Import SCSS variables

// Helper function to fetch CSS variables from SCSS safely
const getCSSVariable = (property: string): string => {
  if (typeof window !== 'undefined') {
    return window.getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  }
  return ''; // Fallback if window is not available
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: getCSSVariable('--dark-primary') },
    secondary: { main: getCSSVariable('--dark-secondary') },
    background: {
      default: getCSSVariable('--dark-bg'),
      paper: getCSSVariable('--dark-paper'),
    },
    text: {
      primary: getCSSVariable('--dark-text-primary'),
      secondary: getCSSVariable('--dark-text-secondary'),
    },
  },
  typography: {
    fontFamily: getCSSVariable('--font-primary'),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: getCSSVariable('--dark-primary'),
      textTransform: 'uppercase',
      textShadow: getCSSVariable('--dark-hover-shadow'),
    },
    h2: {
      color: getCSSVariable('--dark-secondary'),
      textShadow: getCSSVariable('--dark-hover-shadow'),
    },
    h5: {
      fontSize: '2.2rem',
      fontWeight: 400,
      color: getCSSVariable('--dark-text'),
      textShadow: getCSSVariable('--dark-hover-shadow'),
    },
    body1: {
      fontSize: '1.2rem',
      color: getCSSVariable('--dark-text-secondary'),
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '& a': {
            color: getCSSVariable('--dark-text-primary'),
            textDecoration: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              opacity: 0.8,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: getCSSVariable('--dark-primary'),
          textTransform: 'uppercase',
          borderRadius: '0.625rem',
          padding: '0.75rem 1.5rem',
          fontWeight: 'bold',
          transition: '0.3s',
          background: getCSSVariable('--dark-gradient'),
          boxShadow: getCSSVariable('--dark-button-shadow'),
          '&:hover': {
            background: getCSSVariable('--dark-gradient'),
            boxShadow: getCSSVariable('--dark-hover-shadow'),
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: getCSSVariable('--light-primary') },
    secondary: { main: getCSSVariable('--light-secondary') },
    background: {
      default: getCSSVariable('--light-bg'),
      paper: getCSSVariable('--light-paper'),
    },
    text: {
      primary: getCSSVariable('--light-text-primary'),
      secondary: getCSSVariable('--light-text-secondary'),
    },
  },
  typography: {
    fontFamily: getCSSVariable('--font-primary'),
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      color: getCSSVariable('--light-text-primary'),
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: getCSSVariable('--light-primary'),
    },
    h5: {
      fontSize: '2.2rem',
      fontWeight: 400,
      color: getCSSVariable('--light-primary'),
    },
    body1: {
      fontSize: '1.2rem',
      color: getCSSVariable('--light-text-secondary'),
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '& a': {
            color: getCSSVariable('--light-text-primary'),
            textDecoration: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              opacity: 0.8,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: getCSSVariable('--light-text-primary'),
          textTransform: 'uppercase',
          borderRadius: '0.625rem',
          padding: '0.75rem 1.5rem',
          fontWeight: 'bold',
          transition: '0.3s',
          background: getCSSVariable('--light-gradient'),
          '&:hover': {
            background: getCSSVariable('--light-gradient'),
            boxShadow: getCSSVariable('--light-hover-shadow'),
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});
import { createTheme } from '@mui/material/styles';

const darkPalette = {
  primary: '#00ff99',
  secondary: '#ff4081',
  link: '#33ffb1',
  bg: '#121212',
  paper: '#1e1e1e',
  textPrimary: '#e8e8e8',
  textSecondary: '#b0bec5',
  text: '#00ff99',
  gradient: 'linear-gradient(135deg, #00ff99 0%, #00ff99 100%)',
  buttonShadow: '0 0 0.9375rem #00ff99',
  hoverShadow: '0 0 1.25rem #00ff99',
  fontFamily: 'Poppins, Arial, sans-serif',
};

const lightPalette = {
  primary: '#1976d2',
  secondary: '#ff4081',
  link: '#4aa3ff',
  bg: '#f5f5f5',
  paper: '#ffffff',
  textPrimary: '#212121',
  textSecondary: '#757575',
  gradient: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
  hoverShadow: '0 0 0.625rem #1976d2',
  fontFamily: 'Poppins, Arial, sans-serif',
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: darkPalette.primary },
    secondary: { main: darkPalette.secondary },
    background: {
      default: darkPalette.bg,
      paper: darkPalette.paper,
    },
    text: {
      primary: darkPalette.textPrimary,
      secondary: darkPalette.textSecondary,
    },
  },
  typography: {
    fontFamily: darkPalette.fontFamily,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: darkPalette.primary,
      textTransform: 'uppercase',
      textShadow: darkPalette.hoverShadow,
    },
    h2: {
      color: darkPalette.secondary,
      textShadow: darkPalette.hoverShadow,
    },
    h5: {
      fontSize: '2.2rem',
      fontWeight: 400,
      color: darkPalette.text,
      textShadow: darkPalette.hoverShadow,
    },
    body1: {
      fontSize: '1.2rem',
      color: darkPalette.textSecondary,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '& a': {
            color: darkPalette.link,
            textDecoration: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              color: darkPalette.primary,
            },
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: darkPalette.primary,
          textTransform: 'uppercase',
          borderRadius: '0.625rem',
          padding: '0.75rem 1.5rem',
          fontWeight: 'bold',
          transition: '0.3s',
          background: darkPalette.gradient,
          boxShadow: darkPalette.buttonShadow,
          '&:hover': {
            background: darkPalette.gradient,
            boxShadow: darkPalette.hoverShadow,
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
    primary: { main: lightPalette.primary },
    secondary: { main: lightPalette.secondary },
    background: {
      default: lightPalette.bg,
      paper: lightPalette.paper,
    },
    text: {
      primary: lightPalette.textPrimary,
      secondary: lightPalette.textSecondary,
    },
  },
  typography: {
    fontFamily: lightPalette.fontFamily,
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      color: lightPalette.textPrimary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: lightPalette.primary,
    },
    h5: {
      fontSize: '2.2rem',
      fontWeight: 400,
      color: lightPalette.primary,
    },
    body1: {
      fontSize: '1.2rem',
      color: lightPalette.textSecondary,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '& a': {
            color: lightPalette.link,
            textDecoration: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              color: lightPalette.primary,
            },
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: lightPalette.textPrimary,
          textTransform: 'uppercase',
          borderRadius: '0.625rem',
          padding: '0.75rem 1.5rem',
          fontWeight: 'bold',
          transition: '0.3s',
          background: lightPalette.gradient,
          '&:hover': {
            background: lightPalette.gradient,
            boxShadow: lightPalette.hoverShadow,
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

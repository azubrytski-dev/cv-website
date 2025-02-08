import { createTheme } from '@mui/material/styles';
import '../styles/global.scss'; // Import SCSS styles

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0ff' },
    secondary: { main: '#ff4081' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'Poppins, Consolas, "Courier New", monospace',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#0ff',
      textTransform: 'uppercase',
      textShadow: '0 0 10px #0ff',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#ff4081',
      textShadow: '0 0 10px #ff4081',
    },
    body1: {
      fontSize: '1rem',
      color: '#b0bec5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#0ff',
          textTransform: 'uppercase',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 'bold',
          transition: '0.3s',
          background: 'linear-gradient(135deg, #0ff 0%, #0066ff 100%)',
          boxShadow: '0 0 15px #0ff',
          '&:hover': {
            background: 'linear-gradient(135deg, #0066ff 0%, #0ff 100%)',
            boxShadow: '0 0 20px #0ff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: '12px',
          boxShadow: '0px 0px 20px rgba(0, 255, 255, 0.2)',
          padding: '16px',
        },
      },
    },
  },
});

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      color: '#212121',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1976d2',
    },
    body1: {
      fontSize: '1rem',
      color: '#424242',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          textTransform: 'uppercase',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 'bold',
          transition: '0.3s',
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #64b5f6 0%, #1976d2 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        },
      },
    },
  },
});
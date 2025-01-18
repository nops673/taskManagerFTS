/* istanbul ignore file */
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B4A',
      light: '#FF8A6F',
      dark: '#E54E2E',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFBC70',
      light: '#FFD199',
      dark: '#E5A54D',
      contrastText: '#2D2D2D',
    },
    background: {
      default: '#FFF9F2',
      paper: '#fff',
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#72696F',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Londrina Solid',
      fontWeight: 700,
      color: '#FF6B4A',
    },
    h2: {
      fontFamily: 'Londrina Solid',
      fontWeight: 700,
      color: '#FF6B4A',
    },
    h3: {
      fontFamily: 'Londrina Solid',
      fontWeight: 600,
      color: '#FF6B4A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(255, 107, 74, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '8px 4px',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
}); 
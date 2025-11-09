import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
      light: '#a5b4fc',
      dark: '#4c5fd7',
    },
    secondary: {
      main: '#764ba2',
      light: '#a78bfa',
      dark: '#5b3a81',
    },
    success: {
      main: '#48bb78',
      light: '#68d391',
      dark: '#38a169',
    },
    info: {
      main: '#4fc3f7',
      light: '#7dd3fc',
      dark: '#0891b2',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#f59e0b',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#dc2626',
    },
    background: {
      default: '#0f0c29',
      paper: 'rgba(30, 30, 47, 0.85)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
    '0 8px 32px rgba(103, 126, 234, 0.2)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.4)',
    '0 12px 48px rgba(103, 126, 234, 0.3)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default darkTheme;

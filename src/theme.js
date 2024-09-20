import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue for buttons
    },
    secondary: {
      main: '#f48fb1', // Optional secondary color
    },
    background: {
      default: '#121212', // Overall dark background
      paper: '#1e1e1e',   // Darker Paper background for components
    },
    text: {
      primary: '#ffffff', // White text for better readability
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

export default darkTheme;

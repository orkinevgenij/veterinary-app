import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#c11c63',
      light: '#e63c69',
    },
    success: {
      main: '#4c66b4',
      dark: '#6a7db6',
      light: '#7886b0',
      contrastText: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'success.main',
          },
        },
      },
    },
  },
});

export default theme;

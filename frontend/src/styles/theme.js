import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#c11c63',
      light: '#e63c69',
    },
    success: {
      light: '#e9eaf0',
      main: '#4c66b4',
      dark: '#6a86db',
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
  // breakpoints: {
  //   values: {
  //     mobile: 0,
  //     tablet: 768,
  //     tablet: 1024,
  //     desktop: 1200,
  //   },
  // },
});

export default theme;

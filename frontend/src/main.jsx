import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './styles/index.css';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <Provider store={store}>{<App />}</Provider>
    </BrowserRouter>
  </ThemeProvider>,
);

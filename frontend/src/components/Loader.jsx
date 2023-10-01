import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',

        justifyContent: 'center',
        margin: '0px auto',
        alignItems: 'center',
        height: '100vh',
        width: '100vh',
      }}
    >
      <CircularProgress color='success' />
    </Box>
  );
};

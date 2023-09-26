import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        margin: '0px auto',

        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color='success' />
    </Box>
  );
};

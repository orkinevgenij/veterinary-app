import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100vw',
      }}
    >
      <CircularProgress color='success' />
    </Box>
  );
};

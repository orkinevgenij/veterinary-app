import React from 'react';
import NoResults from '../assets/img/no-results.png';
import { Box, Typography } from '@mui/material';
export const ProductsNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <img src={NoResults} alt='empty' style={{ width: '200px', height: '200px' }} />
      <Typography variant='h5'>Ничего не найдено :(</Typography>
    </Box>
  );
};

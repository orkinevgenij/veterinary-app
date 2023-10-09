import { Box, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ImageSlider } from '../../components/ImageSlider';

export const ZooShop = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          height: '400px',
        }}
      >
        <ImageSlider />
      </Box>
      <Outlet />
    </>
  );
};

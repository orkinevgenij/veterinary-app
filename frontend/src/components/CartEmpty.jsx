import React from 'react';
import Empty from '../assets/img/cart-empty.png';
import { Box, Typography } from '@mui/material';
export const CartEmpty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 5,
      }}
    >
      <img src={Empty} alt='empty' style={{ width: '300px', height: '300px' }} />
      <Typography>У кошику відсутні товари</Typography>
    </Box>
  );
};

import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import { useTheme } from '@emotion/react';
import { AdminMobileMenu } from './AdminMobileMenu';
export const AdminDashbord = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: {
          sm: 'row',
        },
      }}
    >
      <Stack>
        {!matches && <AdminMenu />}
        {matches && <AdminMobileMenu />}
      </Stack>
      <Stack
        sx={{
          width: '100%',
          mt: 5,
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

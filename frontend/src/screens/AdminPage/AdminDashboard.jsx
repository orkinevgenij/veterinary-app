import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';
export const AdminDashbord = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <AdminMenu />
      <Outlet />
    </Box>
  );
};

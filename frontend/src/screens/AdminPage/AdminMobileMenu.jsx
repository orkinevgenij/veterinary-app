import { Box, Button, Drawer, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import AdminMenu from './AdminMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDrawer } from '../../redux/slices/modalSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react';
export const AdminMobileMenu = () => {
  const { isDrawerOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Button
        variant='contained'
        color='success'
        sx={{
          display: 'flex',
          margin: '0px auto',
          mt: 1,
        }}
        onClick={() => dispatch(setOpenDrawer(true))}
      >
        Панель админа
      </Button>
      <Box>
        <Drawer anchor='top' open={isDrawerOpen}>
          <Box
            sx={{
              height: '100vh',
            }}
          >
            <Box>
              <Button
                variant='text'
                size='small'
                sx={{
                  borderRadius: '15px',
                }}
                startIcon={<ArrowBackIcon />}
                onClick={() => dispatch(setOpenDrawer(false))}
              >
                <Typography>Вернуться</Typography>
              </Button>
            </Box>
            <AdminMenu />
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

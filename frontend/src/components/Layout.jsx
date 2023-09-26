import React from 'react';
import { Outlet } from 'react-router-dom';
import { SubHeader } from './SubHeader';
import { Header } from './Header';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/material';
export const Layout = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <Container maxWidth='xl'>
        <ToastContainer />
        <Outlet />
      </Container>
    </>
  );
};

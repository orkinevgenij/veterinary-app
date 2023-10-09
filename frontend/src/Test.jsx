import { Typography, styled } from '@mui/material';
import { green, purple, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import MyApp from './myapp/myapp';

const Responsive = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('mobile')]: {
    color: green[500],
  },
  [theme.breakpoints.up('tablet')]: {
    color: purple[500],
  },
  [theme.breakpoints.up('desktop')]: {
    color: red[500],
  },
}));

export const Test = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#393940c0',
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
      }}
    >
      <div>
        <Responsive>
          <Typography variant='h4'>Advanced Matherial UI</Typography>
          <Typography variant='h4'>{w} px</Typography>
          <Typography
            sx={{
              display: {
                tablet: 'none',
              },
            }}
          >
            Mobile
          </Typography>
          <Typography
            sx={{
              display: {
                mobile: 'none',
                tablet: 'block',
                desktop: 'none',
              },
            }}
          >
            Tablet
          </Typography>
          <Typography
            sx={{
              display: {
                mobile: 'none',
                tablet: 'none',
                desktop: 'block',
              },
            }}
          >
            Desktop
          </Typography>
        </Responsive>
        <MyApp />
      </div>
    </div>
  );
};

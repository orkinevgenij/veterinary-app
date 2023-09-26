import {
  AppBar,
  Badge,
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Facebook,
  Instagram,
  Telegram,
  LocationOn,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { ShoppingCart } from '../screens/ZooShop/ShoppingCart';
export const SubHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <ShoppingCart isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0 10px 0 10px',
          bgcolor: 'success.main',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconButton
            sx={{
              color: '#fff',
            }}
          >
            <LocationOn />
          </IconButton>
          <IconButton
            component='a'
            href='https://www.facebook.com/orkinevgenij'
            sx={{
              color: '#fff',
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component='a'
            href='https://www.instagram.com/evgeniiorkin/'
            sx={{
              color: '#fff',
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            component='a'
            href='https://t.me/orkinevgenij'
            sx={{
              color: '#fff',
            }}
          >
            <Telegram />
          </IconButton>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <CartIcon sx={{ color: 'white' }} fontSize='large' />
          </IconButton>
          <Box>
            <Typography
              sx={{
                color: '#fff',
              }}
              variant='subtitle2'
            >
              Кошик
            </Typography>
            <Typography
              variant='body2'
              sx={{
                backgroundColor: 'warning.main',
                borderRadius: 1,
                padding: '3px',
                color: '#fff',
              }}
            >
              {cartItems?.length} товара
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

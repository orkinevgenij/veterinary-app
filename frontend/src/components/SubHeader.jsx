import { Facebook, Instagram, LocationOn, Telegram } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Box, IconButton, InputAdornment, Stack, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearch } from '../redux/slices/filterSlice';
import { ShoppingCart } from '../screens/ZooShop/ShoppingCart';

export const SubHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { search } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 3,
      top: 17,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <>
      <ShoppingCart isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0 10px 0 10px',
          bgcolor: 'success.main',
        }}
      >
        <Stack
          sx={{
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
        <TextField
          onChange={handleChange}
          value={search}
          placeholder='Я шукаю...'
          size='small'
          sx={{
            width: '60%',
            backgroundColor: '#fff',
            borderRadius: '5px',
            margin: '5px',
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' onClick={() => navigate('/shop/search-products')}>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box>
            <IconButton aria-label='cart' onClick={() => setIsDrawerOpen(true)}>
              <StyledBadge badgeContent={cartItems?.length} color='warning'>
                <ShoppingCartOutlinedIcon
                  fontSize='large'
                  sx={{
                    color: '#fff',
                  }}
                />
              </StyledBadge>
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

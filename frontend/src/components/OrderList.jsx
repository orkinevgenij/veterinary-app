import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import currencyFormatter from '../utils/currencyFormatter';
export const OrderList = ({ orders }) => {
  const [isOpen, setIsOpen] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const totalPrice = () => {
    let total = 0;
    orders?.products.map((item) => {
      total = total + item.price * item.count;
    });
    return total.toLocaleString('ua', {
      style: 'currency',
      currency: 'UAH',
    });
  };
  const handleToggle = (id) => {
    if (isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        onClick={() => handleToggle(orders._id)}
        sx={{
          border: '1px solid ',
          borderColor: 'grey.300',
          borderRadius: '5px',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          mt: 1,
        }}
      >
        {pathname === '/admin/orders' && (
          <Typography
            variant='body1'
            sx={{
              color: 'grey.700',
              width: '100%',
            }}
          >
            {orders.buyer.name}
          </Typography>
        )}
        <Grid item sx={12} sm={6} md={4}>
          <Typography variant='caption' color='grey.500'>
            №
          </Typography>{' '}
          <Typography variant='caption'>{orders._id}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='caption' color='grey.500'>
            Сума замовлення
          </Typography>
          <Typography variant='caption'>{totalPrice()}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          {orders.products.map((o) => (
            <img src={o.image.url} alt='' width='20px' height='20px' />
          ))}
        </Grid>

        {isOpen && (
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
          >
            {orders.products.map((o) => (
              <>
                <Grid item sm={4} md={4} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <img src={o.image.url} alt='' width='20px' height='20px' />
                    <Typography
                      variant='caption'
                      onClick={() => navigate(`/shop/product-details/${o?.slug}`)}
                      color='success.main'
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {o.title}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={4} md={4} xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <Typography variant='caption' color='grey.500'>
                      Ціна
                    </Typography>
                    <Typography variant='caption'>{currencyFormatter(o.price)}</Typography>
                  </Box>
                </Grid>
                <Grid item sm={4} md={4} xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <Typography variant='caption' color='grey.500'>
                      Кільскість
                    </Typography>
                    <Typography variant='caption'>{o.count}</Typography>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        )}
        {isOpen ? (
          <ArrowDropUpIcon
            sx={{
              position: 'absolute',
              right: 6,
              top: 15,
            }}
            color='success'
          />
        ) : (
          <ArrowDropDownIcon
            sx={{
              position: 'absolute',
              right: 6,
              top: 15,
            }}
            color='success'
          />
        )}
      </Grid>
    </>
  );
};

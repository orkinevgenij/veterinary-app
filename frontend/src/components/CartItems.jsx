import { Box, Button, Divider, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Add, Close, Delete, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItem, countMinus, removeItem } from '../redux/slices/cartSlice';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import currencyFormatter from '../utils/currencyFormatter';

const CartItems = ({ products }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  const { cartItems, totalPrice, totalCount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeCartItem = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      dispatch(removeItem({ id }));
    }
  };

  const handleCountMinus = (id) => {
    if (products.count > 1) {
      dispatch(countMinus(id));
    } else {
      if (window.confirm('Вы действительно хотите удалить?')) dispatch(removeItem(id));
    }
  };
  return (
    <Box
      key={products.id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      <IconButton onClick={() => removeCartItem(products.id)}>
        <DeleteOutlinedIcon color='success' fontSize='small' />
      </IconButton>
      <img
        src={products?.image?.url}
        alt=''
        style={{ width: '80px', height: '80px', marginRight: '5px' }}
      />
      <Typography width='100px'>{products?.title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            handleCountMinus({ id: products.id });
          }}
        >
          <Remove
            sx={{
              color: 'grey.400',
            }}
          />
        </IconButton>
        <Typography
          sx={{
            padding: '3px 20px 3px 20px',
            borderRadius: '8px',
            border: '1px solid ',

            borderColor: 'grey.400',
          }}
        >
          {products?.count}
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(addCartItem({ id: products.id }));
          }}
        >
          <Add color='success' />
        </IconButton>
      </Box>
      <Typography>{currencyFormatter(products?.price)}</Typography>
    </Box>
  );
};

export default CartItems;

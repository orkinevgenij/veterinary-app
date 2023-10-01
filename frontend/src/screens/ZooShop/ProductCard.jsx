import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItem } from '../../redux/slices/cartSlice';
import currencyFormatter from '../../utils/currencyFormatter';
export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (title, price, image, id) => {
    dispatch(addCartItem(title, price, image, id));
  };

  return (
    <Card
      key={product?._id}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.1)',
          transition: 'transform 0.25s',
        },
        padding: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      align='center'
    >
      <CardHeader title={product?.title} titleTypographyProps={{ variant: 'subtitle' }} />
      <CardContent onClick={() => navigate(`/shop/product-details/${product?.slug}`)}>
        <CardMedia
          sx={{ height: 150, width: 150 }}
          image={product?.image?.url}
          title={product?.title}
        />
        <Typography variant='body2' color='text.secondary' noWrap>
          {product?.description.substring(0, 30)}
        </Typography>
      </CardContent>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography>{currencyFormatter(product?.price)}</Typography>
        <IconButton
          color='success'
          onClick={() =>
            addToCart({
              title: product.title,
              price: product.price,
              image: product.image,
              id: product._id,
            })
          }
        >
          <ShoppingCartOutlinedIcon fontSize='medium' />
        </IconButton>
      </Stack>
    </Card>
  );
};

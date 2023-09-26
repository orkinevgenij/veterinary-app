import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slices/cartSlice';
import currencyFormatter from '../../utils/currencyFormatter';
export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

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
      <Typography pr='10px'>{currencyFormatter(product?.price)} </Typography>
      <Button
        variant='contained'
        color='success'
        endIcon={<ShoppingCartIcon />}
        onClick={() =>
          addToCart({
            title: product.title,
            price: product.price,
            image: product.image,
            id: product._id,
          })
        }
        sx={{
          width: '50%',
        }}
      >
        Купить
      </Button>
    </Card>
  );
};

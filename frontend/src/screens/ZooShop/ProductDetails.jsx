import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { addCartItem } from '../../redux/slices/cartSlice';
import {
  useGetProductDetailsQuery,
  useRelatedProductQuery,
} from '../../redux/slices/productsApiSlice';
import { useGetMeQuery } from '../../redux/slices/usersApiSlice';
import ProductRelated from './ProductRelated';
import currencyFormatter from '../../utils/currencyFormatter';
export const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profile = [], isFetching } = useGetMeQuery([]);

  const { data: product = [], isLoading } = useGetProductDetailsQuery(slug);
  const { data: relatedProduct = [] } = useRelatedProductQuery(
    {
      cid: product.category,
      pid: product._id,
    },
    {
      skip: isLoading,
    },
  );
  const addToCart = (title, price, image, id) => {
    dispatch(addCartItem(title, price, image, id));
  };
  if (isLoading) return <Loader />;

  return (
    <>
      <Grid
        container
        sx={{
          textAlign: 'center',
          mt: 3,
        }}
        spacing={5}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            margin: '0px auto 50px 0px',
          }}
        >
          <Typography variant='h5'>{product?.title}</Typography>
          <img
            style={{ height: '300px', width: '300px' }}
            src={product?.image?.url}
            title={product?.title}
          />
          <Typography variant='body2' color='text.secondary'>
            {product?.description}
          </Typography>
          <Typography align='center' pr='10px'>
            {currencyFormatter(product.price)}
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack>
            <Button
              variant='contained'
              color='success'
              size='large'
              sx={{
                mb: 3,
              }}
              onClick={() =>
                addToCart({
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  id: product._id,
                })
              }
              endIcon={<ShoppingCartIcon fontSize='large' />}
            >
              Купить
            </Button>
            <Button
              size='large'
              variant='contained'
              color='success'
              endIcon={<HomeIcon fontSize='large' />}
              onClick={() =>
                navigate('/profile-update', {
                  state: { profile },
                })
              }
            >
              Обновить данные
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Divider
        sx={{
          margin: 2,
        }}
      />
      <ProductRelated products={relatedProduct} />
    </>
  );
};

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { SortMenu } from '../../components/SortMenu';
import { useGetProductByCategoryQuery } from '../../redux/slices/productsApiSlice';
import { ProductCard } from './ProductCard';

export const CategoryProducts = () => {
  const { sortBy } = useSelector((state) => state.filter);
  const { slug } = useParams();
  const { data: products = [], isLoading } = useGetProductByCategoryQuery({ slug, sortBy });
  const { state } = useLocation();
  console.log('🚀 ~ CategoryProducts ~ state:', state);
  if (isLoading) return <Loader />;
  if (products.length <= 0) return <Typography>Товары данной категории отсутствуют</Typography>;
  return (
    <>
      <Typography
        variant='h5'
        sx={{
          fontWeight: 'bold',
          mt: 2,
        }}
      >
        {state?.name}
      </Typography>
      <SortMenu sortBy={sortBy} />
      <Grid spacing={3} container sx={{ mb: 3, mt: 3 }}>
        {products.map((p) => (
          <Grid item key={p._id} xs={12} sm={6} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

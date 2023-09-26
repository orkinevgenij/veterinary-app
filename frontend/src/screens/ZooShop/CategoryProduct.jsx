import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useGetProductByCategoryQuery } from '../../redux/slices/productsApiSlice';
import { SortMenu } from '../../components/SortMenu';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';

export const CategoryProducts = () => {
  const { sortBy } = useSelector((state) => state.filter);

  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: products = [], isLoading } = useGetProductByCategoryQuery({ slug, sortBy });
  if (isLoading) return <Loader />;
  if (products.length <= 0) return <Typography>Товары данной категории отсутствуют</Typography>;
  return (
    <>
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

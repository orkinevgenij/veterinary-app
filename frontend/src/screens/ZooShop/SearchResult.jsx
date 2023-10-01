import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';
import { useSearchProductQuery } from '../../redux/slices/productsApiSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { ProductsNotFound } from '../../components/ProductsNotFound';
import { ProductCard } from './ProductCard';

export const SearchResult = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filter);
  const { data: products = [] } = useSearchProductQuery(search);
  console.log('🚀 ~ SearchResult ~ products:', products);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          py: 5,
        }}
      >
        <Box>
          {products.length <= 0 ? (
            <ProductsNotFound />
          ) : (
            <Typography>Найдено товаров: {products?.length}</Typography>
          )}
        </Box>
      </Box>

      <Grid
        xs={10}
        container
        sx={{
          margin: '0px 0px 30px auto',
        }}
        spacing={2}
      >
        {products.map((p) => (
          <Grid key={p._id} item xs={12} sm={6} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

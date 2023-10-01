import React, { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { SortMenu } from '../../components/SortMenu';
import { useFilterProductMutation } from '../../redux/slices/productsApiSlice';
import { setSearch } from '../../redux/slices/filterSlice';
import { ProductCard } from './ProductCard';
import { FilterMenu } from './FilterMenu';

export const ProductList = () => {
  const { checked, priceFrom, priceUp, sortBy, search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterProduct, { data: filteredProduct = [], isLoading, isFetching }] =
    useFilterProductMutation();

  const getFilteredProduct = async () => {
    await filterProduct({ checked, priceFrom, priceUp, sortBy });
  };

  useEffect(() => {
    getFilteredProduct();
  }, [checked, priceFrom, priceUp, sortBy]);
  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FilterMenu />
        <Box>
          <SortMenu />
        </Box>
      </Box>
      <Grid
        container
        xs={10}
        sx={{
          margin: '0px 0px 30px auto',
        }}
        spacing={2}
      >
        {filteredProduct.map((p) => (
          <Grid key={p._id} item xs={12} sm={6} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

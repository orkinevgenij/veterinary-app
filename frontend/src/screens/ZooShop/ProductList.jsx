import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { SortMenu } from '../../components/SortMenu';
import { useFilterProductMutation } from '../../redux/slices/productsApiSlice';
import { FilterMenu } from './FilterMenu';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  const { checked, priceFrom, priceUp, sortBy } = useSelector((state) => state.filter);

  const [filterProduct, { data: filteredProduct = [], isLoading }] = useFilterProductMutation();

  const getFilteredProduct = async () => {
    await filterProduct({ checked, priceFrom, priceUp, sortBy });
  };

  useEffect(() => {
    getFilteredProduct();
  }, [checked, priceFrom, priceUp, sortBy]);
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
        {isLoading ? (
          <Loader />
        ) : (
          filteredProduct.map((p) => (
            <Grid key={p._id} item xs={12} sm={6} md={3}>
              <ProductCard product={p} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

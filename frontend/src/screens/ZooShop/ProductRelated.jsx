import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ProductCard } from './ProductCard';

const ProductRelated = ({ products }) => {
  console.log('🚀 ~ ProductRelated ~ products:', products);
  return (
    <div>
      <Typography variant='h5'>Також вас можуть зацікавити</Typography>

      <Grid
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
    </div>
  );
};

export default ProductRelated;

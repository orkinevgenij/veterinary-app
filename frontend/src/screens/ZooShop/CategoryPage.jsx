import { Card, CardHeader, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../../redux/slices/categoryApiSlice';
import { ProductList } from './ProductList';
import { SortMenu } from '../../components/SortMenu';

const CategoryPage = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetAllCategoryQuery();
  return (
    <>
      <Grid spacing={3} container sx={{ mb: 10, mt: 3 }}>
        {categories?.map((c) => (
          <Grid key={c?._id} item xs={12} sm={6} md={3}>
            <Card
              onClick={() => {
                navigate(`/shop/category-product/${c?.slug}`);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.30s',
                },
                height: '100%',
                width: '100%',
              }}
              align='center'
            >
              <CardHeader title={c?.name} />
            </Card>
          </Grid>
        ))}
      </Grid>
      <ProductList />
    </>
  );
};

export default CategoryPage;

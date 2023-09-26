import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useGetAllOrdersQuery } from '../../redux/slices/orderApiSlice';

export const Orders = () => {
  const { data: orders = [] } = useGetAllOrdersQuery();
  const totalSum = (total) => {
    console.log('🚀 ~ totalSum ~ total:', total.products);
    total.products.map((product) => {
      return product;
    });
  };
  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      {orders.map((o) => (
        <>
          <Typography>{o.buyer.name}</Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Колличество</TableCell>
                </TableRow>
              </TableHead>
              {o.products.map((p) => (
                <TableBody>
                  <TableRow>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>
                      <img src={p.image.url} alt='' width='30px' height='30px' />
                    </TableCell>
                    <TableCell>{p.count}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
          <Typography>Итого:{totalSum(o)}</Typography>
        </>
      ))}
    </Box>
  );
};

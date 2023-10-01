import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useGetOrderQuery } from '../../redux/slices/orderApiSlice';
import { OrderList } from '../../components/OrderList';
import { Loader } from '../../components/Loader';
export const UserOrders = () => {
  const { data: orders = [], isFetching } = useGetOrderQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );
  if (isFetching) return <Loader />;
  return (
    <>
      <Typography
        variant='h6'
        sx={{
          mt: 5,
          fontWeight: 'bold',
        }}
      >
        Мої замовлення
      </Typography>
      {orders.length <= 0 ? (
        <Typography align='center'>Заказов пока нет :(</Typography>
      ) : (
        orders.map((o) => <OrderList orders={o} />)
      )}
    </>
  );
};

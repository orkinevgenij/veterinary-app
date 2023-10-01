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
import { useGetAllOrdersQuery } from '../../redux/slices/orderApiSlice';
import { OrderList } from '../../components/OrderList';

export const AdminOrders = () => {
  const { data: orders = [] } = useGetAllOrdersQuery();

  return (
    <>
      {orders.map((o) => (
        <OrderList orders={o} />
      ))}
    </>
  );
};

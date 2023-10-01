import React, { useEffect, useState } from 'react';
import { MoreHoriz } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../redux/slices/usersApiSlice';
import AdminMenu from './AdminMenu';
import { setPage } from '../../redux/slices/paginateSlice';
import axios from 'axios';
import { Loader } from '../../components/Loader';

const rowNames = ["  Им'я клиента", 'Номер телефону', 'Детальна інформація'];
export const ClientsList = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state?.paginate);
  const { data: users = [], isLoading } = useGetAllUsersQuery(page);

  const handleChange = (value) => {
    console.log(value);
    dispatch(setPage(value));
  };
  useEffect(() => {
    dispatch(setPage(1));
  }, []);
  if (isLoading) return <Loader />;
  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {rowNames.map((name, i) => (
                <TableCell
                  key={i}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'success.main',
                  }}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.docs?.map((user) => (
              <TableRow key={user?._id}>
                <TableCell align='center'>{user?.name}</TableCell>
                <TableCell align='center'>{user?.number}</TableCell>
                <TableCell align='center'>
                  <IconButton component={Link} to={`/admin/user-details/${user?._id}`}>
                    <MoreHoriz color='success' fontSize='large' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <Pagination
          size='large'
          sx={{
            margin: '10px auto  0px ',
          }}
          page={page}
          count={users?.totalPages}
          onChange={handleChange}
          color='success'
        />
      </Stack>
    </Grid>
  );
};

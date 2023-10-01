import { Check } from '@mui/icons-material';
import {
  Box,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/paginateSlice';
import dateFormatter from '../../utils/dateFormatter';
import { useGetAllApointmentsQuery } from '../../redux/slices/apointmentApiSlice';

const table = ["Им'я клиента", 'Номер', 'Опис', 'Тварина', 'Дата', 'Статус'];

export const SuccessApointments = () => {
  const { page } = useSelector((state) => state?.paginate);
  const { data: apointments = [], isLoading } = useGetAllApointmentsQuery(page);
  console.log('🚀 ~ SuccessApointments ~ apointments:', apointments);
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  useEffect(() => {
    dispatch(setPage(1));
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label='simple table'>
          <TableHead>
            <TableRow>
              {table.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    color: 'success.main',
                  }}
                  align='center'
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {apointments?.successApointments?.docs?.map((apointment) => (
              <TableRow key={apointment?._id}>
                <TableCell align='center'>{apointment?.name}</TableCell>
                <TableCell align='center'>{apointment?.number}</TableCell>
                <TableCell align='center'>{apointment?.description}</TableCell>
                <TableCell align='center'>{apointment?.animal}</TableCell>
                <TableCell align='center'>{dateFormatter(apointment?.date)}</TableCell>
                <TableCell align='center'>
                  {apointment?.status && <Check color='success' fontSize='small' />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <Pagination
          defaultPage={Number(1)}
          size='large'
          sx={{
            margin: '10px auto  0px ',
          }}
          page={page}
          count={apointments?.successApointments?.totalPages}
          onChange={handleChange}
          color='success'
        />
      </Stack>
    </Box>
  );
};

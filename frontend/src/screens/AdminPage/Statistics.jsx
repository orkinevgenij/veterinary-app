import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useGetAllUsersQuery } from '../../redux/slices/usersApiSlice';
import { useGetAllApointmentsQuery } from '../../redux/slices/apointmentApiSlice';
import { Loader } from '../../components/Loader';
import GraphData from '../../components/GraphData';
const rowsName = ['Найменування', 'Кількість'];
export const Statistics = () => {
  const { data: users = [], isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const { data: apointments = [], isLoading: isLoadingApointments } = useGetAllApointmentsQuery();
  function createData(title, count) {
    return { title, count };
  }
  const rows = [
    createData('Кількість користувачів', users?.totalDocs),
    createData('Кількість записів на прийом', apointments?.apointments?.totalDocs),
    createData('Кількість завершених прийомів', apointments?.successApointments?.totalDocs),
  ];
  if (isLoadingUsers) return <Loader />;
  return (
    <Box
      sx={{
        width: '100%',
        mt: 5,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          mb: 5,
        }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {rowsName.map((name) => (
                <TableCell
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
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell align='center'>{row?.title}</TableCell>
                <TableCell align='center'>{row?.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <GraphData
        apointment={apointments?.apointments?.totalDocs}
        apointmentSuccess={apointments?.successApointments?.totalDocs}
      />
    </Box>
  );
};

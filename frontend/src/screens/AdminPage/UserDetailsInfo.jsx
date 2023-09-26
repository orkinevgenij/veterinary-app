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
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../redux/slices/usersApiSlice';
import dateFormatter from '../../utils/dateFormatter';
export const UserDetailsInfo = () => {
  const { userId } = useParams();
  console.log('🚀 ~ UserDetailsInfo ~ userId:', userId);
  const { data: users = [], isLoading } = useGetUserDetailsQuery(userId);
  console.log('🚀 ~ UserDetailsInfo ~ users:', users);
  const table = ["Им'я клиента", 'Номер', 'Опис', 'Тварина', 'Бажана дата', 'Статус'];
  if (users.length <= 0)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '0px auto',
        }}
      >
        <Typography variant='h5'>У вас пока нет записей на приём</Typography>
      </Box>
    );
  return (
    <>
      <Stack>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 3,
          }}
        >
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                {table.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: 'bold',
                    }}
                    align='center'
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((apointment) => (
                <TableRow key={apointment?._id}>
                  <TableCell align='center'>{apointment?.name}</TableCell>
                  <TableCell align='center'>{apointment?.number}</TableCell>
                  <TableCell align='center'>{apointment?.description}</TableCell>
                  <TableCell align='center'>{apointment?.animal}</TableCell>
                  <TableCell align='center'>{dateFormatter(apointment?.date)}</TableCell>
                  <TableCell align='center'>
                    {apointment?.status ? (
                      <Typography color='gainsboro' align='center'>
                        Завершен
                      </Typography>
                    ) : (
                      <Typography>В процессе</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

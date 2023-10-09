import { Delete, MedicalServices } from '@mui/icons-material';
import {
  Box,
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllApointmentsQuery,
  useRemoveApointmentMutation,
} from '../../redux/slices/apointmentApiSlice';
import { setPage } from '../../redux/slices/paginateSlice';
import dateFormatter from '../../utils/dateFormatter';
import AdminMenu from './AdminMenu';
import { Loader } from '../../components/Loader';

const table = ["Им'я клиента", 'Номер', 'Опис', 'Тварина', 'Бажана дата', 'Статус'];
export const ApointmentsList = () => {
  const { page } = useSelector((state) => state?.paginate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteApointment] = useRemoveApointmentMutation();
  const { data: apointments = [], isLoading } = useGetAllApointmentsQuery(page, {
    // pollingInterval: 5000,
  });

  const handleRemoveApointment = async (id) => {
    if (window.confirm('Вы действительно хотите удалить')) {
      await deleteApointment({ id }).unwrap();
    }
  };
  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  useEffect(() => {
    dispatch(setPage(1));
  }, []);
  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
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
            {apointments &&
              apointments?.apointments?.docs?.map((apointment) => (
                <TableRow key={apointment?._id}>
                  <TableCell align='center'>{apointment?.name}</TableCell>
                  <TableCell align='center'>{apointment?.number}</TableCell>
                  <TableCell align='center'>{apointment?.description}</TableCell>
                  <TableCell align='center'>{apointment?.animal}</TableCell>
                  <TableCell align='center'>{dateFormatter(apointment?.date)}</TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {apointment?.status ? (
                      <Typography align='center' color='gainsboro'>
                        Завершен
                      </Typography>
                    ) : (
                      <Stack sx={{ flexDirection: 'row' }}>
                        <IconButton
                          title='Видалити'
                          onClick={() => handleRemoveApointment(apointment?._id)}
                        >
                          <Delete color='success' fontSize='small' />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            navigate('/admin/prescribing', { state: { apointment } });
                          }}
                          title='Зробити призначення'
                        >
                          <MedicalServices color='success' fontSize='small' />
                        </IconButton>
                      </Stack>
                    )}
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
          count={apointments?.apointments?.totalPages}
          onChange={handleChange}
          color='success'
        />
      </Stack>
    </Box>
  );
};

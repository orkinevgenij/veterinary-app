import { CalendarMonth, Check, Delete, Edit, Email, MoreHoriz, Phone } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
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
import Pagination from '@mui/material/Pagination';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import {
  useGetUserApointmentQuery,
  useRemoveApointmentMutation,
} from '../redux/slices/apointmentApiSlice';
import { setPage } from '../redux/slices/paginateSlice';
import { useGetMeQuery } from '../redux/slices/usersApiSlice';
import dateFormatter from '../utils/dateFormatter';

const table = ['Имя клиента', 'Номер', 'Описание', 'Животное', 'Желаемая дата', 'Статус'];

export const Profile = () => {
  const { page } = useSelector((state) => state?.paginate);
  const { data: profile = [], isFetching } = useGetMeQuery([], {
    refetchOnMountOrArgChange: true,
  });

  const { data: apointments = [] } = useGetUserApointmentQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteApointment] = useRemoveApointmentMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveApointment = async (id) => {
    if (window.confirm('Вы действительно хотите отменить запись на приём?')) {
      await deleteApointment({ id }).unwrap();
    }
  };

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  if (isFetching) return <Loader />;

  return (
    <>
      <Stack
        sx={{
          marginBottom: 3,
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
            margin: 'auto',
            height: 'max-content',
            padding: '10px',
          }}
        >
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'success.light' }}>
            {profile?.name?.substr(0, 2)}
          </Avatar>
          <Typography variant='h6' gutterBottom>
            {profile?.name}
          </Typography>
          <Stack
            variant='subtitle1'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Email color='success' />
            <Typography variant='body2'> {profile?.email}</Typography>
          </Stack>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Phone color='success' />
            <Typography variant='body2'>{profile?.number}</Typography>
          </Stack>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CalendarMonth color='success' />
            <Typography variant='body2'>{dateFormatter(profile?.createdAt)}</Typography>
          </Stack>
          <Button
            color='success'
            onClick={() =>
              navigate('/profile-update', {
                state: { profile },
              })
            }
            endIcon={<Edit />}
          >
            Редагувати
          </Button>
        </Paper>
      </Stack>
      <Typography
        variant='h5'
        sx={{
          marginBottom: '30px',
        }}
      >
        Мої прийоми до лікаря
      </Typography>

      {isFetching ? (
        <Stack sx={{ display: 'flex', alignItems: 'center' }}>
          <Loader />
        </Stack>
      ) : (
        <Grid>
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
                {apointments?.docs &&
                  apointments?.docs?.map((apointment) => (
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
                        <Stack>
                          {apointment?.status ? (
                            <Stack
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Check color='success' align='center' fontSize='large' />
                              <IconButton
                                onClick={() => {
                                  navigate('/apointment-details', { state: { apointment } });
                                }}
                                title='Детальніше'
                              >
                                <MoreHoriz color='success' fontSize='large' />
                              </IconButton>
                            </Stack>
                          ) : (
                            <Stack
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Typography color='success'>В процесі</Typography>
                              <IconButton
                                title='Видалити'
                                color='success'
                                onClick={() => handleRemoveApointment(apointment?._id)}
                              >
                                <Delete fontSize='small' />
                              </IconButton>
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      <Stack>
        <Pagination
          size='large'
          sx={{
            margin: '10px auto  10px ',
          }}
          page={page}
          count={apointments?.totalPages}
          onChange={handleChange}
          color='success'
        />
      </Stack>
    </>
  );
};

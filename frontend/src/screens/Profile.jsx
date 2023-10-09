import { Check, Delete, Edit, MoreHoriz } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import {
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
  Typography
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

const table = ["Ім'я", 'Номер', 'Опис', 'Тварина', 'Бажана дата', 'Статус'];

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
      <Grid
        component={Paper}
        spacing={2}
        container
        sx={{
          margin: '10px auto 10px',
          padding: '10px',
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          gap={2}
          sx={{
            display: 'flex',
          }}
        >
          <PersonIcon />
          <Typography>Особисті дані</Typography>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='caption' color='GrayText'>
            Ім'я
          </Typography>
          <Typography variant='caption' gutterBottom>
            {profile?.name}
          </Typography>
        </Grid>

        <Grid
          item
          sm={3}
          variant='subtitle1'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='caption' color='GrayText'>
            Email
          </Typography>
          <Typography variant='caption'> {profile?.email}</Typography>
        </Grid>

        <Grid
          item
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='caption' color='GrayText'>
            Телефон
          </Typography>
          <Typography variant='caption'>{profile?.number}</Typography>
        </Grid>

        <Grid
          item
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='caption' color='GrayText'>
            Дата реєстрації
          </Typography>
          <Typography
            variant='caption'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {dateFormatter(profile?.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            color='success'
            variant='contained'
            size='small'
            sx={{
              flexGrow: 1,
            }}
            onClick={() =>
              navigate('/profile-update', {
                state: { profile },
              })
            }
            endIcon={<Edit />}
          >
            Редагувати
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant='h5'
        sx={{
          marginBottom: '30px',
        }}
      >
        Мої прийоми до лікаря
      </Typography>

      {isFetching ? (
        <Stack sx={{ alignItems: 'center' }}>
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

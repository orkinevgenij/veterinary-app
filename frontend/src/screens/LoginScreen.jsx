import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
const formSchema = Yup.object({
  email: Yup.string().required('Введіть ваш E-mail'),
  password: Yup.string().required('Введіть ваш пароль'),
});

export const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation([]);
  const { userInfo } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      email: 'orkinevgenij@gmail.com',
      password: '12345',
    },
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast.success('Вы вошли в свой личный кабинет');
      } catch (error) {
        toast.error(error?.data?.msg);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <Stack component='form' onSubmit={formik.handleSubmit}>
      <Paper
        component={Stack}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          margin: '20px auto',
        }}
      >
        <Typography variant='h6' color='success.main'>
          Логін
        </Typography>
        <Lock color='success' />
        <TextField
          type='email'
          placeholder='E-mail'
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          margin='normal'
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.email && formik.errors.email}
        </Typography>
        <TextField
          type='password'
          placeholder='Пароль'
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          margin='normal'
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.password && formik.errors.password}
        </Typography>
        <Stack>
          <LoadingButton
            type='submit'
            variant='contained'
            color='success'
            loading={isLoading}
            size='large'
          >
            Логин
          </LoadingButton>
        </Stack>
        <Typography>
          У вас ще немає аккаунта?
          <Link to='/register'>
            <Typography
              component='span'
              sx={{
                color: 'success.main',
                pl: '3px',
              }}
            >
              Реєстрація
            </Typography>
          </Link>
        </Typography>
      </Paper>
    </Stack>
  );
};

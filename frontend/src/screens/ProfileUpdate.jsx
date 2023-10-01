import { Edit } from '@mui/icons-material';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Loader } from '../components/Loader';
import { setCredentials } from '../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../redux/slices/usersApiSlice';

const formSchema = Yup.object({
  name: Yup.string().required("Введіть ваше И'мя"),
  email: Yup.string().required('Вкажіть ваш E-mail'),
  number: Yup.string().required('Вкажіть ваш Номер'),
});

export const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state?.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const formik = useFormik({
    initialValues: {
      name: state?.profile?.name,
      email: state?.profile?.email,
      number: state?.profile?.number,
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error('Паролі не збігаються');
      } else {
        try {
          const data = {
            ...values,
          };
          const res = await updateProfile(data).unwrap();
          dispatch(
            setCredentials({
              ...res,
              token: userInfo?.token,
            }),
          );
          toast.success('Профіль оновлено');

          navigate('/profile');
        } catch (error) {
          toast.error(err?.data?.message || err.error);
        }
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div>
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
          <Typography variant='h6'>Редагувати</Typography>
          <Edit color='success' />
          <TextField
            placeholder="Им'я"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            margin='normal'
          />
          <Typography variant='subtitle2' color='#9C27B0'>
            {formik.touched.name && formik.errors.name}
          </Typography>
          <TextField
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
            placeholder='Номер телефона'
            value={formik.values.number}
            onChange={formik.handleChange('number')}
            onBlur={formik.handleBlur('number')}
            margin='normal'
          />
          <Typography variant='subtitle2' color='#9C27B0'>
            {formik.touched.number && formik.errors.number}
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
          <TextField
            type='password'
            placeholder='Підтвердіть пароль'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            margin='normal'
          />
          <Typography variant='subtitle2' color='#9C27B0'>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </Typography>
          {isLoading && <Loader />}
          <Stack
            sx={{
              display: 'flex',
            }}
          >
            <Button
              type='submit'
              variant='contained'
              color='success'
              sx={{
                display: 'block',
              }}
            >
              Сохранить
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
};

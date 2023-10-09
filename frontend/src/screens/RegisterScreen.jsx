import { HowToReg } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Loader } from '../components/Loader';
import { setCredentials } from '../redux/slices/authSlice';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
const formSchema = Yup.object({
  name: Yup.string().required("Введіть ваше И'мя"),
  email: Yup.string().required('Введіть ваш E-mail'),
  number: Yup.string().required('Вкажіть ваш Номер'),
  password: Yup.string().required('Введіть ваш Пароль'),
  confirmPassword: Yup.string().required('Підтвердіть ваш Пароль'),
});

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state?.auth);
  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error('Паролі не збігається');
      } else {
        try {
          const res = await register(values).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
        } catch (error) {
          toast.error(error?.data?.msg);
        }
      }
    },
    validationSchema: formSchema,
  });

  return (
    <Stack component='form' onSubmit={formik.handleSubmit}>
      <Paper
        component={Stack}
        sx={{
          alignItems: 'center',
          padding: '20px',
          margin: '20px auto',
        }}
      >
        <Typography variant='h6' color='success.main'>
          Реєстрація
        </Typography>
        <Typography variant='subtitle2' color='success.main'>
          {error?.data?.msg}
        </Typography>
        <HowToReg color='success' />
        <TextField
          placeholder="Им'я"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='secondary.main'>
          {formik.touched.name && formik.errors.name}
        </Typography>

        <TextField
          placeholder='E-mail'
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='secondary.main'>
          {formik.touched.email && formik.errors.email}
        </Typography>

        <PhoneInput
          value={formik.values.number}
          onChange={formik.handleChange('number')}
          onBlur={formik.handleBlur('number')}
          country={'ua'}
          onlyCountries={['ua']}
          preferredCountries={['ua']}
          disableDropdown
          countryCodeEditable={false}
          specialLabel=''
          inputStyle={{
            width: '100%',
            height: '56px',
          }}
        />
        <Typography variant='subtitle2' color='secondary.main'>
          {formik.touched.number && formik.errors.number}
        </Typography>

        <TextField
          type='password'
          placeholder='Пароль'
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='secondary.main'>
          {formik.touched.password && formik.errors.password}
        </Typography>

        <TextField
          type='password'
          placeholder='Повторіть пароль'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='secondary.main'>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </Typography>

        {isLoading && <Loader />}
        <Stack>
          <LoadingButton
            type='submit'
            variant='contained'
            color='success'
            loading={isLoading}
            size='large'
          >
            Реєстрація
          </LoadingButton>
          <Typography>
            У вас вже є аккаунт?
            <Link to='/login'>
              <Typography
                component='span'
                sx={{
                  color: 'success.main',
                  pl: '3px',
                }}
              >
                Логін
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Loader } from '../../components/Loader';
import { useCreateUserMutation } from '../../redux/slices/usersApiSlice';
const formSchema = Yup.object({
  name: Yup.string().required("Введіть ім'я користувача"),
  email: Yup.string().required('Введите E-mail користувача'),
  number: Yup.string().required('Вкажіть номер користувача'),
  password: Yup.string().required('Введіть пароль користувача'),
  confirmPassword: Yup.string().required('Підтвердіть пароль користувача'),
  userStatus: Yup.boolean().required('Вкажіть статус, користувач/адмін'),
});

export const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '',
      userStatus: '',
    },
    onSubmit: async (values) => {
      if (values?.password !== values?.confirmPassword) {
        toast.error('Пароль не збігається');
      } else {
        try {
          await createUser(values).unwrap();
          toast.success('Створен новий користувач');
        } catch (error) {
          toast.error(err?.data?.message || err.error);
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
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant='h6' color='success.main'>
          Створити користувача
        </Typography>
        <TextField
          placeholder="Им'я"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          margin='normal'
          fullWidth
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
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
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
          fullWidth
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
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </Typography>
        <RadioGroup
          name='user-status-group'
          aria-labelledby='user-status-group-label'
          onChange={formik.handleChange('userStatus')}
          onBlur={formik.handleBlur('userStatus')}
        >
          <FormControlLabel control={<Radio color='success' />} label='Кліент' value='false' />
          <FormControlLabel control={<Radio color='success' />} label='Адмін/доктор' value='true' />
        </RadioGroup>
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.userStatus && formik.errors.userStatus}
        </Typography>
        {isLoading && <Loader />}
        <Stack>
          <Button
            type='submit'
            variant='contained'
            color='success'
            sx={{
              display: 'block',
            }}
          >
            Створити
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

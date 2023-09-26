import { LocalHospital } from '@mui/icons-material';
import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import 'react-phone-input-2/lib/style.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Loader } from '../components/Loader';
import { useCreateApointmentMutation } from '../redux/slices/apointmentApiSlice';
const formSchema = Yup.object({
  name: Yup.string().required("Введіть ваше И'мя"),
  number: Yup.string().required('Вкажіть ваш Номер'),
  date: Yup.string().required('Вкажіть бажану дату'),
  animal: Yup.string().required('Вкажіть вид тварини'),
  description: Yup.string().required('Вкажіть вашу проблему'),
});

const options = [
  {
    label: 'Кот/кішка',
    value: 'Кот/кішка',
  },
  {
    label: 'Собака',
    value: 'Собака',
  },
  {
    label: 'Птиця',
    value: 'Птиця',
  },
  {
    label: 'Xомяк',
    value: 'Xомяк',
  },
  {
    label: 'Пацюк',
    value: 'Пацюк',
  },
  {
    label: 'Харек',
    value: 'Харек',
  },

  {
    label: 'Інше',
    value: 'Інше',
  },
];

export const AppointmentDoctor = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state?.auth);
  const [createApointment, { isLoading, error }] = useCreateApointmentMutation();

  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      number: '',
      date: '',
      animal: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        await createApointment(values).unwrap();
        toast.success('Записані на прийом!');
        navigate('/profile');
      } catch (error) {
        console.log(error);
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
          textAlign: 'center',
          padding: '20px',
          width: '50%',
          height: 'max-content',
          margin: '20px auto',
        }}
      >
        <Typography variant='h4'>Запис до лікаря</Typography>
        <Typography color='#9C27B0'>{error?.data?.message}</Typography>
        <LocalHospital color='success' />
        <TextField
          placeholder="Ваше им'я"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          margin='normal'
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.name && formik.errors.name}
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
          type='date'
          value={formik.values.date}
          onChange={formik.handleChange('date')}
          onBlur={formik.handleBlur('date')}
          margin='dense'
          fullWidth
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.date && formik.errors.date}
        </Typography>
        <TextField
          onChange={formik.handleChange('animal')}
          onBlur={formik.handleBlur('animal')}
          select
          label='Вид тварини'
          margin='dense'
          fullWidth
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.animal && formik.errors.animal}
        </Typography>
        <TextField
          placeholder='Коротко опишіть проблему'
          multiline
          fullWidth
          rows={5}
          margin='normal'
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
        />
        <Typography variant='subtitle2' color='#9C27B0'>
          {formik.touched.description && formik.errors.description}
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
            Записатись
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

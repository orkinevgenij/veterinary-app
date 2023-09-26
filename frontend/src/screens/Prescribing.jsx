import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateApointmentMutation } from '../redux/slices/apointmentApiSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formSchema = Yup.object({
  prescribing: Yup.string().required('Зробить призначення'),
});

export const Prescribing = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apointment = state.apointment;
  const [createPrescribing] = useUpdateApointmentMutation();

  const formik = useFormik({
    initialValues: {
      prescribing: '',
    },
    onSubmit: async (values) => {
      try {
        const data = {
          id: apointment._id,
          prescribing: values.prescribing,
          status: true,
        };
        await createPrescribing(data).unwrap();
        navigate('/admin/apointments');
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <Stack
      component='form'
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
      }}
    >
      <Typography align='center' variant='h5'>
        Призначення лікаря
      </Typography>
      <Typography>Имя: {apointment.name}</Typography>
      <Typography>Животное: {apointment.animal}</Typography>
      <Typography>Телефон: {apointment.number}</Typography>
      <Typography>Описание жалобы: {apointment.description}</Typography>
      <TextField
        multiline
        rows={10}
        placeholder='Сделать назначение'
        onChange={formik.handleChange('prescribing')}
        onBlur={formik.handleBlur('prescribing')}
      />
      <Typography textAlign='center' variant='subtitle2' color='secondary'>
        {formik.touched.prescribing && formik.errors.prescribing}
      </Typography>
      <Button type='submit' variant='contained' color='success'>
        Завершить прием
      </Button>
    </Stack>
  );
};

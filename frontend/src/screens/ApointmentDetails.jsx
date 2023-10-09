import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const ApointmentDetails = () => {
  const { state } = useLocation();
  const apointment = state.apointment;
  console.log(apointment);
  return (
    <Stack>
      <Typography align='center' variant='h6'>
        Детальніше
      </Typography>
      <Typography>Имя: {apointment.name}</Typography>
      <Typography>Животное: {apointment.animal}</Typography>
      <Typography>Телефон: {apointment.number}</Typography>
      <Typography>Описание жалобы: {apointment.description}</Typography>
      <Typography align='center' variant='h6'>
        Призначення лікаря
      </Typography>
      <Typography>{apointment.prescribing}</Typography>
    </Stack>
  );
};

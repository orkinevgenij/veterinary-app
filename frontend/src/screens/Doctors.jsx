import React from 'react';

import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
export const Doctors = () => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, marginTop: '10px' }}>
      <CardMedia component='img' height='200' image='/images/doctors/Sutirina.jpg' alt='Sutirina' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='span'>
          Александра Сутиріна
        </Typography>
        <Typography variant='body2' color='text.success'>
          Лікар ветеринар з багаторічним досвідом. Чекаємо на вас на прийом
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          size='small'
          color='success'
          variant='contained'
          onClick={() => {
            navigate('/apointment');
          }}
        >
          Записаться
        </Button>
      </CardActions>
    </Card>
  );
};

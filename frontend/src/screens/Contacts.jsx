import { AccessAlarm, LocationOn, Phone } from '@mui/icons-material';
import { Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
export const Contacts = () => {
  return (
    <>
      <Typography align='center' variant='h5'>
        Контакти лікарні
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
            }}
          >
            <Phone color='success' />
            <Divider />
            <Typography>Контакты</Typography>
            <Typography>(050) 858-57-00</Typography>
            <Typography>(063) 345-12-11</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
            }}
          >
            <LocationOn color='success' />
            <Divider />
            <Typography>Адреса</Typography>
            <Typography>м. Дніпро</Typography>
            <Typography>проспект О. Поля</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
            }}
          >
            <AccessAlarm color='success' />
            <Divider />
            <Typography>Графік роботи</Typography>
            <Typography>10:00 - 19:00</Typography>
            <Typography>сб-вс: выходной</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

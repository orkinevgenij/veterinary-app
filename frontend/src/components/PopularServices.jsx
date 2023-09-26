import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

export const PopularServices = () => {
  return (
    <Grid
      sx={{
        marginBottom: 4,
      }}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='200'
              image='/images/services/uzi.jpg'
              alt='Sutirina'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='span'>
                УЗИ
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                безболезненная, безопасная и высокоточная и диагностика патологий внутренних органов
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='200'
              image='/images/services/rentgen.jpg'
              alt='Sutirina'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='span'>
                Рентген
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                безопасная и высокоточная диагностика патологий внутренних органов
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='200'
              image='/images/services/hirurg.jpg'
              alt='Sutirina'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='span'>
                Хирургия
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                операции различной сложности в оборудованной стерильной операционной под контролем
                кардиомонитора{' '}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='200'
              image='/images/services/sobaka2.jpg'
              alt='Sutirina'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='span'>
                Кардиология
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                безболезненная, безопасная и высокоточная и диагностика патологий внутренних органов
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

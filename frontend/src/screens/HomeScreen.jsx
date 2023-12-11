import { Face, Medication, Pets, Science, Vaccines, WbIncandescent } from '@mui/icons-material';
import { CardActionArea, Grid, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { PopularServices } from '../components/PopularServices';
export const HomeScreen = () => {
  return (
    <>
      <Typography
        gutterBottom
        sx={{
          textAlign: 'center',
          marginTop: 3,
          marginBottom: 3,
        }}
        variant='h5'
      >
        ЕКСПЕРТ З ЗДОРОВ'Я ДОМАШНІХ ТВАРИН
      </Typography>
      <Stack
        sx={{
          display: 'inline-flex',
          border: '1px red solid',
          marginBottom: 5,
        }}
      >
        <Typography>Данные входа для админа:</Typography>
        <Typography>login: admin@gmail.com</Typography>
        <Typography>password: 12345</Typography>
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <Pets color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  ВЕТКЛІНІКА "КОТЯ"
                </Typography>
                <Typography variant='body2' color='text.success'>
                  Одна з найуспішніших приватних клінік Дніпра{' '}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <Face color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  НАШІ ЛІКАРІ{' '}
                </Typography>
                <Typography variant='body2' color='text.success'>
                  команда професіоналів, об'єднаних прагненням допомогти кожній тварині
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <WbIncandescent color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  ПРИНЦИП РОБОТИ
                </Typography>
                <Typography variant='body2' color='text.success'>
                  залучення в команду професіоналів та впровадження сучасних методів лікування
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <Medication color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  ОСНАЩЕННЯ КЛІНІКИ
                </Typography>
                <Typography variant='body2' color='text.success'>
                  відповідає останнім стандартам ветеринарії та дозволяє швидко поставити на ноги
                  чотирилапого пацієнта
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <Vaccines color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  ПРЕПАРАТИ І ВАКЦІНИ
                </Typography>
                <Typography variant='body2' color='text.success'>
                  високоякісна сертифікована продукція, перевірена часом та лікарями клініки
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea>
              <Science color='success' />
              <CardContent>
                <Typography gutterBottom variant='body1' component='span'>
                  ЛАБОРАТОРІЯ
                </Typography>
                <Typography variant='body2' color='text.success'>
                  гарантує точність, грамотність, оперативність проведення досліджень
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: 3,
          marginBottom: 3,
        }}
        variant='h5'
      >
        ПОПУЛЯРНІ ПОСЛУГИ
      </Typography>
      <PopularServices />
    </>
  );
};

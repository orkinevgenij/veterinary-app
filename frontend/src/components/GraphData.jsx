import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';

const GraphData = ({ apointment, apointmentSuccess }) => {
  const data = {
    labels: ['Записи на приём', 'Завершенные приёмы'],
    datasets: [
      {
        label: ['Статистика приёмов'],
        data: [apointment, apointmentSuccess],
        backgroundColor: ['rgb(230, 102, 52)', 'rgb(24, 186, 18)'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <Box
      sx={{
        width: '300px',
        height: '300px',
        margin: '0px auto',
      }}
    >
      <Pie options={{ maintainAspectRatio: false }} data={data} />
    </Box>
  );
};

export default GraphData;

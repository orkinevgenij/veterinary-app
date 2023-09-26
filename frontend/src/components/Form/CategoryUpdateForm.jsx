import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const CategoryUpdateForm = ({ selectedCategory, handleUpdate, updateLoading }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(selectedCategory.name);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          mb: 3,
        }}
      >
        Изменить категорию
      </Typography>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          mb: 5,
        }}
      />
      <Button
        variant='contained'
        color='success'
        onClick={() => handleUpdate(name, selectedCategory?._id)}
      >
        {updateLoading ? 'Сохранение...' : 'Изменить'}
      </Button>
    </Box>
  );
};

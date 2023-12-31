import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCategoryQuery } from '../../redux/slices/categoryApiSlice';
import {
  removeChecked,
  setChecked,
  setPriceFrom,
  setPriceUp,
} from '../../redux/slices/filterSlice';
import CloseIcon from '@mui/icons-material/Close';
export const FilterMenu = () => {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { checked, priceFrom, priceUp } = useSelector((state) => state.filter);
  const { data: category = [] } = useGetAllCategoryQuery();

  let allChecked = [...checked];

  const handleFilter = (value, id) => {
    if (value) {
      allChecked.push(id);
    } else {
      allChecked = allChecked.filter((c) => c !== id);
    }
    dispatch(setChecked(allChecked));
  };
  return (
    <>
      <Button
        variant='contained'
        color='success'
        onClick={() => setIsFilterOpen(true)}
        startIcon={<MenuIcon />}
        sx={{
          mb: 3,
        }}
      >
        Фильтр
      </Button>

      <Drawer
        transitionDuration={500}
        anchor='left'
        p={2}
        width='250px'
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <Box p={3} width='280px' textAlign='center' role='presentation'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Button startIcon={<ArrowBackIcon />} onClick={() => setIsFilterOpen(false)}>
              <Typography>Фільтри</Typography>
            </Button>
            <Button
              variant='contained'
              size='small'
              sx={{
                background: 'red',
                borderRadius: '15px',
              }}
              onClick={() => location.reload()}
            >
              Скасувати
            </Button>
          </Box>
          <Divider light />
          {checked.length > 0 && (
            <Typography
              sx={{
                mt: '10px',
                mb: '10px',
              }}
            >
              Вибрані фільтры:
            </Typography>
          )}
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {checked.map((c) => (
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'grey.500',
                  borderRadius: '20px',
                  padding: '5px',
                  flex: 1,
                }}
              >
                <Typography variant='caption' color='grey.500'>
                  {c.name}
                </Typography>
                <IconButton onClick={() => dispatch(removeChecked(c._id))}>
                  <CloseIcon color='success' fontSize='small' />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box
          sx={{
            flexDirection: 'column',
            p: 3,
          }}
        >
          <Box>
            <TextField
              value={priceFrom}
              label='от'
              sx={{ width: '100px', mr: '15px' }}
              onChange={(e) => dispatch(setPriceFrom(e.target.value))}
            />
            <TextField
              value={priceUp}
              label='до'
              sx={{ width: '100px' }}
              onChange={(e) => dispatch(setPriceUp(e.target.value))}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}
        >
          {category.map((c, i) => (
            <FormControlLabel
              checked={checked.includes(c)}
              key={c._id}
              control={<Checkbox onChange={(e) => handleFilter(e.target.checked, c)} />}
              label={c.name}
            />
          ))}
        </Box>
        <Divider light />
      </Drawer>
    </>
  );
};

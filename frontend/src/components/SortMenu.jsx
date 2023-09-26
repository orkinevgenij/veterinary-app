import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

export const SortMenu = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.filter);

  return (
    <Select
      size='small'
      onChange={(e) => {
        dispatch(setSort(e.target.value));
      }}
      select
      placeholder='Enter Car Brand'
      value={sortBy}
      sx={{
        mt: 5,
      }}
    >
      <MenuItem value='1'>От дешевых к дорогим</MenuItem>
      <MenuItem value='-1'>От дорогих к дешевым</MenuItem>
    </Select>
  );
};

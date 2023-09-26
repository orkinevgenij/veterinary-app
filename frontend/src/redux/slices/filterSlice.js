import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checked: [],
  radio: '',
  priceFrom: 0,
  priceUp: 999999,
  sortBy: '1',
  search: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setPriceFrom: (state, action) => {
      state.priceFrom = action.payload;
    },
    setPriceUp: (state, action) => {
      state.priceUp = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setChecked, setPriceFrom, setPriceUp, setSort, setSearch } = filterSlice.actions;
export default filterSlice.reducer;

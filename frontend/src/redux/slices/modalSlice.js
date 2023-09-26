import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = !state.open;
    },
  },
});

export const { setOpen } = modalSlice.actions;
export default modalSlice.reducer;

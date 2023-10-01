import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  isDrawerOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setOpenDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { setOpenModal, setOpenDrawer } = modalSlice.actions;
export default modalSlice.reducer;

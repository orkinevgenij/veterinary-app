import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import paginateSlice from './slices/paginateSlice';
import cartSlice from './slices/cartSlice';
import modalSlice from './slices/modalSlice';
import filterSlice from './slices/filterSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    paginate: paginateSlice,
    cart: cartSlice,
    modal: modalSlice,
    filter: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  totalPrice: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0)
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      const findItem = state.cartItems.find((obj) => obj.id === payload?.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...payload, count: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state?.cartItems));
      state.totalPrice = JSON.parse(localStorage.getItem('cart')).reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== payload.id);

      localStorage.setItem('cart', JSON.stringify(state?.cartItems));

      state.totalPrice = JSON.parse(localStorage.getItem('cart')).reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalPrice = [];
      localStorage.removeItem('cart');
    },

    countMinus: (state, { payload }) => {
      const findItem = state.cartItems.find((obj) => obj.id === payload?.id);
      if (findItem) {
        findItem.count--;
      }
      localStorage.setItem('cart', JSON.stringify(state?.cartItems));

      state.totalPrice = JSON.parse(localStorage.getItem('cart')).reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addCartItem, clearCart, removeItem, countMinus } = cartSlice.actions;
export default cartSlice.reducer;

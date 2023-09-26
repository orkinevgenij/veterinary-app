import { apiSlice } from './apiSlice';

const ORDER_URL = 'https://veterinary-app.onrender.com/api/order';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => `${ORDER_URL}/get-orders`,
      providesTags: ['Order'],
    }),
    getAllOrders: builder.query({
      query: () => `${ORDER_URL}//get-allorders`,
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation({
      query: (cartItems) => ({
        url: `${ORDER_URL}/create-order`,
        method: 'POST',
        body: cartItems,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetOrderQuery, useCreateOrderMutation, useGetAllOrdersQuery } = orderApiSlice;

import { apiSlice } from './apiSlice';

const APOINTMENS_URL = 'https://veterinary-app.onrender.com/api/apointments';

export const apointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllApointments: builder.query({
      query: (page) => `${APOINTMENS_URL}?page=${page}`,
      providesTags: ['Apointment'],
    }),

    getUserApointment: builder.query({
      query: (page) => `${APOINTMENS_URL}/myapointments?page=${page}`,
      providesTags: ['Apointment'],
    }),
    createApointment: builder.mutation({
      query: (data) => ({
        url: `${APOINTMENS_URL}/apointment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Apointment'],
    }),
    updateApointment: builder.mutation({
      query: (data) => ({
        url: `${APOINTMENS_URL}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Apointment'],
    }),
    removeApointment: builder.mutation({
      query: (data) => ({
        url: `${APOINTMENS_URL}/remove`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Apointment', 'User'],
    }),
  }),
});

export const {
  useGetAllApointmentsQuery,
  useCreateApointmentMutation,
  useUpdateApointmentMutation,
  useRemoveApointmentMutation,
  useGetUserApointmentQuery,
} = apointmentApiSlice;

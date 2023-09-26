import { apiSlice } from './apiSlice';

const USERS_URL = 'https://veterinary-app.onrender.com/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `${USERS_URL}/profile`,
      providesTags: ['User'],
    }),
    getAllUsers: builder.query({
      query: (page) => `${USERS_URL}/allusers?page=${page}`,
      providesTags: ['User'],
    }),
    getUserDetails: builder.query({
      query: (userId) => `${USERS_URL}/get-userdetails/${userId}`,
      providesTags: ['User'],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createuser`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;

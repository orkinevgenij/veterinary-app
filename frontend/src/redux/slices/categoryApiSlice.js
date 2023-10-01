import { apiSlice } from './apiSlice';

const CATEGORY_URL = 'https://veterinary-app.onrender.com/api/category';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/${CATEGORY_URL}/get-category`,
      providesTags: ['Category'],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `/${CATEGORY_URL}/create-category`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ name, cid }) => ({
        url: `/${CATEGORY_URL}/update-category/${cid}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Category'],
    }),
    removeCategory: builder.mutation({
      query: (cid) => ({
        url: `/${CATEGORY_URL}/remove-category/${cid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useRemoveCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;

import { apiSlice } from './apiSlice';

const PRODUCT_URL = 'api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/${PRODUCT_URL}`,
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `/${PRODUCT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getProductByCategory: builder.query({
      query: ({ slug, sortBy }) => `/${PRODUCT_URL}/products-category/${slug}?sortBy=${sortBy}`,
      invalidatesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (slug) => `/${PRODUCT_URL}/product-details/${slug}`,
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, title, price, description, category, image }) => ({
        url: `/${PRODUCT_URL}/product-update/${_id}`,
        method: 'PUT',
        body: { _id, title, price, description, category, image },
      }),
      invalidatesTags: ['Product'],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/${PRODUCT_URL}/product-delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    filterProduct: builder.mutation({
      query: (data) => ({
        url: `/${PRODUCT_URL}/product-filters?sortBy=${data.sortBy}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    searchProduct: builder.query({
      query: (keyword) => `/${PRODUCT_URL}/search-products/${keyword}`,
      providesTags: ['Product'],
    }),
    relatedProduct: builder.query({
      query: ({ cid, pid }) => `/${PRODUCT_URL}/related-product/${pid}/${cid}`,
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductByCategoryQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useFilterProductMutation,
  useSearchProductQuery,
  useRelatedProductQuery,
} = productsApiSlice;

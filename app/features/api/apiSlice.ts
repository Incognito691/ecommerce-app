import { Product } from "@/components/type";
import { ILoginResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BAKEND_BASE_URL,
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("token")
      }`,
    },
  }),

  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; totalCount: number },
      { page: string; limit: string }
    >({
      query: (arg) => {
        return {
          url: `/products?page=${arg.page}&limit=${arg.limit}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    editProduct: builder.mutation<Product, Partial<Product>>({
      query: ({ _id, ...arg }) => {
        return {
          url: `/products/${_id}`,
          method: "PUT",
          body: { _id, ...arg },
        };
      },
      invalidatesTags: ["Product"],
    }),
    postProduct: builder.mutation<Product, Partial<Product>>({
      query: (arg) => {
        return {
          url: `/products`,
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (_id, ...arg) => {
        return {
          url: `/products/${_id}`,
          method: "DELETE",
          body: { _id, ...arg },
        };
      },
      invalidatesTags: ["Product"],
    }),
    userLogin: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (arg) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: arg,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useEditProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,
  useUserLoginMutation,
} = productsApi;

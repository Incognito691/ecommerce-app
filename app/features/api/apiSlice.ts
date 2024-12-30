import { Product, CartItems, Order } from "@/components/type";
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

  tagTypes: ["Product", "Orders"],
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
    userSignUp: builder.mutation<
      ILoginResponse,
      { firstName: string; lastName: string; email: string; password: string }
    >({
      query: (arg) => {
        return {
          url: `/auth/signup`,
          method: "POST",
          body: arg,
        };
      },
    }),
    seeCarts: builder.query<{ items: CartItems[] }, void>({
      query: () => {
        return {
          url: `/cart`,
          method: "GET",
        };
      },
    }),
    getOrders: builder.query<{ orders: Order[] }, void>({
      query: () => {
        return {
          url: `/orders`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation<
      Order,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
      transformResponse: (response: Order) => response,
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useEditProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,
  useUserLoginMutation,
  useUserSignUpMutation,
  useSeeCartsQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = productsApi;

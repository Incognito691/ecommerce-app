import { CartItems } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BAKEND_BASE_URL,
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("token")
      }`,
    },
  }),

  tagTypes: ["Carts"],
  endpoints: (builder) => ({
    seeCarts: builder.query<{ items: CartItems[] }, void>({
      query: () => {
        return {
          url: `/cart`,
          method: "GET",
        };
      },
    }),
    addCart: builder.mutation<
      CartItems,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/cart/add`,
        method: "POST",
        body: { productId, quantity },
      }),
    }),
  }),
});

export const { useSeeCartsQuery, useAddCartMutation } = CartApi;

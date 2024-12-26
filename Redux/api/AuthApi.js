import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducePath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://10.10.1.26:8000/api/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.mutation({
      query: () => "auth/signup",
      method: "POST",
      body: (data) => data,
    }),
  }),
});

export const { useGetAllProductsQuery } = authApi;

import { ImageResponse, ImageType } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ImageApi = createApi({
  reducerPath: "ImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BAKEND_BASE_URL,
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("token")
      }`,
    },
  }),

  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getImage: builder.query<ImageResponse, { page: string }>({
      query: (arg) => ({
        url: `/images?page=${arg.page}`,
        method: "GET",
        providesTags: ["Images"],
      }),
    }),
    uploadImage: builder.mutation<{ image: ImageType }, FormData>({
      query: (formData) => ({
        url: `/images`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Images"],
    }),
    deleteImage: builder.mutation<void, string>({
      query: (imageId) => ({
        url: `/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const {
  useGetImageQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} = ImageApi;

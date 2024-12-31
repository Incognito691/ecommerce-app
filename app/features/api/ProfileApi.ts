import { UserProfileData } from "@/components/type";
import { ILoginResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BAKEND_BASE_URL,
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("token")
      }`,
    },
  }),

  tagTypes: ["Profile"],
  endpoints: (builder) => ({
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
    userProfile: builder.query<UserProfileData, void>({
      query: () => {
        return {
          url: `/auth/me`,
          method: "GET",
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfilePicture: builder.mutation<
      { displayPicture: { url: string } },
      FormData
    >({
      query: (formData) => {
        return {
          url: `/profile/display-picture`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserProfileQuery,
  useUpdateProfilePictureMutation,
} = ProfileApi;

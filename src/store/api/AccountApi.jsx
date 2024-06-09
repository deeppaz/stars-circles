import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AccountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Account"],
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query(body) {
        return {
          url: `auth/signup`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Account"],
    }),
    signInUser: build.mutation({
      query(body) {
        return {
          url: `auth/signin`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Account"],
    }),
  }),
});

export const { useSignUpUserMutation, useSignInUserMutation } = AccountApi;

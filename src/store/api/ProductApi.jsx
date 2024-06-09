import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getAllProducts: build.query({
      query(body) {
        return {
          url: `products`,
          method: "GET",
          body,
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery } = ProductApi;

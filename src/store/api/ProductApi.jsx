import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
var token = localStorage.getItem("token");

export const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
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
    getProductById: build.query({
      query(id) {
        return {
          url: `products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    updateProductById: build.mutation({
      query(body, id) {
        return {
          url: `products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useUpdateProductByIdMutation } = ProductApi;

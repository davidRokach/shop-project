import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ADD_PRODUCT,
  API_URL,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ORDERS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_PAGE,
  GET_PRODUCTS_BY_SEARCH,
  GET_SINGLE_PRODUCT,
  SEND_CART_ORDER,
} from "../../constant/url";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, cat, page }) => {
        let url = GET_ALL_PRODUCTS;
        if (search && cat && page) {
          url = `${GET_PRODUCTS_BY_SEARCH}${search}&category=${cat}&page=${page}`;
        } else if (search && page) {
          url = `${GET_PRODUCTS_BY_SEARCH}${search}&page=${page}`;
        } else if (cat && page) {
          url = `${GET_PRODUCTS_BY_CATEGORY}${cat}&page=${page}`;
        } else if (search && cat) {
          url = `${GET_PRODUCTS_BY_SEARCH}${search}&category=${cat}`;
        } else if (search) {
          url = `${GET_PRODUCTS_BY_SEARCH}${search}`;
        } else if (cat) {
          url = `${GET_PRODUCTS_BY_CATEGORY}${cat}`;
        } else if (page) {
          url = `${GET_PRODUCTS_BY_PAGE}${page}`;
        }
        return { url };
      },
    }),
    getProductById: builder.query({
      query: (id) => GET_SINGLE_PRODUCT + id,
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: ADD_PRODUCT,
        method: "POST",
        body,
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: EDIT_PRODUCT + id,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: DELETE_PRODUCT + id,
        method: "DELETE",
      }),
    }),
    sendOrder: builder.mutation({
      query: (body) => ({
        url: SEND_CART_ORDER,
        method: "POST",
        body,
      }),
    }),
    getOrders: builder.query({
      query: () => GET_ORDERS,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useSendOrderMutation,
  useGetOrdersQuery,
} = productApi;

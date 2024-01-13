import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MODIFY_SHOP_CART,
  API_URL,
  CHANGE_PASSWORD_ROUTE,
  DELETE_USER_ROUTE,
  EDIT_USER_ROUTE,
  GET_SHOP_CART,
  LOGIN_ROUTE,
  LOGOUT,
  REGISTER_ROUTE,
  USER_INFO_ROUTE,
  USER_LIST,
  UPDATE_ADDRESS,
} from "../../constant/url";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  // prepareHeaders: (headers, { getState }) => {
  //   console.log(headers, getState);
  //   const token = getState().auth.token;

  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }
  //   console.log(token);
  //   return headers;
  // },
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: REGISTER_ROUTE,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: LOGIN_ROUTE,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT,
        method: "POST",
      }),
    }),
    getUserInfo: builder.mutation({
      query: () => ({
        url: USER_INFO_ROUTE,
        method: "GET",
      }),
    }),
    getUserList: builder.query({
      query: () => USER_LIST,
    }),
    editUser: builder.mutation({
      query: ({ id, body }) => ({
        url: EDIT_USER_ROUTE + id,
        method: "PATCH",
        body,
      }),
    }),
    updateAddress: builder.mutation({
      query: (body) => ({
        url: UPDATE_ADDRESS,
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ id, body }) => ({
        url: CHANGE_PASSWORD_ROUTE + id,
        method: "PATCH",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: DELETE_USER_ROUTE + id,
        method: "DELETE",
      }),
    }),
    modifyItemShopCart: builder.mutation({
      query: (body) => ({
        url: MODIFY_SHOP_CART,
        method: "POST",
        body,
      }),
    }),
    getShopCart: builder.query({
      query: () => GET_SHOP_CART,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoMutation,
  useGetUserListQuery,
  useEditUserMutation,
  useUpdateAddressMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
  useModifyItemShopCartMutation,
  useGetShopCartQuery,
} = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutSession } from "hst/utils/functions";

export const usersApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ([pag, token]) => ({
        url: `/users/admin?page=${pag.page}&limit=${pag.limit}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),
    getUser: builder.query({
      query: ([userId, token]) => ({
        url: `users/profile/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    updateUser: builder.mutation({
      query: ([userId, body, token]) => ({
        url: `users/profile/${userId}`,
        method: "PUT",
        body,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),
    updateAvatarUser: builder.mutation({
      query: ([userId, formData, token]) => ({
        url: `users/profile/${userId}/updateAvatar`,
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    enableUser: builder.mutation({
      query: ([userId, token]) => ({
        url: `users/admin/${userId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),
    lockUser: builder.mutation({
      query: ([userId, token]) => ({
        url: `users/admin/${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
    }),
    logoutUser: builder.mutation({
      query: (token) => ({
        url: 'auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body
      })
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useEnableUserMutation,
  useLockUserMutation,
  useUpdateUserMutation,
  useUpdateAvatarUserMutation,
  useLogoutUserMutation
} = usersApi;

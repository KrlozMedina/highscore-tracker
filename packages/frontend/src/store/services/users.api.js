import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      query: (userId) => `users/profile/${userId}`,
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
    updateUser: builder.mutation({
      query: ([userId, body]) => ({
        url: `users/profile/${userId}`,
        method: "PUT",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        body
      }),
    }),
    updateAvatarUser: builder.mutation({
      query: ([userId, formData]) => ({
        url: `users/profile/${userId}/updateAvatar`,
        method: 'PUT',
        body: formData
      })
    }),



    
    enableUser: builder.mutation({
      query: (userId) => ({
        url: `users/admin/${userId}`,
        method: "PATCH",
      }),
    }),
    lockUser: builder.mutation({
      query: (userId) => ({
        url: `users/admin/${userId}`,
        method: "DELETE",
      }),
    }),
    
    }),
  });
// });

export const {
  useLoginUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useEnableUserMutation,
  useLockUserMutation,
  useUpdateUserMutation,
  useUpdateAvatarUserMutation
} = usersApi;

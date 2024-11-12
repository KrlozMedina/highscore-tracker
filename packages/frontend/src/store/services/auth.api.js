import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
  }),
  endpoints: (builder) => ({
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
  })
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreateUserMutation
} = authApi;
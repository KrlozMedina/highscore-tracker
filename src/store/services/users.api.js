import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const usersApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/v1/'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users/admin/'
        }),
        getUser: builder.query({
            query: (userId) => `users/profile/${userId}`
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            })
        })
    })
})

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } = usersApi;

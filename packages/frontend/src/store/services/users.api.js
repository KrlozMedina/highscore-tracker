import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const usersApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (pag) => `users/admin?page=${pag.page}&limit=${pag.limit}`
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
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `users/profile/${body.id}`,
                method: 'PUT',
                body,
            })
        })
    })
})

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation } = usersApi;

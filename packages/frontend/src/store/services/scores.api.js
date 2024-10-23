import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoresApi = createApi({
    reducerPath: 'scoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/v1/'
    }),
    endpoints: (builder) => ({
        getScores: builder.query({
            query: (userId) => `users/scores/${userId}`
        }),
        getLeaderboard: builder.query({
            query: () => `scores/leaderboard`
        }),
        createScore: builder.mutation({
            query: (userId, body) => ({
                url: `scores/${userId}`,
                method: 'POST',
                body,
            })
        }),
        deleteScore: builder.mutation({
            query: () => ({
                url: `users/admin/scores/${scoreId}`,
                method: 'DELETE'
            })
        })
    })
})

export const {useGetScoresQuery, useGetLeaderboardQuery, useCreateScoreMutation, useDeleteScoreMutation} = scoresApi;
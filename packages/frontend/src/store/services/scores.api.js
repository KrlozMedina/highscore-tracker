import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoresApi = createApi({
    reducerPath: 'scoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/'
    }),
    endpoints: (builder) => ({
        getScoreById: builder.query({
            query: (userId) => `users/admin/scores/${userId}`
        }),
        getLeaderBoard: builder.query({
            query: () => 'scores/leaderboard'
        }),
        createScore: builder.mutation({
            query: (body) => ({
                url: `scores/${body.id}`,
                method: 'POST',
                body,
            })
        }),
        deleteScore: builder.mutation({
            query: (scoreId) => ({
                url: `users/admin/scores/${scoreId}`,
                method: 'DELETE'
            })
        }),
        getAllScores: builder.query({
            query: (pag) => `users/admin/scores?page=${pag.page}&limit=${pag.limit}`
        })
    })
})

export const {useGetAllScoresQuery, useGetScoreByIdQuery, useGetLeaderBoardQuery, useCreateScoreMutation, useDeleteScoreMutation} = scoresApi;
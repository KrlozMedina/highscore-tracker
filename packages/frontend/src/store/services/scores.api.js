import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scoresApi = createApi({
    reducerPath: 'scoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/'
    }),
    endpoints: (builder) => ({
        getScoreById: builder.query({
            query: ([userId, limit, page]) => `users/scores/${userId}?page=${page}&limit=${limit}`
        }),
        getLeaderBoard: builder.query({
            query: ([limit, page]) => `scores/leaderboard?page=${page}&limit=${limit}`
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
            query: (pag) => `scores?page=${pag.page}&limit=${pag.limit}`
        })
    })
})

export const {useGetAllScoresQuery, useGetScoreByIdQuery, useGetLeaderBoardQuery, useCreateScoreMutation, useDeleteScoreMutation} = scoresApi;
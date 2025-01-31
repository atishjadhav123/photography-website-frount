import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/transaction`, credentials: "include" }),
    tagTypes: ["transaction"],
    endpoints: (builder) => {
        return {
            addTransaction: builder.mutation({
                query: userData => {
                    return {
                        url: "/create-transaction",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["transaction"]
            }),
            getAllTransaction: builder.query({
                query: userData => {
                    return {
                        url: "/getalltransaction",
                        method: "GET",
                        body: userData
                    }
                },
                invalidatesTags: ["transaction"],
                transformResponse: data => {
                    return data.result || []; // Ensure result is returned or an empty array
                }
            }),
            initialOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/initiate-payment",
                        method: "POST",
                        body: orderData
                    }
                },
            }),

        }
    }
})

export const { useAddTransactionMutation, useGetAllTransactionQuery, useInitialOrderMutation } = transactionApi

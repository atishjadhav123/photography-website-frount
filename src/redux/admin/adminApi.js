import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/apiEndPoint",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),
            addphotoGrafer: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-photografher",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const { useAddphotoGraferMutation } = adminApi

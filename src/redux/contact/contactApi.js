import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/contact`, credentials: "include" }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            contactAdd: builder.mutation({
                query: userData => {
                    return {
                        url: "/sendmessage",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const { useContactAddMutation } = contactApi

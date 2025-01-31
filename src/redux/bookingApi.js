import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/booking`, credentials: "include" }),
    tagTypes: ["booking"],
    endpoints: (builder) => {
        return {
            getAllBooking: builder.query({
                query: () => ({
                    url: '/getallbooking',
                    method: 'GET',
                }),
                providesTags: ['booking'],
                transformResponse: (data) => data.bookings || [],
            }),
            getAllBookingPhotoGrafher: builder.query({
                query: () => ({
                    url: '/getallbookingphotografher',
                    method: 'GET',
                }),
                providesTags: ['booking'],
                transformResponse: (data) => data.booking || [],
            }),
            createBooking: builder.mutation({
                query: userData => {
                    return {
                        url: "/create-booking",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["booking"]
            }),
            updatebooking: builder.mutation({
                query: (userData) => ({
                    url: `/update-booking/${userData._id}`,
                    method: "PUT",
                    body: userData,
                }),
                invalidatesTags: ["booking"],
            }),
            deleteBooking: builder.mutation({
                query: (userData) => ({
                    url: `/delete-booking/${userData._id}`,
                    method: "DELETE",
                    body: userData,
                }),
                invalidatesTags: ["booking"],
            }),

        }
    }
})

export const {
    useCreateBookingMutation,
    useUpdatebookingMutation,
    useGetAllBookingQuery,
    useGetAllBookingPhotoGrafherQuery,
    useDeleteBookingMutation,
} = bookingApi

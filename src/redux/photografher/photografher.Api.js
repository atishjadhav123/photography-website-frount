import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const photoGrafherApi = createApi({
    reducerPath: "photoGraferApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/photo`, credentials: "include" }),
    tagTypes: ["photo"],
    endpoints: (builder) => {
        return {
            getallImage: builder.query({
                query: (id) => {
                    return {
                        url: `/image/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["photo"],
                transformResponse: data => data.result
            }),
            getallImageDetail: builder.query({
                query: () => {
                    return {
                        url: '/getallimage',
                        method: "GET"
                    }
                },
                providesTags: ["photo"],
                transformResponse: data => data.result
            }),
            addImage: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-image",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["photo"]
            }),
            addlike: builder.mutation({
                query: userData => {
                    return {
                        url: `/add-like/${userData.id}`,
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["photo"]
            }),
            updateImage: builder.mutation({
                query: ({ _id, like, userId }) => ({
                    url: `/update-image/${_id}`,
                    method: "PUT",
                    body: { like, userId },
                    headers: { "Content-Type": "application/json" },
                }),
                invalidatesTags: ["photo"], // Re-fetch images to reflect updated likes
            }),
            deleteImage: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-image/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["photo"]
            }),
            addService: builder.mutation({
                query: userData => {
                    return {
                        url: "/create-service",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["photo"]
            }),
            updateService: builder.mutation({
                query: serviceData => ({
                    url: `/update-service/${serviceData._id}`,
                    method: "PUT",
                    body: serviceData.fd,
                }),
                invalidatesTags: ["photo"],
            }),
            deleteService: builder.mutation({
                query: (_id) => ({
                    url: `/delete-service/${_id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["photo"],
            }),
            getallService: builder.query({
                query: () => {
                    return {
                        url: "/getallservice",
                        method: "GET"
                    }
                },
                providesTags: ["photo"],
                transformResponse: data => data.result
            }),
            getallServicePhoto: builder.query({
                query: (id) => {
                    return {
                        url: `/getallservicedetail/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["photo"],
                transformResponse: data => data.result
            }),

        }
    }
})

export const {
    useAddImageMutation,
    useUpdateImageMutation,
    useGetallImageQuery,
    useDeleteImageMutation,
    useAddlikeMutation,
    useGetallImageDetailQuery,
    useAddServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useGetallServiceQuery,
    useGetallServicePhotoQuery
} = photoGrafherApi

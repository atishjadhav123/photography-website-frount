import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        credentials: "include"
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/register-user",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/login-user",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data) => {
                const { result } = data
                if (result.role === "photographer") {
                    localStorage.setItem("photographer", JSON.stringify(result))
                } else if (result.role === "admin") {
                    localStorage.setItem("admin", JSON.stringify(result))
                } else {
                    localStorage.setItem("user", JSON.stringify(result))
                }
                return result
            },
        }),

        logoutUser: builder.mutation({
            query: (userData) => ({
                url: "/logout-user",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["auth"],
            transformResponse: (data, meta, arg) => {
                const role = arg.role
                if (role === "photographer") {
                    localStorage.removeItem("photographer")
                } else if (role === "admin") {
                    localStorage.removeItem("admin")
                } else {
                    localStorage.removeItem("user")
                }
                return data
            },
        }),

    }),
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = authApi

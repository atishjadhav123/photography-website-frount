import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        user: JSON.parse(localStorage.getItem("user")),
        photographer: JSON.parse(localStorage.getItem("photographer")),
    },
    reducers: {
        logoutAdmin: (state) => {
            localStorage.removeItem("admin");
            state.admin = null;
        },
        logoutUser: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        },
        logoutPhotographer: (state) => {
            localStorage.removeItem("photographer");
            state.photographer = null;
        },
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
                if (payload.role === "admin") {
                    state.admin = payload;
                    localStorage.setItem("admin", JSON.stringify(payload));
                } else if (payload.role === "user") {
                    state.user = payload;
                    localStorage.setItem("user", JSON.stringify(payload));
                } else if (payload.role === "photographer") {
                    state.photographer = payload;
                    localStorage.setItem("photographer", JSON.stringify(payload));
                }
            })
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
                localStorage.removeItem("user")
                state.user = null;
            }),
});

export const { logoutAdmin, logoutUser, logoutPhotographer } = authSlice.actions;
export default authSlice.reducer;

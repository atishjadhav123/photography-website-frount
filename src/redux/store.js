import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./authApi"
import authSlice from './authSlice'
import { adminApi } from "./admin/adminApi"
import { photoGrafherApi } from "./photografher/photografher.Api"
import { transactionApi } from "./transactionApi"
import { contactApi } from "./contact/contactApi"
import { bookingApi } from "./bookingApi"

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [photoGrafherApi.reducerPath]: photoGrafherApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(),
    authApi.middleware,
    adminApi.middleware,
    photoGrafherApi.middleware,
    transactionApi.middleware,
    contactApi.middleware,
    bookingApi.middleware
    ]
})

export default reduxStore
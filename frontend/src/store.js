import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authslice.js"
import { apiSlice } from "./slices/apiSlice.js"
const store = configureStore({
    reducer:{
        authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store
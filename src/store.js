import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/UserReducer'
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
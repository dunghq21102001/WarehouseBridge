import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    auth: JSON.parse(localStorage.getItem('user')) || null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        authen: (state, action) => {
            state.auth = action.payload
        }
    }
})

export const { authen } = usersSlice.actions

export default usersSlice.reducer
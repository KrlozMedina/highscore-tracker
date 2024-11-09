import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    expirationDate: null
}

export const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.expirationDate = action.payload.expirationDate;
        },
        clearToken: (state, action) => {
            state.token = null;
            state.expirationDate = null;
        }
    }
})

export const { setToken, clearToken } = tokenSlice.actions;
export const selectToken = (state) => state.tokenState.token;
export default tokenSlice.reducer;
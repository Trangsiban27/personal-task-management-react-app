import { authService } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {

            const res = await authService.login(data)

            localStorage.setItem('token', res?.metadata?.metadata?.tokens?.accessToken)
            localStorage.setItem('clientId', res?.metadata?.metadata?.user?._id)

            return res?.metadata?.metadata
        } catch (err) {
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const getCurrent = createAsyncThunk(
    'auth/getCurrent',
    async (_, { rejectWithValue }) => {
        try {

            const res = await authService.getCurrent()

            console.log('res: ', res)
            return res
        } catch (err) {
            return rejectWithValue(err.response?.data)

        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export default authSlice.reducer
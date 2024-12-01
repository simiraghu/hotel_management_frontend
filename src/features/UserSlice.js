import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    user: {},
    loading: false,
    error: "",
    updateuser: {}
}


export const SignUpUser = createAsyncThunk('signupuser', async (vlaue, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/create_user`, vlaue)
        console.log(data, 'data')

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const LoginUser = createAsyncThunk('loginuser', async (vlaue, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/login_user`, vlaue)
        localStorage.setItem('token', data?.token)

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const GetUserDetails = createAsyncThunk('getuserdetails', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/get_user_details`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data?.user

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const UpdateUser = createAsyncThunk('update_user', async (update_data, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/user/update_user`, update_data,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.response)
    }
})

export const UserSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            LogOut: (state) => {
                localStorage.removeItem('token')
                state.user = {}
                state.error = ""
                state.loading = false
            },

            ClearState: (state) => {
                state.user = {}
                state.error = ""
                state.loading = false
            },

            ClearUpdateUser: (state) => {
                state.updateuser = {}
                state.loading = false
                state.error= ""
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(SignUpUser?.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(SignUpUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(SignUpUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(LoginUser?.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(LoginUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(LoginUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(GetUserDetails?.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(GetUserDetails.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                })
                .addCase(GetUserDetails.rejected, (state, action) => {
                    state.loading = false
                })

            builder
                .addCase(UpdateUser?.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(UpdateUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.updateuser = action.payload
                    state.error = ""
                })
                .addCase(UpdateUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

        }
    }
)
export const { LogOut, ClearState, ClearUpdateUser } = UserSlice.actions
export default UserSlice.reducer
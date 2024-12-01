import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    booking: {},
    loading: false,
    error: {},
    bookings: []
}

export const CreateBooking = createAsyncThunk('createBooking', async (
    {
        fullname,
        email,
        phone_number,
        address,
        check_in_date,
        check_out_date,
        guests,
        roomId,
        amount,
        currency,
        paymentMethodId
    },
    { rejectWithValue }) => {

    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/booking/create_booking`,
            {
                fullname,
                email,
                address,
                phone_number,
                check_in_date,
                check_out_date,
                guests,
                roomId,
                amount,
                currency,
                paymentMethodId
            },
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data?.OrderDetails

    } catch (error) {
        return rejectWithValue(error?.response?.message)
    }
})


export const GetAllBooking = createAsyncThunk('getallbooking', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_all_booking`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data?.booking

    } catch (error) {
        return rejectWithValue(error?.response?.message)
    }
})

export const GetUserBooking = createAsyncThunk('getuserbooking', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_booking_by_userId`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data?.booking

    } catch (error) {
        return rejectWithValue(error?.response?.message)
    }
})

export const GetRoomBooking = createAsyncThunk('getroombooking', async (roomId, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_booking_by_roomId`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

        return data?.booking

    } catch (error) {
        return rejectWithValue(error?.response?.message)
    }
})


export const GetBookingsByUserId = createAsyncThunk('getbookingsbyuserid', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/booking/get_booking_by_userId`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        return data?.booking

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const BookingSlice = createSlice(
    {
        name: 'booking',
        initialState,
        reducers: {
            ManageBookingState: (state) => {
                state.booking = {}
                state.loading = false
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(CreateBooking.pending, (state, action) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(CreateBooking.fulfilled, (state, action) => {
                    state.loading = false
                    state.booking = action.payload
                })
                .addCase(CreateBooking.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(GetAllBooking.pending, (state, action) => {
                    state.loading = true
                    state.error = ""
                })
                .addCase(GetAllBooking.fulfilled, (state, action) => {
                    state.loading = false
                    state.bookings = action.payload
                })
                .addCase(GetAllBooking.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(GetUserBooking.pending, (state, action) => {
                    state.loading = true
                    state.error = ""
                })
                .addCase(GetUserBooking.fulfilled, (state, action) => {
                    state.loading = false
                })
                .addCase(GetUserBooking.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(GetRoomBooking.pending, (state, action) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(GetRoomBooking.fulfilled, (state, action) => {
                    state.loading = false
                })
                .addCase(GetRoomBooking.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

            builder
                .addCase(GetBookingsByUserId.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(GetBookingsByUserId.fulfilled, (state, action) => {
                    state.loading = false
                    state.bookings = action.payload
                })
                .addCase(GetBookingsByUserId.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                })

        }
    }
)
export const { ManageBookingState } = BookingSlice.actions
export default BookingSlice.reducer
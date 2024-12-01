import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    hotels: [],
    loading: false,
    error: "",
    rooms: [],
    hotel: {},
    updatehotel: {}
}

export const GetAllHotels = createAsyncThunk('getallhotels', async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hotel/get_all_hotels`)
        return data?.hotels

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const GetHotelRooms = createAsyncThunk('gethotelrooms', async ({ hotelId, roomtype }, { rejectWithValue }) => {
    try {
        if (hotelId && roomtype) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hotel/get_hotel_room?hotelId=${hotelId}&roomtype=${roomtype}`)
            return data?.hotel

        } else if (hotelId) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hotel/get_hotel_room?hotelId=${hotelId}`)
            return data?.hotel

        } else {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hotel/get_hotel_room`)
            return data?.hotel

        }


    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)

    }
})

export const GetHotelById = createAsyncThunk('gethotelbyid', async (hotelId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hotel/get_hotel_by_hotelid/${hotelId}`)
        return data?.hotel

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const CreateHotel = createAsyncThunk('createhotel', async (value, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/hotel/create_hotel`, value,
            {
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const UpdateHotel = createAsyncThunk('updateHotel', async ({ value, id }, { rejectWithValue }) => {
    console.log(value, id)
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/hotel/update_hotel?id=${id}`, value,
            {
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const DeleteHotel = createAsyncThunk('deletehotel', async (hotelId, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/hotel/delete_hotel?hotelId=${hotelId}`, {},
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const HotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        ClearState: (state) => {
            state.error = ""
            state.hotel = {}
            state.loading = false
        },

        ClearUpdateState : (state) => {
            state.error = ""
            state.updatehotel = {}
            state.loading = false
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(GetAllHotels.pending, (state, action) => {
                state.loading = true
            })
            .addCase(GetAllHotels.fulfilled, (state, action) => {
                state.loading = false
                state.hotels = action.payload
                state.error = ""
            })
            .addCase(GetAllHotels.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(GetHotelRooms.pending, (state, action) => {
                state.loading = true
            })
            .addCase(GetHotelRooms.fulfilled, (state, action) => {
                state.loading = false
                state.rooms = action.payload
                state.error = ""
            })
            .addCase(GetHotelRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(GetHotelById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(GetHotelById.fulfilled, (state, action) => {
                state.loading = false
                state.hotel = action.payload
                state.error = ""
            })
            .addCase(GetHotelById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(CreateHotel.pending, (state, action) => {
                state.loading = true
            })
            .addCase(CreateHotel.fulfilled, (state, action) => {
                state.loading = false
                state.hotel = action.payload
                state.error = ""
            })
            .addCase(CreateHotel.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })

        builder
            .addCase(UpdateHotel.pending, (state, action) => {
                state.loading = true
            })
            .addCase(UpdateHotel.fulfilled, (state, action) => {
                state.loading = false
                state.updatehotel = action.payload
                state.error = ""
            })
            .addCase(UpdateHotel.rejected, (state, action) => {
                state.loading = true
                state.error = action?.payload
            })

        builder
            .addCase(DeleteHotel.pending, (state, action) => {
                state.loading = true
            })
            .addCase(DeleteHotel.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(DeleteHotel.rejected, (state, action) => {
                state.loading = true
                state.error = action?.payload
            })
    }
})

export const { ClearState, ClearUpdateState } = HotelSlice.actions

export default HotelSlice.reducer
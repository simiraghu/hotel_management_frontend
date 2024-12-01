import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    rooms: [],
    loading: false,
    error: "",
    room: {}
}

export const GetAllRooms = createAsyncThunk('getallrooms', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/room/get_all_rooms`)
        return data?.rooms

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const GetRoomById = createAsyncThunk('getroombyid', async (roomId, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/room/get_room_by_roomId?roomId=${roomId}`)
        return data?.room

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const CreateRoom = createAsyncThunk('createroom', async (value, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/room/create_room`, value, {
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

export const UpdateRoom = createAsyncThunk('updateroom', async ({ value, roomId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/room/update_room?roomId=${roomId}`, value, {
            headers: {
                token: localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return data?.room

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const DeleteRoom = createAsyncThunk('deleteroom', async (roomId, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/room/delete_room?roomId=${roomId}`, {}, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        return data

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const RoomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        ClearRoomState : (state) => {
            state.loading = false
            state.room = {}
            state.error = ""
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(GetAllRooms.pending, (state, action) => {
                state.loading = false
            })
            .addCase(GetAllRooms.fulfilled, (state, action) => {
                state.loading = false
                state.rooms = action.payload
            })
            .addCase(GetAllRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(GetRoomById.pending, (state, action) => {
                state.loading = false
            })
            .addCase(GetRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.room = action.payload
            })
            .addCase(GetRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(CreateRoom.pending, (state, action) => {
                state.loading = true
            })
            .addCase(CreateRoom.fulfilled, (state, action) => {
                state.loading = false
                state.room = action.payload
                state.error = ""
            })
            .addCase(CreateRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(UpdateRoom.pending, (state, action) => {
                state.loading = true
            })
            .addCase(UpdateRoom.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(UpdateRoom.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


    }
})
export const { ClearRoomState } = RoomSlice.actions

export default RoomSlice.reducer
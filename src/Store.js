import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './features/UserSlice';
import RoomReducer from './features/RoomSlice';
import HotelReducer from './features/HotelSlice';
import BookingReducer from './features/BookingSlice';

export const store = configureStore(
    {
  reducer: {
    users: UserReducer,
    hotels: HotelReducer,
    rooms: RoomReducer,
    booking: BookingReducer
  },
}
)
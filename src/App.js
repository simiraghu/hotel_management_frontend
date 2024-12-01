import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import AllHotels from './components/hotels/AllHotels';
import ShowHotelRooms from './components/hotels/ShowHotelRoom';
import AllRooms from './components/rooms/AllRooms';
import HotelDetailsPage from './components/hotels/HotelDetails';
import RoomDetails from './components/rooms/RoomDetails';
import MyAccount from './components/pages/MyAccount';
import My_bookings from './components/pages/My_bookings';
import Dashboard from './components/dashboard/Dashboard';
import Create_hotel from './components/dashboard/Create_hotel';
import Create_room from './components/dashboard/Create_room';
import Update_hotel from './components/dashboard/Update_hotel';
import Update_room from './components/dashboard/Update_room';
import Booking from './components/rooms/Booking';
import AllDashBookings from './components/dashboard/AllDashBookings'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/hotels' element={<AllHotels />} />
        <Route path='/hotel_rooms' element={<ShowHotelRooms />} />
        <Route path='/hotel_details/:hotelId' element={<HotelDetailsPage />} />
        <Route path='/room_details' element={<RoomDetails />} />
        <Route path='/rooms' element={<AllRooms />} />
        <Route path='/my_account' element={<MyAccount />} />
        <Route path='/' element={<Home />} />
        <Route path='/book_room' element={<Booking />} />
        <Route path='/my_bookings' element={<My_bookings />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='create_hotel' element={<Create_hotel />} />
          <Route path='create_room' element={<Create_room />} />
          <Route path='update_hotel' element={<Update_hotel />} />
          <Route path='update_room' element={<Update_room />} />
          <Route path='bookings' element={<AllDashBookings />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;

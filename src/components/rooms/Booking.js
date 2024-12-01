import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import RoomBooking from './BookRoomPage';
import { loadStripe } from '@stripe/stripe-js';

const Booking = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY)

    return (
        <Elements stripe={stripePromise}>
            <RoomBooking />
        </Elements>
    )
}

export default Booking;
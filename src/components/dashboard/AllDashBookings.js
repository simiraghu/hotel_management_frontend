import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBooking } from '../../features/BookingSlice';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const columns = [
    {
        field: 'fullname',
        headerName: 'Full Name',
        width: 150
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150
    },
    {
        field: 'hotelname',
        headerName: 'Hotel Name',
        width: 150,
    },
    {
        field: 'hotelcity',
        headerName: 'Hotel city',
        width: 150,
    },
    {
        field: 'phonenumber',
        headerName: 'Phone Number',
        width: 150,
    },
    {
        field: 'guests',
        headerName: 'Guests',
        width: 150,
    },
    {
        field: 'loginemail',
        headerName: 'Login Email',
        width: 170,
    },
    {
        field: 'roomtype',
        headerName: 'Room Type',
        width: 150,
    },
    {
        field: 'check_in_date',
        headerName: 'check in date',
        width: 150,
    },
    {
        field: 'check_out_date',
        headerName: 'check out date',
        width: 150,
    },
    {
        field: 'amount',
        headerName: 'Amount INR',
        width: 150,
    },
    {
        field: 'payment',
        headerName: 'Payment Status',
        width: 150,
        renderCell: (params) => (
            params?.row?.payment === "succeeded"
                ?
                <CheckCircleIcon
                    color="success"
                    sx={
                        {
                            margin: '1.5vh 3vw'
                        }
                    }
                />
                : <CancelIcon color="error" />
        )
    }
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

    const dispatch = useDispatch()
    const { bookings } = useSelector((state) => state.booking)
    console.log(bookings, "bookings")

    useEffect(() => {
        dispatch(GetAllBooking())

    }, [dispatch])

    const rows = bookings.map((item) => (
        {
            id: item?._id,
            fullname: item?.fullname,
            email: item?.email,
            phonenumber: item?.phone_number,
            guests: item?.guests,
            hotelname: item?.hotel[0]?.name,
            hotelcity: item?.hotel[0]?.city,
            roomtype: item?.room[0]?.roomtype,
            check_in_date: moment(item?.check_in_date).format('L'),
            check_out_date: moment(item?.check_out_date).format('L'),
            payment: item?.payment_details?.status,
            amount: item?.payment_details?.amount,
            loginemail: item?.user[0]?.email,
        }
    ))

    return (
        <Paper sx={
            {
                height: 400,
                width: '100%',
                marginTop: '8vh'
            }
        }>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

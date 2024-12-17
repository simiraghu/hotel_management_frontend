import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllRooms } from "../../features/RoomSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner'
import { Delete, Edit } from '@mui/icons-material';
import { DeleteRoom } from '../../features/RoomSlice'
import moment from "moment";

const AllHotels = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { rooms, loading } = useSelector((state) => state?.rooms);
    const { user } = useSelector((state) => state?.users);

    const [open, setOpen] = useState(false);
    const [roomData, setRoomData] = useState("");

    const handleOpen = (room) => {
        setOpen(true);
        setRoomData(room)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (roomId) => {

        handleClose();
        dispatch(DeleteRoom(roomId))

        setTimeout(() => {
            dispatch(GetAllRooms())
        }, 1500);
    };

    const location = useLocation()
    const SearchParams = new URLSearchParams(location.search)

    const check_in_date = SearchParams.get('check_in_date')
    const check_out_date = SearchParams.get('check_out_date')
    const roomtype = SearchParams.get('roomtype')


    useEffect(() => {
        if (check_in_date && check_out_date && roomtype) {
            dispatch(GetAllRooms(
                {
                    check_in_date: moment(check_in_date).toISOString(),
                    check_out_date: moment(check_out_date).toISOString(),
                    roomtype: roomtype
                }
            ));

        } else{
            dispatch(GetAllRooms({}));
        }
    }, [dispatch, check_in_date, check_out_date, roomtype]);

    // Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Box
            sx={
                {
                    padding: "40px",
                    minHeight: "100vh",
                    background: "linear-gradient(120deg, #f5f5f5, #e0f7fa)"
                }
            }
        >
            <Grid
                container
                spacing={3}
                sx={
                    {
                        mt: 2,
                    }
                }
            >
                {
                    loading ? <p
                        style={
                            {
                                marginTop: '5vh',
                                marginLeft: '50vw'
                            }
                        }>
                        <Spinner />
                    </p>
                        :
                        rooms.length > 0 ? (
                            rooms.map((room) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={5}
                                    md={3}
                                    key={room?._id}>
                                    <Card
                                        sx={
                                            {
                                                maxWidth: 345,
                                            }
                                        }
                                    >
                                        <Slider {...carouselSettings}>
                                            {
                                                room?.image?.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`hotel-${index}`}
                                                        style={
                                                            {
                                                                height: "180px",
                                                                width: "100%",
                                                                objectFit: "cover",
                                                            }
                                                        }
                                                    />
                                                ))
                                            }
                                        </Slider>

                                        <CardContent>

                                            <div
                                                style={
                                                    {
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }
                                                }>

                                                <Typography variant="h6" component="div">
                                                    Price: {room?.price} per 24 hour
                                                </Typography>

                                                {
                                                    user?.role === 'admin' &&
                                                    <Typography variant="h6" component="div" >
                                                        <Edit
                                                            sx={
                                                                {
                                                                    color: '#27877e',
                                                                    cursor: 'pointer'
                                                                }
                                                            }
                                                            onClick={() => navigate(`/dashboard/update_room?roomId=${room?._id}`)}
                                                        />
                                                        {" "}
                                                        <Delete
                                                            sx={
                                                                {
                                                                    color: '#27877e',
                                                                    cursor: 'pointer'
                                                                }
                                                            }
                                                            onClick={() => handleOpen(room)}
                                                        />
                                                    </Typography>
                                                }
                                                {
                                                    open &&
                                                    <div>
                                                        <Dialog open={open} onClose={() => handleClose()}>
                                                            <DialogTitle>Confirm Deletion</DialogTitle>

                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Are you sure you want to delete this {room?.roomtype} room ? This action can't be undone.
                                                                </DialogContentText>
                                                            </DialogContent>

                                                            <DialogActions>
                                                                <Button
                                                                    onClick={() => handleClose()}
                                                                    color="primary"
                                                                >
                                                                    Cancel
                                                                </Button>

                                                                <Button
                                                                    onClick={() => handleDelete(roomData?._id)}
                                                                    color="error"
                                                                    variant="contained"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
                                                }
                                            </div>

                                            <Typography variant="h6" component="div">
                                                Room Type: {room?.roomtype}
                                            </Typography>

                                            <Typography variant="h6" component="div">
                                                Hotel: {room?.hotel[0]?.name}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Location: {room?.hotel[0]?.address}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                Description : {room?.description}
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                sx={
                                                    {
                                                        marginTop: "10px",
                                                        width: "40%%",
                                                        backgroundColor: "#27877e",
                                                        marginRight: 1
                                                    }
                                                }
                                                onClick={() => navigate(`/room_details?roomId=${room?._id}`)}
                                            >
                                                View details
                                            </Button>

                                            <Button
                                                variant="contained"
                                                sx={
                                                    {
                                                        marginTop: "10px",
                                                        width: "60%%",
                                                        backgroundColor: "#27877e"
                                                    }
                                                }
                                                onClick={() => navigate(`/book_room?roomId=${room?._id}`)}
                                            >
                                                Book Room
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={
                                    {
                                        textAlign: "center",
                                        width: "100%",
                                    }
                                }
                            >
                                No rooms found.
                            </Typography>
                        )}
            </Grid>
        </Box>
    );
};

export default AllHotels;

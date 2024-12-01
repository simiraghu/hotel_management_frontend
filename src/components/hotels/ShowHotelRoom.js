import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { GetHotelRooms } from "../../features/HotelSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner'

const AllHotels = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

    const { rooms, loading } = useSelector((state) => state?.hotels);

    const searchParams = new URLSearchParams(location.search)

    const hotelId = searchParams.get('hotelId')
    const roomtype = searchParams.get('roomtype')

    useEffect(() => {
        if (hotelId && roomtype) {
            dispatch(GetHotelRooms({ hotelId, roomtype }))

        } else {
            dispatch(GetHotelRooms({ hotelId }))

        }
    }, [hotelId, roomtype]);

    // Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
            <h1
                style={
                    {
                        marginTop: "5vh",
                        textAlign: "center",
                        alignItems: "center",
                        color: '#27877e'
                    }
                }
            >
                Hotel {rooms[0]?.hotel[0]?.name}'s  Rooms
            </h1>

            <Grid
                container
                spacing={3}
                sx={
                    {
                        m: 2,
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
                    </p> :
                        rooms?.length > 0 ? (
                            rooms?.map((room) => (
                                <>
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
                                                <Typography variant="h6" component="div">
                                                    {room?.price} per 24 hours
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    Room Type: {room?.roomtype}
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
                                </>
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={
                                    {
                                        textAlign: "center",
                                        width: "100%",
                                        color: "#27877e"
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

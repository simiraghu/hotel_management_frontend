import React, { useEffect } from "react";
import Slider from "react-slick";
import {
    Box,
    Typography,
    Grid,
    Card,
    Chip,
    CardMedia,
    Button
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { GetRoomById } from "../../features/RoomSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner'

const RoomDetails = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { room, loading } = useSelector((state) => state?.rooms)

    console.log(room, "rooms")

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const roomId = searchParams.get('roomId')

    useEffect(() => {
        dispatch(GetRoomById(roomId))
    }, [])

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <>
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

                    <Box
                        sx={
                            {
                                padding: "20px",
                                marginTop: "10vh",
                            }
                        }
                    >
                        {/* Image Carousel */}
                        <Box sx={{ marginBottom: "30px" }}>
                            <Slider {...sliderSettings}>
                                {
                                    room?.image?.map((image, index) => (
                                        <Card
                                            key={index}
                                            sx={
                                                {
                                                    boxShadow: 5
                                                }
                                            }>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={image}
                                                alt={`Room Image ${index + 1}`}
                                            />
                                        </Card>
                                    ))
                                }
                            </Slider>
                        </Box>

                        {/* Room Details */}
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold">
                                    {room?.roomtype} Room
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={
                                        {
                                            marginY: "10px"
                                        }
                                    }>
                                    {room?.description}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    color="primary"
                                    fontWeight="bold"
                                    sx={
                                        {
                                            marginBottom: "20px"
                                        }
                                    }>
                                    Rs. {room?.price} per 24 hours
                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={
                                        {
                                            marginTop: "20px"
                                        }
                                    }>
                                    Amenities:
                                </Typography>

                                <Box
                                    sx={
                                        {
                                            display: "flex",
                                            gap: 2,
                                            flexWrap: "wrap"
                                        }
                                    }>
                                    {
                                        ["Free Wi-Fi", "TV", "AC", "Catery", "wardrobe"].map((amenity, index) => (
                                            <Chip
                                                label={amenity}
                                                sx={{ backgroundColor: "#27877e", color: "white" }}
                                                key={index} />
                                        ))
                                    }
                                </Box>

                                <Button
                                    variant="contained"
                                    sx={
                                        {
                                            marginTop: "10px",
                                            width: "60%%",
                                            backgroundColor: "#27877e"
                                        }
                                    }
                                    onClick={() => navigate(`/book_room?roomId=${roomId}`)}
                                >
                                    Book Room
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </>
    );
};

export default RoomDetails;

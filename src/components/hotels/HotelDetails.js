import React, { useEffect } from "react";
import Slider from "react-slick";
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Rating,
    Chip
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { GetHotelById } from "../../features/HotelSlice";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner'

const HotelDetailsPage = () => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const { hotel, loading } = useSelector((state) => state?.hotels)
    const { hotelId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getHotel = async () => {
        dispatch(GetHotelById(hotelId))
    }

    const handleDeluxeRoom = (hotelId, roomtype) => {
        navigate(`/hotel_rooms?hotelId=${hotelId}&roomtype=${roomtype}`)
    }

    useEffect(() => {
        getHotel()
    }, [])

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
                                width: "100%",
                                padding: "20px",
                                marginTop: '5vw'
                            }
                        }>
                        {/* Image Carousel */}
                        <Box
                            sx={
                                {
                                    marginBottom: "20px"
                                }
                            }>
                            <Slider {...sliderSettings}>
                                {
                                    hotel?.image?.map((img, index) => (
                                        <Box
                                            key={index}
                                            sx={
                                                {
                                                    position: "relative",
                                                    height: "400px"
                                                }
                                            }>
                                            <img
                                                src={img}
                                                alt={`Hotel ${index + 1}`}
                                                style={
                                                    {
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                    }
                                                }
                                            />
                                            <Box
                                                sx={
                                                    {
                                                        position: "absolute",
                                                        bottom: "20px",
                                                        left: "20px",
                                                        color: "#fff",
                                                        backgroundColor: "rgba(0,0,0,0.6)",
                                                        padding: "10px 20px",
                                                        borderRadius: "10px",
                                                    }
                                                }
                                            >
                                                <Typography
                                                    variant="h4"
                                                    sx={
                                                        {
                                                            fontWeight: "bold"
                                                        }
                                                    }>
                                                    {hotel?.name}
                                                </Typography>

                                                <Rating
                                                    value={4.5}
                                                    readOnly
                                                    sx={
                                                        {
                                                            color: "gold"
                                                        }
                                                    } />
                                            </Box>
                                        </Box>
                                    ))}
                            </Slider>
                        </Box>

                        {/* Main Content */}
                        <Grid
                            container
                            spacing={4}>
                            {/* Left Section */}
                            <Grid
                                item
                                xs={12}
                                md={8}>
                                {/* Hotel Details */}
                                <Box
                                    sx={
                                        {
                                            marginBottom: "20px"
                                        }
                                    }>
                                    <Typography
                                        variant="h5"
                                        sx={
                                            {
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                color: "#27877e"
                                            }
                                        }>
                                        About the Hotel
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={
                                            {
                                                marginBottom: "20px",
                                                color: "#27877e"
                                            }
                                        }>
                                        {hotel?.description}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={
                                            {
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                color: "#27877e"
                                            }
                                        }>
                                        Amenities
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
                                            hotel?.facilities?.map((amenity, index) => (
                                                <Chip
                                                    label={amenity}
                                                    sx={{ backgroundColor: "#27877e", color: "white" }}
                                                    key={index} />
                                            ))
                                        }
                                    </Box>
                                </Box>

                                {/* Room Types */}
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={
                                            {
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                                color: "#27877e"
                                            }
                                        }>
                                        Room Types
                                    </Typography>

                                    <Grid
                                        container
                                        spacing={5}
                                        sx={
                                            {
                                                marginLeft: "15vw"
                                            }
                                        }>

                                        <Grid item xs={12} sm={6}>
                                            <Card
                                                sx={
                                                    {
                                                        borderRadius: "10px"
                                                    }
                                                }>
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8AMBvRFxrh7XEU39PQp15-QE__Iui_aapZQ&s"
                                                    alt="Deluxe"
                                                    style={
                                                        {
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                            borderTopLeftRadius: "10px",
                                                            borderTopRightRadius: "10px",
                                                        }
                                                    }
                                                />

                                                <CardContent>
                                                    <Typography variant="h6">{hotel?.name} {""} Deluxe Room</Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={
                                                            {
                                                                marginBottom: "10px",
                                                                color: "#27877e"
                                                            }
                                                        }>
                                                        Features: King Bed, City View, Free Breakfast.
                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        sx={
                                                            {
                                                                fontWeight: "bold",
                                                                color: "#27877e"
                                                            }
                                                        }>
                                                        5000 per 24 hour
                                                    </Typography>

                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={
                                                            {
                                                                marginTop: "10px",
                                                                backgroundColor: "#27877e"
                                                            }
                                                        }
                                                        onClick={() => handleDeluxeRoom(hotelId, "Deluxe")}
                                                    >
                                                        View Rooms
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Card
                                                sx={
                                                    {
                                                        borderRadius: "10px"
                                                    }
                                                }>
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ20O5WN6l5BrXGMaaGupWwAp_LCrcPU0txqw&s"
                                                    alt="Family"
                                                    style={
                                                        {
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                            borderTopLeftRadius: "10px",
                                                            borderTopRightRadius: "10px",
                                                        }
                                                    }
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ color: "#27877e" }}>{hotel?.name} {""} Family Room</Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={
                                                            {
                                                                marginBottom: "10px",
                                                                color: "#27877e"
                                                            }
                                                        }>
                                                        Features: King Bed, City View, Free Breakfast.
                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        sx={
                                                            {
                                                                fontWeight: "bold",
                                                                color: "#27877e"
                                                            }
                                                        }>
                                                        10000 per 24 hour
                                                    </Typography>

                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={
                                                            {
                                                                marginTop: "10px",
                                                                backgroundColor: "#27877e"
                                                            }
                                                        }
                                                        onClick={() => handleDeluxeRoom(hotelId, "Family")}
                                                    >
                                                        View rooms
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
            }
        </>
    );
};

export default HotelDetailsPage;

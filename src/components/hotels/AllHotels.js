import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteHotel, GetAllHotels } from "../../features/HotelSlice";
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner'

const AllHotels = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { hotels, loading } = useSelector((state) => state?.hotels);
    const { user } = useSelector((state) => state?.users);

    const [open, setOpen] = useState(false);
    const [hotelData, setHotelData] = useState("");

    const handleOpen = (hotel) => {
        setOpen(true);
        setHotelData(hotel)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (hotelId) => {
        dispatch(DeleteHotel(hotelId))
        handleClose();
        
        setTimeout(() => {
            dispatch(GetAllHotels())
        }, 1500);
    };

    useEffect(() => {
        dispatch(GetAllHotels())
    }, [dispatch]);

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
                    </p> : hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <Grid
                                item
                                xs={12}
                                sm={5}
                                md={3}
                                key={hotel?._id}>
                                <Card
                                    sx={
                                        {
                                            maxWidth: 345,
                                        }
                                    }
                                >
                                    <Slider {...carouselSettings}>
                                        {
                                            hotel.image?.map((image, index) => (
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

                                            <Typography variant="h6" component="div" >
                                                {hotel?.name}
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
                                                        onClick={() => navigate(`/dashboard/update_hotel?hotelId=${hotel?._id}`)}
                                                    />

                                                    {" "}

                                                    <Delete
                                                        sx={
                                                            {
                                                                color: '#27877e',
                                                                cursor: 'pointer'
                                                            }
                                                        }
                                                        onClick={() => handleOpen(hotel)}
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
                                                                Are you sure you want to delete this hotel {hotelData?.name} ? This action can't be undone.
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
                                                                onClick={() => handleDelete(hotelData?._id)}
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

                                        <Typography variant="body2" color="text.secondary">
                                            Location: {hotel?.address}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            City: {hotel?.city}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            ContactNo : {hotel?.contactNo}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            Description : {hotel?.description}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            Facility:{" "}
                                            {
                                                hotel?.facilities?.map((item, idx) => (
                                                    <span key={idx}>
                                                        {item}{","}
                                                    </span>
                                                ))
                                            }
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
                                            onClick={() => navigate(`/hotel_details/${hotel?._id}`)}
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
                                            onClick={() => navigate(`/hotel_rooms?hotelId=${hotel?._id}`)}
                                        >
                                            Show Rooms
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
                                    marginTop: '3vh'
                                }
                            }
                        >
                            No hotels found.
                        </Typography>
                    )}
            </Grid>
        </Box>
    );
};

export default AllHotels;

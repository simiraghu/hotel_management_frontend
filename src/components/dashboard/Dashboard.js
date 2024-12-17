import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const HotelManagementDashboard = () => {

    const navigate = useNavigate()

    return (
        <div
            style={
                {
                    background: "linear-gradient(120deg, #f5f5f5, #e0f7fa)",
                    height: '200vh',
                }
            }
        >
            <Box
                sx={
                    {
                        padding: "20px",
                        height: "40vh",
                        marginTop: '6vh',
                        marginBottom: '100px'
                    }
                }
            >
                {/* Header */}
                <Typography
                    variant="h4"
                    sx={
                        {
                            marginBottom: "30px",
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#37474f",
                        }
                    }
                >
                    Hotel Management Dashboard
                </Typography>

                {/* Main Content */}
                <Grid
                    container
                    spacing={6}
                    justifyContent="space-evenly"
                    sx={
                        {
                            flexWrap: "nowrap", // Prevent wrapping
                            overflowX: "auto", // Enable horizontal scrolling if necessary
                        }
                    }
                >
                    {/* Create Hotel Section */}
                    <Grid item xs={12} md={3}>
                        <Card
                            sx={
                                {
                                    height: "250px",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }
                            }
                        >
                            <Box
                                sx={
                                    {
                                        backgroundColor: "#27877e",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }
                                }
                            >
                                <Typography
                                    variant="h5"
                                    sx={
                                        {
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                        }
                                    }
                                >
                                    Create Hotel
                                </Typography>
                            </Box>
                            <CardContent
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "170px",
                                    }
                                }
                            >
                                <Button
                                    variant="contained"
                                    sx={
                                        {
                                            backgroundColor: "#27877e",
                                            color: "#ffffff",
                                            width: "150px",
                                            marginBottom: "10px",
                                            "&:hover": { backgroundColor: "#1e605c" },
                                        }
                                    }
                                    onClick={() => navigate('/dashboard/create_hotel')}
                                >
                                    Add Hotel
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={
                                        {
                                            color: "#27877e",
                                            borderColor: "#27877e",
                                            width: "150px",
                                            "&:hover": {
                                                backgroundColor: "#e0f2f1",
                                                borderColor: "#1e605c",
                                            },
                                        }
                                    }
                                    onClick={() => navigate('/hotels')}
                                >
                                    View Hotels
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Create Room Section */}
                    <Grid item xs={12} md={3}>
                        <Card
                            sx={
                                {
                                    height: "250px",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }
                            }
                        >
                            <Box
                                sx={
                                    {
                                        backgroundColor: "#27877e",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }
                                }
                            >
                                <Typography
                                    variant="h5"
                                    sx={
                                        {
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                        }
                                    }
                                >
                                    Create Room
                                </Typography>
                            </Box>
                            <CardContent
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "170px",
                                    }
                                }
                            >
                                <Button
                                    variant="contained"
                                    sx={
                                        {
                                            backgroundColor: "#27877e",
                                            color: "#ffffff",
                                            width: "150px",
                                            marginBottom: "10px",
                                            "&:hover": { backgroundColor: "#1e605c" },
                                        }
                                    }
                                    onClick={() => navigate('/dashboard/create_room')}
                                >
                                    Add Room
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={
                                        {
                                            color: "#27877e",
                                            borderColor: "#27877e",
                                            width: "150px",
                                            "&:hover": {
                                                backgroundColor: "#e0f2f1",
                                                borderColor: "#1e605c",
                                            },
                                        }
                                    }
                                    onClick={() => navigate('/rooms')}
                                >
                                    View Rooms
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* View Bookings Section */}
                    <Grid item xs={12} md={3}>
                        <Card
                            sx={
                                {
                                    height: "250px",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }
                            }
                        >
                            <Box
                                sx={
                                    {
                                        backgroundColor: "#27877e",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }
                                }
                            >
                                <Typography
                                    variant="h5"
                                    sx={
                                        {
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                        }
                                    }
                                >
                                    View Bookings
                                </Typography>
                            </Box>
                            <CardContent
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "170px",
                                    }
                                }
                            >
                                <Button
                                    variant="contained"
                                    sx={
                                        {
                                            backgroundColor: "#27877e",
                                            color: "#ffffff",
                                            width: "150px",
                                            marginBottom: "10px",
                                            "&:hover": { backgroundColor: "#1e605c" },
                                        }
                                    }
                                    onClick={() => navigate('/dashboard/bookings')}
                                >
                                    View Bookings
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Outlet />
        </div>

    );
};

export default HotelManagementDashboard;

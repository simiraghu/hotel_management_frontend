import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { ClearUpdateUser, GetUserDetails, UpdateUser } from "../../features/UserSlice";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UserProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, updateuser, error } = useSelector((state) => state?.users)

    const [isEditing, setisEditing] = useState(false)
    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [isSuccessAlert, setIsSuccessAlert] = useState(false)
    console.log(updateuser, ">>updateuser")

    const [value, setValue] = useState(
        {
            username: "",
            email: "",
            phonenumber: "",
            city: "",
        }
    );

    const GetUser = async () => {
        dispatch(GetUserDetails())
    }

    useEffect(() => {
        GetUser()
    }, [])

    useEffect(() => {
        if (user) {
            setValue(
                {
                    username: user?.username,
                    email: user?.email,
                    phonenumber: user?.phonenumber,
                    city: user?.city
                }
            )
        }
    }, [user])

    useEffect(() => {
        if (error) {
            setIsErrorAlert(true)

            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }
        if (updateuser?.message) {
            setIsSuccessAlert(true)

            setTimeout(() => {
                setIsSuccessAlert(false)
                dispatch(ClearUpdateUser())
            }, 3000);

        }

    }, [updateuser?.message, error, dispatch])

    const handleEdit = () => {
        setisEditing(true)
    };

    const handleExit = () => {
        setisEditing(false)
    }

    const handleOnChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSave = () => {
        dispatch(UpdateUser(value))
        setisEditing(false)
        GetUser()
    }

    return (
        <Box
            sx={
                {
                    padding: "30px",
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom right, #27877e, #f9f9f9)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }
            }
        >
            <Card
                sx={
                    {
                        maxWidth: 500,
                        width: "100%",
                        borderRadius: "15px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        backgroundColor: "#fff",
                    }
                }
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={
                            {
                                textAlign: "center",
                                color: "#27877e",
                                fontWeight: "bold",
                                marginBottom: "20px",
                            }
                        }
                    >
                        My Profile
                    </Typography>

                    {isSuccessAlert && <Alert severity="success">{updateuser?.message}</Alert>}
                    {isErrorAlert && <Alert severity="error">{error}</Alert>}

                    {/* User Details */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={value?.username}
                                InputProps={{ readOnly: !isEditing }}
                                sx={{ backgroundColor: "#f9f9f9" }}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={value?.email}
                                InputProps={{ readOnly: true }}
                                sx={{ backgroundColor: "#f9f9f9" }}
                            />
                            {isEditing && <p style={{ color: "red" }}>Email can't be changed</p>}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phonenumber"
                                value={value?.phonenumber}
                                InputProps={{ readOnly: !isEditing }}
                                sx={{ backgroundColor: "#f9f9f9" }}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={value?.city}
                                InputProps={{ readOnly: !isEditing }}
                                sx={{ backgroundColor: "#f9f9f9" }}
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box
                        sx={
                            {
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "20px",
                            }
                        }
                    >
                        {
                            !isEditing ?

                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    sx={
                                        {
                                            backgroundColor: "#27877e",
                                            "&:hover": { backgroundColor: "#206960" },
                                        }
                                    }
                                    onClick={() => handleEdit()}
                                >
                                    Edit
                                </Button>
                                :
                                <>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        sx={
                                            {
                                                backgroundColor: "#27877e",
                                                "&:hover": { backgroundColor: "#206960" },
                                            }
                                        }
                                        onClick={() => handleExit()}
                                    >
                                        Exit
                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={
                                            {
                                                backgroundColor: "#27877e",
                                                "&:hover": { backgroundColor: "#206960" },
                                            }
                                        }
                                        onClick={() => handleSave()}
                                    >
                                        Save
                                    </Button>
                                </>

                        }
                        <Button
                            variant="contained"
                            startIcon={<LockIcon />}
                            sx={
                                {
                                    backgroundColor: "#d32f2f",
                                    "&:hover": { backgroundColor: "#b71c1c" },
                                }
                            }
                            onClick={() => alert("Password change functionality coming soon!")}
                        >
                            Change Password
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;

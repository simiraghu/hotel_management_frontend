import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Grid
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllHotels } from '../../features/HotelSlice';
import { ClearRoomState, CreateRoom } from '../../features/RoomSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const Create_Room = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { hotels } = useSelector((state) => state?.hotels)
    const { room, error } = useSelector((state) => state?.rooms)

    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [isSuccessAlert, setIsSuccessAlert] = useState(false)

    const [value, setValue] = useState(
        {
            hotelId: '',
            roomtype: '',
            description: '',
            price: '',
            image: []
        }
    )

    useEffect(() => {
        dispatch(GetAllHotels())
    }, [])

    const handleOnChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleImageChange = (e) => {

        setValue(
            {
                ...value,
                image: [...value?.image, e.target.files[0]]
            }
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(value, "value")
        const formData = new FormData()
        formData.append('hotelId', value?.hotelId)
        formData.append('roomtype', value?.roomtype)
        formData.append('price', value?.price)
        formData.append('description', value?.description)

        value?.image?.forEach((file) => {
            formData.append('image', file)
        })

        dispatch(CreateRoom(formData))
    }

    useEffect(() => {

        if (error) {
            setIsErrorAlert(true)
            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }

        if (room?.message) {
            setIsSuccessAlert(true)
            setTimeout(() => {
                setIsSuccessAlert(false)
                navigate('/rooms')
                ClearRoomState()
            }, 3000)
        }
    }, [dispatch, navigate, room?.message, error])

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={
                    {
                        maxWidth: "600px",
                        margin: "auto",
                        mt: 5,
                        p: 3,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                    }
                }

            >
                <Typography variant="h5" gutterBottom>
                    Create Room
                </Typography>


                {isSuccessAlert && <Alert severity="success">{room?.message}</Alert>}
                {isErrorAlert && <Alert severity="error">{error}</Alert>}

                {/* Hotel Dropdown */}
                <FormControl fullWidth margin="normal" sx={{ mt: 1 }}>
                    <InputLabel id="hotel-select-label">Select Hotel</InputLabel>
                    <Select
                        labelId="hotel-select-label"
                        id="hotel-select"
                        name='hotelId'
                        value={value?.hotelId}
                        onChange={(e) => handleOnChange(e)}
                        fullWidth>
                        {
                            hotels?.length > 0 ? hotels.map((hotel) => (
                                <MenuItem value={hotel?._id}>{hotel?.name}</MenuItem>

                            )) : <p>No hotels found.</p>
                        }
                    </Select>
                </FormControl>

                {/* Room Type Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="roomtype-select-label">Room Type</InputLabel>
                    <Select
                        labelId="roomtype-select-label"
                        id="roomtype-select"
                        name="roomtype"
                        value={value?.roomtype}
                        onChange={(e) => handleOnChange(e)}
                        fullWidth
                    >
                        <MenuItem value="Deluxe">Deluxe</MenuItem>
                        <MenuItem value="Family">Family</MenuItem>
                    </Select>
                </FormControl>

                {/* Description */}
                <TextField
                    label="Description"
                    placeholder="Enter room description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name='description'
                    value={value?.description}
                    onChange={(e) => handleOnChange(e)}
                    multiline
                    rows={3}
                />

                {/* Price */}
                <TextField
                    label="Price"
                    placeholder="Enter price per night"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name='price'
                    value={value?.price}
                    onChange={(e) => handleOnChange(e)}
                    type="number"
                />

                {/* Upload Images Button */}
                <Grid item xs={12}>
                    <Typography
                        variant="body1"
                        mb={1}>
                        Upload Images
                    </Typography>

                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AddPhotoAlternateIcon />}
                    >
                        Upload
                        <input
                            type="file"
                            accept="image/*"
                            name='image'
                            onChange={(e) => handleImageChange(e)}
                            multiple
                            hidden
                        />
                    </Button>

                    <Typography
                        variant="caption"
                        display="block"
                        mt={1}>
                        {value?.image?.length} file(s) selected
                    </Typography>
                </Grid>

                {/* Submit Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={
                        {
                            mt: 3,
                            backgroundColor: '#27877e'
                        }
                    }
                    type='submit'
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};

export default Create_Room;

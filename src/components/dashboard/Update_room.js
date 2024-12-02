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
    Grid,
    IconButton
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllHotels } from '../../features/HotelSlice';
import { ClearRoomState, GetRoomById, UpdateRoom } from '../../features/RoomSlice';
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import Alert from '@mui/material/Alert'

const Create_Room = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { hotels } = useSelector((state) => state?.hotels)
    const { room, error, updateroom } = useSelector((state) => state?.rooms)

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

    const searchParams = new URLSearchParams(location.search)
    const roomId = searchParams.get('roomId')

    useEffect(() => {
        dispatch(GetAllHotels())
        dispatch(GetRoomById(roomId))

        setValue(
            {
                hotelId: room?.hotelId,
                roomtype: room?.roomtype,
                description: room?.description,
                price: room?.price,
                image: room?.image
            }
        )
    }, [dispatch, room?.hotelId])


    useEffect(() => {
        if (error) {
            setIsErrorAlert(true)
            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }

        if (updateroom?.message) {
            setIsSuccessAlert(true)
            setTimeout(() => {
                setIsSuccessAlert(false)
                navigate('/rooms')
                dispatch(ClearRoomState())
            }, 3000);
        }

    }, [error, updateroom?.message])


    const handleOnChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleDeleteImage = (index) => {
        const filteredImage = value?.image?.filter((_, i) => i !== index)
        setValue(
            {
                ...value,
                image: [...filteredImage]
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

        dispatch(UpdateRoom({ value: formData, roomId: roomId }))

    }

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
                    Update Room
                </Typography>

                {isErrorAlert && <Alert color="error">{error}</Alert>}
                {isSuccessAlert && <Alert color="success">{updateroom?.message}</Alert>}

                {/* Hotel Dropdown */}
                <FormControl fullWidth margin="normal">
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

                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {value?.image?.map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                }}
                            >
                                <Avatar
                                    alt="image"
                                    src={img}
                                    sx={{
                                        width: 56,
                                        height: 56,
                                    }}
                                />
                                <IconButton
                                    onClick={() => handleDeleteImage(index)} // Call a function to handle deletion
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        color: 'white',
                                        width: 20,
                                        height: 20,
                                    }}
                                >
                                    <CancelIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
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

import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Grid, Typography, Chip, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from 'react-redux';
import { ClearState, CreateHotel } from '../../features/HotelSlice'
import { useNavigate } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import Alert from "@mui/material/Alert";

const Create_hotel = () => {



    const validate = () => {
        let newErrors = {};
        if (!value?.name?.length < 3) {
            newErrors.nameError = "Name value must be 3 charactar long"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value?.email)) {
            newErrors.emailError = "Please write a valid email"
        }

        if (!value?.contactNo?.length < 10) {
            newErrors.contactNoError = "Contact number must be 10 charactar long"
        }

        if (!value?.description?.length < 22) {
            newErrors.descriptionError = "Description must be 22 charactor long"
        }

        if (value?.facilities?.length < 3) {
            newErrors.facilitiesError = "Please add more than 3 facilities"
        }

        if (value?.image?.length < 2) {
            newErrors.imageError = "Please add more than 2 images"
        }

        setInputErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const [facilitiesInput, setFacilitiesInput] = useState("")
    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [isSuccessAlert, setIsSuccessAlert] = useState(false)
    const [inputErrors, setInputErrors] = useState({})
    const [value, setValue] = useState(
        {
            name: '',
            email: '',
            contactNo: '',
            city: '',
            address: '',
            description: '',
            facilities: [],
            image: []
        }
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, hotel } = useSelector((state) => state?.hotels)

    const handleOnChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
        setInputErrors({})
    }

    const handleAddFacilities = () => {
        if (facilitiesInput) {
            setValue(
                {
                    ...value,
                    facilities: [...value?.facilities, facilitiesInput],
                }
            );
            setFacilitiesInput("");
        }
    }

    const handleDeleteFacilities = (index) => {
        const filteredValue = value?.facilities?.filter((_, i) => i !== index)
        setValue(
            {
                ...value,
                facilities: [...filteredValue]
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


    const handleOnsubmit = (e) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        const formdata = new FormData()

        formdata.append('name', value?.name)
        formdata.append('email', value?.email)
        formdata.append('contactNo', value?.contactNo)
        formdata.append('description', value?.description)
        formdata.append('city', value?.city)
        formdata.append('address', value?.address)

        value?.facilities?.forEach((fac) => {
            formdata?.append('facilities', fac)
        })

        value?.image.forEach((file) => {
            formdata?.append('image', file)
        })

        dispatch(CreateHotel(formdata))

    }

    useEffect(() => {

        if (error) {
            setIsErrorAlert(true)
            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }

        if (hotel?.message) {
            setIsSuccessAlert(true)

            setTimeout(() => {
                setIsSuccessAlert(false)
                navigate('/hotels')
                dispatch(ClearState())
            }, 3000);

        }
    }, [error, hotel, hotel?.message, navigate, dispatch])


    const handleImageChange = (e) => {

        setValue(
            {
                ...value,
                image: [...value?.image, e.target.files[0]]
            }
        )
    }


    return (
        <Box
            sx={
                {
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }
            }
        >
            <Typography
                variant="h4"
                mb={3}
                textAlign="center"
                fontWeight="bold">
                Create Hotel
            </Typography>

            {isSuccessAlert && <Alert severity="success">{hotel?.message}</Alert>}
            {isErrorAlert && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleOnsubmit} style={{ marginTop: '15px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Hotel Name"
                            name="name"
                            value={value?.name}
                            onChange={(e) => handleOnChange(e)}
                            required
                        />
                        {inputErrors?.nameError && <p style={{ color: "red" }}>{inputErrors?.nameError}</p>}
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={value?.email}
                            onChange={(e) => handleOnChange(e)}
                            required
                        />
                        {inputErrors?.emailError && <p style={{ color: "red" }}>{inputErrors?.emailError}</p>}
                    </Grid>

                    {/* Contact No */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact No"
                            name="contactNo"
                            value={value?.contactNo}
                            onChange={(e) => handleOnChange(e)}
                            type="tel"
                            required
                        />
                        {inputErrors?.contactNoError && <p style={{ color: "red" }}>{inputErrors?.contactNoError}</p>}
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={value?.address}
                            onChange={(e) => handleOnChange(e)}
                            required
                        />

                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={value?.city}
                            onChange={(e) => handleOnChange(e)}
                            required
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="description"
                            value={value?.description}
                            onChange={(e) => handleOnChange(e)}
                            required
                        />
                        {inputErrors?.descriptionError && <p style={{ color: "red" }}>{inputErrors?.descriptionError}</p>}
                    </Grid>

                    {/* Facilities */}
                    <Grid item xs={12}>
                        <Typography variant="body1" mb={1}>
                            Facilities
                        </Typography>

                        <Box
                            display="flex"
                            alignItems="center"
                            gap={2}>
                            <TextField
                                fullWidth
                                label="Add Facility"
                                value={facilitiesInput}
                                name="facilities"
                                onChange={(e) => setFacilitiesInput(e.target.value)}
                            />

                            <Button
                                variant="contained"
                                sx={
                                    {
                                        backgroundColor: '#27877e'
                                    }
                                }
                                onClick={handleAddFacilities}
                            >
                                Add
                            </Button>
                            {inputErrors?.facilitiesError && <p style={{ color: "red" }}>{inputErrors?.facilitiesError}</p>}
                        </Box>

                        <Box
                            mt={2}
                            display="flex"
                            flexWrap="wrap"
                            gap={1}>
                            {
                                value?.facilities?.map((facility, index) => (
                                    <Chip
                                        key={index}
                                        label={facility}
                                        onDelete={() => handleDeleteFacilities(index)}
                                        deleteIcon={<CancelIcon sx={{ color: 'white' }} />}
                                        sx={
                                            {
                                                backgroundColor: '#27877e',
                                                color: '#fff'
                                            }
                                        }
                                    />
                                ))
                            }
                        </Box>
                    </Grid>

                    {/* Image Upload */}
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
                            {inputErrors?.imageError && <p style={{ color: "red" }}>{inputErrors?.imageError}</p>}
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

                    {/* Submit */}
                    <Grid item xs={12} mt={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={
                                {
                                    backgroundColor: "#27877e"
                                }
                            }
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Create_hotel
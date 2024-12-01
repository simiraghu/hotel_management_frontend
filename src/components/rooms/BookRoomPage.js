import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Grid,
    Card,
    Paper,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetRoomById } from '../../features/RoomSlice'
import { CreateBooking } from '../../features/BookingSlice'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { CardElement, CardCvcElement, CardNumberElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import moment from 'moment';
import SuccessPopUp from '../SuccessPopUp';
import { ManageBookingState } from '../../features/BookingSlice'

const BookingPage = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
    const steps = ["User Details", "Room Details", "Payment"];

    const dispatch = useDispatch()
    const location = useLocation()

    const { room } = useSelector((state) => state?.rooms)
    const { booking } = useSelector((state) => state?.booking)

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const searchParams = new URLSearchParams(location.search)
    const roomId = searchParams.get('roomId')


    useEffect(() => {
        dispatch(GetRoomById(roomId))
    }, [dispatch, room?.roomtype])


    const [value, setValue] = useState(
        {
            fullname: '',
            email: '',
            phone_number: '',
            address: '',
            check_in_date: '',
            check_out_date: '',
            guests: '',
            roomId: roomId,
            payment_details: '',
            price: room?.price
        }
    )

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }


    const ChECK_IN_DATE_ISO = moment(value?.check_in_date, 'YYYY-MM-DD').toISOString()
    const CHECK_OUT_DATE_ISO = moment(value?.check_out_date, 'YYYY-MM-DD').toISOString()


    const handleOnSubmit = async (e) => {

        e.preventDefault()
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod(
            {
                type: 'card',
                card: cardElement,
            }
        );

        console.log(paymentMethod, "<<<<<<paymentMethod")

        if (error) {
            console.error(error);
            // setLoading(false);
            return;
        }

        if (paymentMethod) {
            dispatch(CreateBooking(
                {
                    fullname: value?.fullname,
                    email: value?.email,
                    phone_number: value?.phone_number,
                    address: value?.address,
                    check_in_date: ChECK_IN_DATE_ISO,
                    check_out_date: CHECK_OUT_DATE_ISO,
                    guests: value?.guests,
                    roomId: value?.roomId,
                    amount: room?.price,
                    currency: 'USD',
                    paymentMethodId: paymentMethod?.id
                }
            ))
        }
    }


    useEffect(() => {

        if (booking?.payment_details?.status === 'succeeded') {
            setShowSuccessPopUp(true)
        }

    }, [booking])

    const handleClose = () => {
        setShowSuccessPopUp(false);
        dispatch(ManageBookingState())
        navigate('/')
    };


    const renderStepContent = (step) => {

        switch (step) {

            case 0:
                return (
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Enter Your Details

                        </Typography>
                        <Grid container spacing={3} mt={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name='fullname'
                                    value={value?.fullname}
                                    onChange={(e) => handleOnChange(e)}
                                    variant="outlined" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name='email'
                                    value={value?.email}
                                    onChange={(e) => handleOnChange(e)}
                                    variant="outlined" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type='number'
                                    label="Phone Number"
                                    name='phone_number'
                                    value={value?.phone_number}
                                    onChange={(e) => handleOnChange(e)}
                                    variant="outlined" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name='address'
                                    value={value?.address}
                                    onChange={(e) => handleOnChange(e)}
                                    variant="outlined" />
                            </Grid>
                        </Grid>
                    </Box>
                );

            case 1:
                return (
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Select Room and Dates

                        </Typography>

                        <Grid container spacing={3} mt={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Check-in Date"
                                    type="date"
                                    name='check_in_date'
                                    value={value?.check_in_date}
                                    onChange={(e) => handleOnChange(e)}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Check-out Date"
                                    type="date"
                                    name="check_out_date"
                                    value={value?.check_out_date}
                                    onChange={(e) => handleOnChange(e)}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Number of Guests"
                                    type="number"
                                    name='guests'
                                    value={value?.guests}
                                    onChange={(e) => handleOnChange(e)}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
                                <Card elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6">{room?.roomtype}</Typography>
                                    <Typography>Price: {room?.price} per 24 hours</Typography>
                                    <Typography>{room?.description}</Typography>

                                    <Stack direction="row" spacing={2}>
                                        {
                                            room?.image?.map((img) => (
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={img}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            ))
                                        }
                                    </Stack>
                                </Card>
                            </Grid>


                        </Grid>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Payment Details

                        </Typography>


                        <CardElement>
                            <CardNumberElement />
                            <CardCvcElement />
                            <CardExpiryElement />
                        </CardElement>

                    </Box>
                );
            default:
                return "Unknown Step";
        }
    };

    return (
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <Box
                sx={
                    {
                        minHeight: "100vh",
                        background: "linear-gradient(120deg, #f5f5f5, #e0f7fa)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 4,
                        px: 2,
                    }
                }
            >
                <Paper
                    elevation={3}
                    sx={
                        {
                            maxWidth: "800px",
                            width: "100%",
                            p: 4,
                            borderRadius: 2,
                            background: "#ffffff",
                        }
                    }
                >
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {
                            steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>

                    <Box mt={4} >{renderStepContent(activeStep)}</Box>

                    {
                        showSuccessPopUp
                        &&
                        <SuccessPopUp
                            show={showSuccessPopUp}
                            onClose={handleClose}
                        />
                    }

                    <Box
                        mt={4}
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Button
                            variant="outlined"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={
                                {
                                    px: 3,
                                    py: 1,
                                    color: 'white',
                                    backgroundColor: "#27877e",
                                    ":hover": {
                                        backgroundColor: "#27877e"
                                    },
                                }
                            }
                        >
                            Back
                        </Button>

                        {
                            activeStep !== steps.length - 1 ?
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={
                                        {
                                            px: 3,
                                            py: 1,
                                            backgroundColor: "#27877e",
                                            ":hover": {
                                                backgroundColor: "#27877e"
                                            },
                                        }
                                    }
                                    disabled={!stripe}
                                >
                                    Next
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    type='submit'
                                    sx={
                                        {
                                            px: 3,
                                            py: 1,
                                            backgroundColor: "#27877e",
                                            ":hover": {
                                                backgroundColor: "#27877e"
                                            },
                                        }
                                    }
                                    disabled={!stripe}
                                >
                                    Pay & Book
                                </Button>
                        }
                    </Box>
                </Paper>
            </Box>
        </form>
    );
};

export default BookingPage;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate()
  const [value, setValue] = useState(
    {
      check_in_date: "",
      check_out_date: "",
      roomtype: "Deluxe"
    }
  )

  const handleOnChange = (e) => {
    setValue(
      {
        ...value,
        [e.target.name]: e.target.value
      }
    )
  }

  // const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // dispatch(GetAllRooms(
    //   {
    //     check_in_date: moment(value?.check_in_date).toISOString(),
    //     check_out_string: moment(value?.check_out_date).toISOString(),
    //     roomtype: value?.roomtype
    //   }
    // ))
    navigate(`/rooms?check_in_date=${value?.check_in_date}&check_out_date=${value?.check_out_date}&roomtype=${value?.roomtype}`)
  }

  const theme = useTheme();

  return (
    <Box
      sx={
        {
          background: "linear-gradient(120deg, #f5f5f5, #e0f7fa)",
          // marginBottom: '5vh'
        }
      }>

      <Box
        sx={
          {
            position: 'relative',
            height: '45vh',
            backgroundSize: 'cover',
            color: '#27877e',
            [theme.breakpoints.down('sm')]: {
              height: '70vh'
            },
          }
        }>

        <Box
          sx={
            {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
            }
          } />

        <Box
          sx={
            {
              position: 'relative',
              textAlign: 'center',
              paddingTop: '10vh',
              m: 6
            }
          }>

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={
              {
                [theme.breakpoints.down('sm')]: {
                  fontSize: '40px'
                }
              }
            }
          >
            Welcome to WayToStay
          </Typography>

          <Typography
            variant="h6"
            m={4}
          >
            Book your stay with exclusive offers and enjoy premium services.
          </Typography>

          <Box
            onSubmit={handleOnSubmit}
            sx={
              {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '9px',
                gap: '3px',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  gap: '15px'
                }
              }
            }
          >
            <TextField
              label="Check-in Date"
              type="date"
              InputLabelProps={
                {
                  shrink: true
                }
              }
              name="check_in_date"
              value={value?.check_in_date}
              onChange={(e) => handleOnChange(e)}
              sx={
                {
                  bgcolor: 'white',
                  borderRadius: 1
                }
              } />

            <TextField
              label="Check-out Date"
              type="date"
              name="check_out_date"
              value={value?.check_out_date}
              onChange={(e) => handleOnChange(e)}
              InputLabelProps={
                {
                  shrink: true
                }
              }
              sx={
                {
                  bgcolor: 'white',
                  borderRadius: 1
                }
              } />

            <TextField
              label="Room Type"
              select
              name="roomtype"
              value={value?.roomtype}
              onChange={(e) => handleOnChange(e)}
              SelectProps={
                {
                  native: true
                }
              }
              sx={
                {
                  bgcolor: 'white',
                  borderRadius: 1
                }
              }>
              <option value="Deluxe">Deluxe</option>
              <option value="Family">Family</option>
            </TextField>

            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ backgroundColor: "#27877e" }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: '2rem 5%',
          mt: 5
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
          sx={{ color: "#27877e" }}
        >
          Explore Our Rooms
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center", // Align items center on smaller screens
          }}
        >
          <Grid
            item
            xs={12} // Full width on extra small screens
            sm={6} // Half width on small screens
            md={4} // One-third width on medium and above
          >
            <Card
              sx={{
                boxShadow: 9,
                width: "100%", // Ensure card takes full width of its grid
              }}
            >
              <CardMedia
                component="img"
                height="270"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRGNW-M-V8EWI8whEZMDDqj0a7w1GuJwMvrQ&s"
                alt="hotels"
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Luxury Hotels
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Luxury hotels with all the facilities and the pool, club etc.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#27877e",
                  }}
                  onClick={() => navigate('/hotels')}
                >
                  View Hotels
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              sx={{
                boxShadow: 9,
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="270"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9MpzUXrsqDpQFFXMFed7zy2bxb7du-SMqHQ&s"
                alt="rooms"
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Luxury Rooms
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Luxury Room with sea view
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#27877e",
                  }}
                  onClick={() => navigate('/rooms')}
                >
                  View Rooms
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>


      {/* Amenities Section */}
      <Box
        sx={
          {
            padding: '2rem 5%',
            backgroundColor: '#27877e',
            textAlign: 'center'
          }
        }>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
        >
          Amenities & Services
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center">

          <Grid
            item
            xs={6}
            sm={3}>

            <Typography
              variant="h6"
            >
              Free Wi-Fi
            </Typography>

          </Grid>

          <Grid
            item
            xs={6}
            sm={3}>

            <Typography
              variant="h6"
            >
              Room Service
            </Typography>

          </Grid>

          <Grid
            item
            xs={6}
            sm={3}>

            <Typography
              variant="h6"
            >
              Pool & Spa
            </Typography>

          </Grid>

          <Grid
            item
            xs={6}
            sm={3}>

            <Typography
              variant="h6"
            >
              Gym Access
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage; 
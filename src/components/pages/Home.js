import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate()

  return (
    <Box
      sx={
        {
          background: "linear-gradient(120deg, #f5f5f5, #e0f7fa)",
          marginBottom: '5vh'
        }
      }>

      <Box
        sx={
          {
            position: 'relative',
            height: '50vh',
            backgroundSize: 'cover',
            color: '#27877e'
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
          >
            Welcome to WayToStay
          </Typography>

          <Typography
            variant="h6"
            mt={2}
          >
            Book your stay with exclusive offers and enjoy premium services.
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            mt={4}
            gap={2}>

            <TextField
              label="Check-in Date"
              type="date"
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
              label="Check-out Date"
              type="date"
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
              <option value="Suite">Suite</option>
              <option value="Executive">Executive</option>
            </TextField>

            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#27877e" }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={
          {
            padding: '2rem 5%'
          }
        }>

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
          sx={
            {
              display: "flex",
              justifyContent: "space-around"
            }
          }
        >

          <Grid
            item
            xs={12}
            sm={6}
            mb={5}
            md={4}>

            <Card
              sx={
                {
                  boxShadow: 9,
                  width: "30vw"
                }
              }>

              <CardMedia
                component="img"
                height="270"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRGNW-M-V8EWI8whEZMDDqj0a7w1GuJwMvrQ&s"
                alt="hotels"
              />

              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Luxury Hotels
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Luxury hotels with all the facilities and the pool, club etc.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={
                    {
                      mt: 2,
                      backgroundColor: "#27877e"
                    }
                  }
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
            md={4}>

            <Card
              sx={
                {
                  boxShadow: 9,
                  width: "30vw"
                }
              }>

              <CardMedia
                component="img"
                height="270"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9MpzUXrsqDpQFFXMFed7zy2bxb7du-SMqHQ&s"
                alt="rooms"
              />

              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Luxury Rooms
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Luxury Room with sea view
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={
                    {
                      mt: 2,
                      backgroundColor: "#27877e"
                    }
                  }
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

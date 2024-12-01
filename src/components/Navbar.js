import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { GetUserDetails, LogOut } from '../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuAppBar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isSideBar, setIsSideBar] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state?.users)


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSidebar = (open) => {
        setIsSideBar(open)
    }

    const handleLogout = () => {
        dispatch(LogOut())
        handleClose()
        navigate('/login')

    }

    const handleMyAccount = () => {
        navigate('/my_account')
        handleClose()
    }

    const handleMyBookings = () => {
        navigate('/my_bookings')
        handleClose()
    }

    const GetUser = () => {
        dispatch(GetUserDetails())
    }

    useEffect(() => {

        if (user) {
            GetUser()
        }

    }, [dispatch, navigate])

    return (
        <>
            <Box sx={
                {
                    flexGrow: 1,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000,
                }
            }>

                <AppBar
                    position="static"
                    sx={
                        {
                            backgroundColor: "#27877e"
                        }
                    }>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon onClick={() => handleSidebar(true)} />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={
                                {
                                    flexGrow: 1,
                                    m: 2
                                }
                            }
                        >
                            WayToStay
                        </Typography>
                        
                        {

                            user?.role === 'admin' &&
                            <Typography
                                variant="h6"
                                component="div"
                                sx={
                                    {
                                        flexGrow: 1,
                                        m: 2,
                                        cursor: 'pointer'
                                    }
                                }
                                onClick= {() => navigate('/dashboard')}
                            >
                                Dashboard
                            </Typography>
                            
                        }

                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={
                                    {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }
                                }
                                keepMounted
                                transformOrigin={
                                    {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }
                                }
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {
                                    localStorage.getItem('token') ?
                                        <MenuItem onClick={() => handleLogout()}>Log out</MenuItem> :
                                        <MenuItem onClick={() => {
                                            handleClose()
                                            navigate('/login')
                                        }}>
                                            Log In
                                        </MenuItem>
                                }
                                <MenuItem onClick={() => handleMyAccount()}>My account</MenuItem>
                                <MenuItem onClick={() => handleMyBookings()}>My Bookings</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            {isSideBar && <Sidebar isSideBar={isSideBar} onClose={() => handleSidebar(false)} />}
        </>
    );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import HouseIcon from '@mui/icons-material/House';
import { useNavigate } from 'react-router-dom';


export default function TemporaryDrawer({ isSideBar, onClose }) {

  const navigate = useNavigate()

  const DrawerList = (
    <Box
      sx={
        {
          width: 250
        }
      }
      role="presentation"
      onClick={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ApartmentIcon sx={{ color: "#27877e" }} />
            </ListItemIcon>

            <ListItemText
              primary="Hotels"
              onClick={() => navigate('/hotels')} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MeetingRoomIcon sx={{ color: "#27877e" }} />
            </ListItemIcon>

            <ListItemText
              primary="Room"
              onClick={() => navigate('/rooms')} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HouseIcon sx={{ color: "#27877e" }} />
            </ListItemIcon>

            <ListItemText
              primary="Home"
              onClick={() => navigate('/')} />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PhoneForwardedIcon sx={{ color: "#27877e" }} />
            </ListItemIcon>

            <ListItemText
              primary="Contact"
              onClick={() => navigate('/contact')} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>

    </Box>
  );

  return (
    <div>
      <Drawer
        open={isSideBar}
        onClose={onClose}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

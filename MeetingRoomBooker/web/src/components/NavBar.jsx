import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BallotIcon from '@mui/icons-material/Ballot';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const NavBar = () => {
    const userOptions = [
        {
            label: "Home",
            path: "/home",
            icon: <HomeIcon />
        },
        {
            label: "Account",
            path: "/account",
            icon: <AccountIcon />
        },
        {
            label: "Bookings",
            path: "/booking-list",
            icon: <BallotIcon />
        },
        {
            label: "RoomBooking",
            path: "/booking",
            icon: <AddHomeIcon />
        },
        {
            label: "Rooms",
            path: "/room-list",
            icon: <MeetingRoomIcon />
        }

    ];

    const [selected, setSelected] = React.useState(null);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component={Link} to="/home" sx={{ textDecoration: 'none', color: 'white' }}>
                        Room Booking
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List >
                        {userOptions.map((option, index) => (
                            <ListItem key={option.label} disablePadding component={Link} to={option.path}
                                sx={{
                                    textDecoration: 'none',
                                    backgroundColor: selected === index ? '#eff6ff' : 'inherit',
                                    color: selected === index ? '#2563eb' : 'inherit',
                                    '&:hover': { backgroundColor: '#f9fafb' }
                                }}
                                onClick={() => setSelected(index)}
                            >
                                <ListItemButton>
                                    <ListItemIcon sx={{
                                        color: selected === index ? '#2563eb' : 'inherit'
                                    }}>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default NavBar;
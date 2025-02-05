import React from "react";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import RoomList from "./pages/RoomList";
import BookingList from "./pages/BookingList";
import Account from "./pages/Account";
import Home from "./pages/Home";


const routes = [
    {
        path: "/",
        element: <Index />,
        children: [
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/account",
                element: <Account />,
            },
            {
                path: "/booking",
                element: <Booking />,
            },
            {
                path: "/room-list",
                element: <RoomList />,
            },
            {
                path: "/booking-list",
                element: <BookingList />,
            }
        ]
    },
]

export default routes;
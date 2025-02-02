import React from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import RoomList from "./pages/RoomList";
import BookingList from "./pages/BookingList";
import Account from "./pages/Account";


const routes = [
    {
        path: "/",
        element: <Home />,
        children: [
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
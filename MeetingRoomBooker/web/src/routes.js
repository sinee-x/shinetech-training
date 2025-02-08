import React from "react";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Booking from "./pages/Booking";
import RoomList from "./pages/RoomList";
import AuthGuard from "./components/AuthGuard";
import BookingList from "./pages/BookingList";
import Account from "./pages/Account";
import Home from "./pages/Home";

const routes = [
    {
        path: "/",
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "booking",
                element: <Booking />,
            },
            {
                path: "room-list",
                element: <RoomList />,
            },
            {
                path: "booking-list",
                element: <BookingList />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
];

export default routes;

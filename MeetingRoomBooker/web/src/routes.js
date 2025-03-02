import React from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Booking from "./pages/Booking";
import RoomList from "./pages/RoomList";
import AuthGuard from "./components/AuthGuard";
import User from "./pages/User";
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
                path: "/",
                element: <Home />,
            },
            {
                path: "user",
                element: <User />,
            },  
            {
                index: true,
                path: "booking",
                element: <Booking />,
            },
            {
                path: "room-list",
                element: <RoomList />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
];

export default routes;

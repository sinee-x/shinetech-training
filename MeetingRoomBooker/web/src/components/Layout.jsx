import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <NavBar setDrawerOpen={setDrawerOpen} />
            <Box ml={drawerOpen ? 32 : 11} mt={10}>
                <Outlet />
            </Box>
        </>
    );
}

export default Layout;

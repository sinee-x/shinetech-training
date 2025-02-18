import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
        <>
            <NavBar setDrawerOpen={setDrawerOpen} />
            <Box sx={[
                { marginTop: '80px', paddingRight: '16px', transition: 'margin-left 0.3s ease' },
                drawerOpen ? { marginLeft: '256px' } : { marginLeft: '80px' }
            ]} >
                <Outlet />
            </Box >
        </>
    );
}

export default Layout;

import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavBar />
            <Box ml={32} mt={10}>
                <Outlet />
            </Box>
        </>
    )
}
export default Layout;

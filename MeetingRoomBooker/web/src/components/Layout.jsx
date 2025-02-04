import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <NavBar />
            <Box ml={21} mr={21} mt={2}>
                <Outlet />
            </Box>
        </>
    )
}
export default Layout;

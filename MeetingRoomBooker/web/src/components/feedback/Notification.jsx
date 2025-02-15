import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const Notification = ({ state, handleClose }) => {

    const { vertical, horizontal, open, message, severity } = state;
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notification;
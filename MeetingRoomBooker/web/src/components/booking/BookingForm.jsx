import React, { useEffect } from "react";
import { useState } from "react";
import { Fade, Modal } from "@mui/material";
import { Backdrop } from "@mui/material";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Notification from "../feedback/Notification";
import { addMeetingRoom, updateMeetingRoom } from "../../services/meetingRoomService";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const initialState = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: 'success',
    message: 'Meeting room added successfully'
}

const initialRoom = {
    roomName: "",
    capacity: 0,
    status: "Available",
    roomType: "",
    availableTime: "",
    notes: "",
}
const RoomForm = ({ open, handleClose, onSaveSuccess, roomData }) => {
    const [formData, setFormData] = useState(initialRoom)
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (roomData) {
            setFormData(roomData);
        }
        else {
            setFormData(initialRoom);
        }
    }, [roomData]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            if (roomData) {
                await handleEditRoom();
            }
            else {
                await handleAddRoom();
            }
        }
        catch (error) {

        }
    }

    const handleAddRoom = async () => {
        const roomJson = JSON.stringify(formData);
        const response = await addMeetingRoom(roomJson);
        if (response.statusCode === 201) {
            handleClose()
            if (onSaveSuccess) {
                onSaveSuccess();
                setState({ ...initialState, open: true, message: "Meeting room added successfully" });
                setFormData(initialRoom);
            }
            return;
        }
        console.log("Failed to add room", response.data.message);
    }

    const handleEditRoom = async () => {
        const data = {
            ...formData,
            "id": roomData.id
        }
        const roomJson = JSON.stringify(data);
        const response = await updateMeetingRoom(roomData.id, roomJson);
        if (response.statusCode === 200) {
            handleClose()
            if (onSaveSuccess) {
                onSaveSuccess();
                setState({ ...initialState, open: true, message: "Meeting room updated successfully" });
                setFormData(initialRoom);
            }
            return;
        }
        console.log("Failed to update room", response.data.message);
    }

    const handleNotificationClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title"
                            sx={{
                                position: 'absolute',
                                fontSize: '18px',
                                top: '15px'
                            }}
                        >{'Booking Meeting Room'}</Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }} autoComplete="off">
                            <TextField
                                label="RoomName"
                                name="roomName"
                                value={formData.roomName}
                                onChange={(e) => onChange(e)}
                                disabled={true}
                            />
                            <TextField
                                label="Capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={(e) => onChange(e)}
                                disabled={true}
                            />

                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-amount">Duration of Meeting</InputLabel>
                                <OutlinedInput
                                    endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                                    label="Duration of Meeting"
                                    type="number"
                                />
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Start Time"
                                    value={formData.startTime}
                                    onChange={(newValue) => {
                                        setFormData({ ...formData, startTime: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    disablePast
                                    defaultValue={dayjs()}
                                />
                            </LocalizationProvider>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                                <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSave}>Save</Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Notification state={state} handleClose={handleNotificationClose} />
        </>
    );
}

export default RoomForm;

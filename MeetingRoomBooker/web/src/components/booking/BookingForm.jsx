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
import { addBooking } from "../../services/bookingService";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import { useAuth } from "../../auth/AuthContext";


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
    message: 'Meeting room booked successfully'
}

const initialBookingRoom = {
    userId: "",
    roomId: "",
    roomName: "",
    capacity: "",
    startTime: dayjs().add(2, 'hour').startOf('hour'),
    endTime: null,
    duration: 60,
    status: "NotStart",
    subject: ""
}

const today = dayjs().add(2, 'hour').startOf('hour');
const RoomForm = ({ open, handleClose, roomData, isNewBooking }) => {
    const [formData, setFormData] = useState(initialBookingRoom)
    const [state, setState] = useState(initialState);
    const { user } = useAuth();

    useEffect(() => {
        if (isNewBooking && roomData) {
            const data = {
                ...initialBookingRoom,
                userId: user.id,
                roomId: roomData.id,
                roomName: roomData.roomName,
                capacity: roomData.capacity,
                startTime: today,
                duration: 0,
                endTime: today.add(0, 'minute'),
                status: "NotStart",
                subject: ""
            }
            setFormData(data);
        }
        else {
            setFormData(initialBookingRoom);
        }
    }, [roomData, isNewBooking, user]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onChangeDuration = (e) => {
        const value = Number(e.target.value);

        setFormData(prevFormData => ({
            ...prevFormData,
            duration: value,
            endTime: today.add(value, 'minute')
        }));
    }

    const onChangeDataTime = (newValue) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            startTime: newValue,
            endTime: newValue.add(formData.duration, 'minute') // 使用当前 duration 更新 endTime  
        }));
    }

    const handleSave = async () => {
        try {
            if (isNewBooking) {
                await handleAddBooking();
            }
        }
        catch (error) {

        }
    }

    const handleAddBooking = async () => {
        const { duration, roomName, capacity, ...data } = formData;
        const roomJson = JSON.stringify(data);
        const response = await addBooking(roomJson);
        if (response.statusCode === 201) {
            handleClose()
            setState({ ...initialState, open: true, message: "Meeting room booked successfully" });
            setFormData(initialBookingRoom);
            return;
        }
        console.log("Failed to add room", response.data.message);
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
                                disabled={true}
                            />
                            <TextField
                                label="Capacity"
                                name="capacity"
                                value={formData.capacity}
                                disabled={true}
                            />
                            <TextField
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={(e) => onChange(e)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Start Time"
                                    value={formData.startTime}
                                    onChange={onChangeDataTime}
                                    defaultValue={today}
                                    name="startTime"
                                    disablePast
                                />
                            </LocalizationProvider>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="outlined-adornment-amount">Duration of Meeting</InputLabel>
                                <OutlinedInput
                                    endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                                    label="Duration of Meeting"
                                    type="number"
                                    onChange={(e) => onChangeDuration(e)}
                                />
                            </FormControl>
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

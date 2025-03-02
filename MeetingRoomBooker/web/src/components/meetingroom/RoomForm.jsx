import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { addMeetingRoom, updateMeetingRoom } from "../../services/meetingRoomService";
import Notification from "../feedback/Notification";

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

const RoomForm = ({ title, open, handleClose, onRoomSaveSuccess, roomData }) => {
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
            handleClose();
            if (onRoomSaveSuccess) {
                onRoomSaveSuccess();
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
            "id": roomData?.id
        }
        const roomJson = JSON.stringify(data);
        const response = await updateMeetingRoom(roomData?.id, roomJson);
        if (response.statusCode === 200) {
            handleClose();
            if (onRoomSaveSuccess) {
                onRoomSaveSuccess();
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
                        >{title}</Typography>
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
                                required
                                label="RoomName"
                                name="roomName"
                                value={formData.roomName}
                                onChange={(e) => onChange(e)}
                            />
                            <TextField
                                required
                                label="Capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={(e) => onChange(e)}
                            />
                            <FormControl>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Status"
                                    name="status"
                                    onChange={(e) => onChange(e)}
                                >
                                    <MenuItem value={"Available"} >Available</MenuItem>
                                    <MenuItem value={"Stopped"} >Stopped</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                label="RoomType"
                                name="roomType"
                                value={formData.roomType}
                                onChange={(e) => onChange(e)}
                            />
                            <TextField
                                required
                                label="Available Time"
                                name="availableTime"
                                value={formData.availableTime}
                                onChange={(e) => onChange(e)}
                            />
                            <TextField
                                required
                                label="Notes"
                                name="notes"
                                value={formData.notes}
                                onChange={(e) => onChange(e)}
                            />

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

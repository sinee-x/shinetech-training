import React, { useEffect } from "react";
import { useState } from "react";
import { Fade, Modal } from "@mui/material";
import { Backdrop } from "@mui/material";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { addUser, updateUser } from "../../services/userService";
import Notification from "../feedback/Notification";


const style = {
    position: 'absolute',
    top: '40%',
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
    message: 'User added successfully'
}

const initialUser = {
    email: "",
    username: "",
    role: 1
}

const UserForm = ({ title, open, handleClose, onSaveSuccess, user }) => {
    const [formData, setFormData] = useState(initialUser)
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(!user) return;
        if (user.id) {
            setFormData(user);
        }
        else
        {
            setFormData(initialUser);
        }
    }, [user]);
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            if (user.id) {
                await handleEditUser();
            }
            else {
                await handleAddUser();
            }
        }
        catch (error) {

        }
    }

    const handleAddUser = async () => {
        const data = {
            ...formData,
            "password": "123456"
        }
        const userJson = JSON.stringify(data);
        var response = await addUser(userJson);
        if (response.statusCode === 201) {
            handleClose()
            if (onSaveSuccess) {
                onSaveSuccess();
                setState({ ...initialState, open: true, message: "User added successfully" });
            }
            return;
        }
        console.log("Failed to add user", response.data.message);
    }

    const handleEditUser = async () => {
        const data = {
            ...formData,
            "id": user.id
        }
        const userJson = JSON.stringify(data);
        var response = await updateUser(userJson);
        if (response.statusCode === 201) {
            handleClose()
            if (onSaveSuccess) {
                onSaveSuccess();
                setState({ ...initialState, open: true, message: "User added successfully" });
            }
            return;
        }
        console.log("Failed to add user", response.data.message);
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
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => onChange(e)}
                            />
                            <TextField
                                required
                                label="UserName"
                                name="username"
                                value={formData.username}
                                onChange={(e) => onChange(e)}
                            />
                            <FormControl>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={formData.role}
                                    label="Role"
                                    name="role"
                                    onChange={(e) => onChange(e)}
                                >
                                    <MenuItem value={0} >Admin</MenuItem>
                                    <MenuItem value={1} >User</MenuItem>
                                </Select>
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

export default UserForm;
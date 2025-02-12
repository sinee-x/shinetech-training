import React, { useMemo, useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import { getUsers } from "../services/userService";
import { useState } from "react";
import UserTable from "../components/user/UserTable";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import AddUser from "../components/user/AddUser";

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getUsers().then((data) => {
            const users = data.map((user) => (
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role === 0 ? 'Admin' : 'User',
                    createdAt: user.createdAt,
                    lastModifiedAt: user.lastModifiedAt,
                }
            ));
            setUsers(users);
        });
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            return user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                || user.username?.toLowerCase().includes(searchTerm.toLowerCase())
                || user.role?.toLowerCase().includes(searchTerm.toLowerCase())
                || user.createdAt?.includes(searchTerm)
                || user.lastModifiedAt?.includes(searchTerm);
        });
    }, [searchTerm, users]);

    const deleteUser = useCallback(
        (id) => () => {
            setTimeout(() => {
                console.log("Deleting user with ID:", id);
            });
        },
        [],
    );

    const editUser = useCallback(
        (id) => () => {
            setTimeout(() => {
                console.log("Editing user with ID:", id);
            });
        },
        [],
    );

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '50px' }}>
                <Box>
                    <SearchBar handleOnChange={handleOnChange} />
                </Box>
                <Box>
                    <AddButton onClick={() => setOpen(true)} />
                </Box>
            </Box >
            <AddUser open={open} handleClose={handleModalClose} />
            <UserTable users={filteredUsers} editUser={editUser} deleteUser={deleteUser} />
        </>
    );
}

export default User;
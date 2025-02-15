import React, { useMemo, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getUsers, deleteUser } from "../services/userService";
import UserTable from "../components/user/UserTable";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import UserForm from "../components/user/UserForm";
import { useConfirm } from "material-ui-confirm"

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [userData, setUserData] = useState(null);

    const confirm = useConfirm();

    const fetchUsers = async () => {
        try {
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
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
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

    const handleDeleteUser = useCallback(
        (id, email) => async () => {
            const { confirmed, reason } = await confirm({
                title: "Are you sure?",
                description: "This action will delete the user permanently: " + email,
            });

            if (confirmed) {
                deleteUser(id).then(() => {
                    fetchUsers();
                });
            } else {
                console.log("Deletion cancelled. Reason:", reason);
            }
        },
        [confirm],
    );

    const handleEditUser = useCallback(
        (id, row) => () => {
            console.log("Edit user with ID:", id);
            console.log("Row data:", row);
            setOpen(true);
            setTitle('Edit User');
            setUserData(row);
        },
        [],
    );

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const onSaveSuccess = () => {
        fetchUsers();
    }

    const handleAddUser = () => {
        setOpen(true);
        setTitle('Add User');
        setUserData(null);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '50px' }}>
                <Box>
                    <SearchBar onChange={handleOnChange} />
                </Box>
                <Box>
                    <AddButton onClick={handleAddUser} />
                </Box>
            </Box >
            <UserForm open={open} handleClose={handleModalClose} onSaveSuccess={onSaveSuccess} title={title} user={userData} />
            <UserTable users={filteredUsers} editUser={handleEditUser} deleteUser={handleDeleteUser} />
        </>
    );
}

export default User;
import React, { useMemo, useCallback, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { getUsers } from "../services/userService";
import { useState } from "react";

const paginationModel = { page: 0, pageSize: 10 };
const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 70 },
            {
                field: 'email',
                headerName: 'Email',
                width: 300,
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                valueGetter: (value, row) => `${row.email || ''}`,
            },
            {
                field: 'username',
                headerName: 'Name',
                width: 200,
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                valueGetter: (value, row) => `${row.username || ''}`,
            },
            {
                field: 'role',
                headerName: 'Role',
                width: 150,
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                width: 250,
                valueGetter: (value, row) => `${row.createdAt || ''}`,
            },
            {
                field: 'lastModifiedAt',
                headerName: 'Last Modified At',
                width: 250,
                valueGetter: (value, row) => `${row.lastModifiedAt || ''}`,
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Action',
                width: 130,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon sx={{ color: '#009dff' }} />}
                        label="Edit"
                        onClick={editUser(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: '#fe4066' }} />}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />
                ],
            }
        ],
        [deleteUser, editUser]
    )

    const handleNewOnClick = () => {
        console.log("Clicked")
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '50px' }}>
                <Box>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, boxShadow: 'none', border: '1px solid #d3d3d3' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search This Table"
                            inputProps={{ 'aria-label': 'search this table' }}
                            onChange={(e) => { handleOnChange(e) }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleNewOnClick()}> New</Button>
                </Box>
            </Box >
            <Paper sx={{ width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <Box>
                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 20]}
                        sx={{ border: 0 }}
                    />
                </Box>
            </Paper>
        </>
    );
}

export default User;
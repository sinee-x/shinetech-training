import React, { useMemo, useCallback } from "react";
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

// const rows = [
//     { id: 1, email: 'john.doe@example.com', username: 'johndoe', password: 'password123', role: 'Admin', createdAt: '2023-01-01T10:00:00Z', lastModifiedAt: '2023-01-10T12:00:00Z' },
//     { id: 2, email: 'jane.smith@example.com', username: 'janesmith', password: 'password456', role: 'User', createdAt: '2023-01-02T11:00:00Z', lastModifiedAt: null },
//     { id: 3, email: 'alice.jones@example.com', username: 'alicejones', password: 'password789', role: 'User', createdAt: '2023-01-03T09:30:00Z', lastModifiedAt: '2023-01-15T14:00:00Z' },
//     { id: 4, email: 'bob.brown@example.com', username: 'bobbrown', password: 'password321', role: 'User', createdAt: '2023-01-04T08:15:00Z', lastModifiedAt: '2023-01-12T10:00:00Z' },
//     { id: 5, email: 'charlie.white@example.com', username: 'charliewhite', password: 'password654', role: 'Admin', createdAt: '2023-01-05T07:45:00Z', lastModifiedAt: null },
//     { id: 6, email: 'dave.black@example.com', username: 'daveblack', password: 'password987', role: 'User', createdAt: '2023-01-06T06:30:00Z', lastModifiedAt: '2023-01-20T16:30:00Z' },
//     { id: 7, email: 'eve.green@example.com', username: 'evegreen', password: 'password112', role: 'User', createdAt: '2023-01-07T10:00:00Z', lastModifiedAt: null },
//     { id: 8, email: 'frank.red@example.com', username: 'frankred', password: 'password113', role: 'User', createdAt: '2023-01-08T14:00:00Z', lastModifiedAt: '2023-01-25T09:00:00Z' },
//     { id: 9, email: 'grace.blue@example.com', username: 'graceblue', password: 'password114', role: 'Admin', createdAt: '2023-01-09T13:00:00Z', lastModifiedAt: null },
//     { id: 10, email: 'harry.pink@example.com', username: 'harrypink', password: 'password115', role: 'User', createdAt: '2023-01-10T15:00:00Z', lastModifiedAt: '2023-01-28T11:00:00Z' },
//     { id: 11, email: 'ivy.yellow@example.com', username: 'ivyyellow', password: 'password116', role: 'User', createdAt: '2023-01-11T11:30:00Z', lastModifiedAt: null },
//     { id: 12, email: 'jack.gray@example.com', username: 'jackgray', password: 'password117', role: 'User', createdAt: '2023-01-12T12:45:00Z', lastModifiedAt: '2023-01-29T19:00:00Z' },
//     { id: 13, email: 'kate.purple@example.com', username: 'katepurple', password: 'password118', role: 'Admin', createdAt: '2023-01-13T09:15:00Z', lastModifiedAt: null },
//     { id: 14, email: 'leo.orange@example.com', username: 'leoorange', password: 'password119', role: 'User', createdAt: '2023-01-14T10:30:00Z', lastModifiedAt: '2023-01-30T15:10:00Z' },
//     { id: 15, email: 'mona.cyan@example.com', username: 'monacyan', password: 'password120', role: 'User', createdAt: '2023-01-15T08:00:00Z', lastModifiedAt: null },
//     { id: 16, email: 'nate.brown@example.com', username: 'natebrown', password: 'password121', role: 'User', createdAt: '2023-01-16T16:45:00Z', lastModifiedAt: '2023-02-01T10:00:00Z' },
//     { id: 17, email: 'olivia.red@example.com', username: 'oliviared', password: 'password122', role: 'Admin', createdAt: '2023-01-17T11:00:00Z', lastModifiedAt: null },
//     { id: 18, email: 'paul.green@example.com', username: 'paulgreen', password: 'password123', role: 'User', createdAt: '2023-01-18T10:00:00Z', lastModifiedAt: '2023-02-02T12:20:00Z' },
//     { id: 19, email: 'quinn.blue@example.com', username: 'quinnblue', password: 'password124', role: 'User', createdAt: '2023-01-19T12:00:00Z', lastModifiedAt: null },
//     { id: 20, email: 'rose.yellow@example.com', username: 'roseyellow', password: 'password125', role: 'User', createdAt: '2023-01-20T13:30:00Z', lastModifiedAt: '2023-02-03T08:00:00Z' },
//     { id: 21, email: 'silas.purple@example.com', username: 'silaspurple', password: 'password126', role: 'Admin', createdAt: '2023-01-21T09:00:00Z', lastModifiedAt: null },
//     { id: 22, email: 'tina.orange@example.com', username: 'tinaorange', password: 'password127', role: 'User', createdAt: '2023-01-22T10:15:00Z', lastModifiedAt: '2023-02-04T17:00:00Z' },
//     { id: 23, email: 'ursula.red@example.com', username: 'ursulared', password: 'password128', role: 'User', createdAt: '2023-01-23T11:45:00Z', lastModifiedAt: null },
//     { id: 24, email: 'vincent.blue@example.com', username: 'vincentblue', password: 'password129', role: 'User', createdAt: '2023-01-24T14:00:00Z', lastModifiedAt: '2023-02-05T09:30:00Z' },
//     { id: 25, email: 'winnie.green@example.com', username: 'winniegreen', password: 'password130', role: 'Admin', createdAt: '2023-01-25T09:30:00Z', lastModifiedAt: null },
//     { id: 26, email: 'xander.yellow@example.com', username: 'xanderyellow', password: 'password131', role: 'User', createdAt: '2023-01-26T16:30:00Z', lastModifiedAt: '2023-02-06T11:00:00Z' },
//     { id: 27, email: 'yara.pink@example.com', username: 'yapink', password: 'password132', role: 'User', createdAt: '2023-01-27T08:30:00Z', lastModifiedAt: null },
//     { id: 28, email: 'zack.black@example.com', username: 'zackblack', password: 'password133', role: 'User', createdAt: '2023-01-28T10:45:00Z', lastModifiedAt: '2023-02-07T12:30:00Z' },
//     { id: 29, email: 'amber.gray@example.com', username: 'ambergray', password: 'password134', role: 'Admin', createdAt: '2023-01-29T11:15:00Z', lastModifiedAt: null },
//     { id: 30, email: 'brandon.white@example.com', username: 'brandonwhite', password: 'password135', role: 'User', createdAt: '2023-01-30T09:00:00Z', lastModifiedAt: '2023-02-08T14:00:00Z' },
// ];

const paginationModel = { page: 0, pageSize: 10 };
const User = () => {
    const [users, setUsers] = useState([]);
    useCallback(async () => {
        console.log("getUsers");
        await getUsers().then((data) => {
            console.log("users", data);
            const users = data.map((user) => (
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt,
                    lastModifiedAt: user.lastModifiedAt,
                }
            ));
            setUsers(users);
        });
    }, []);

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
                width: 200,
                valueGetter: (value, row) => `${row.createdAt || ''}`,
            },
            {
                field: 'lastModifiedAt',
                headerName: 'Last Modified At',
                width: 200,
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

    const handleOnClick = () => {
        console.log("Clicked")
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
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOnClick()}> New</Button>
                </Box>
            </Box >
            <Paper sx={{ width: '100%' }}>
                <Box>
                    <DataGrid
                        rows={users}
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
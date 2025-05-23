import React, { useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper } from "@mui/material";

const paginationModel = { page: 0, pageSize: 10 };

const UserTable = ({ users, deleteUser, editUser }) => {
    const rowsWithIndex = users.map((user, index) => ({
        ...user,
        id: user.id,
        no: index + 1
    }));
    const columns = useMemo(
        () => [
            { field: 'no', headerName: 'No.', width: 70 },
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
                        onClick={() => editUser(params.row)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: '#fe4066' }} />}
                        label="Delete"
                        onClick={() => deleteUser(params.id, params.row.email)}
                    />
                ],
            }
        ],
        [deleteUser, editUser]
    );

    return (
        <Paper sx={{ width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
            <Box>
                <DataGrid
                    rows={rowsWithIndex}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 20]}
                    sx={{ border: 0 }}
                />
            </Box>
        </Paper>
    );
};

export default UserTable;
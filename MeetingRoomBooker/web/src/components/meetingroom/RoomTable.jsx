import React, { useMemo } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper } from "@mui/material";
import AddHomeIcon from '@mui/icons-material/AddHome';

const paginationModel = { page: 0, pageSize: 10 };

const RoomTable = ({ rooms, deleteRoom, editRoom, bookingRoom }) => {
    const rowsWithIndex = rooms.map((room, index) => ({
        ...room,
        id: room.id,
        no: index + 1
    }));
    const columns = useMemo(
        () => [
            { field: 'no', headerName: 'No.', width: 70 },
            {
                field: 'roomName',
                headerName: 'Room Name',
                width: 200,
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                valueGetter: (value, row) => `${row.roomName || ''}`,
            },
            {
                field: 'capacity',
                headerName: 'Capacity',
                width: 100,
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                valueGetter: (value, row) => `${row.capacity || ''}`,
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 100,
            },
            {
                field: 'roomType',
                headerName: 'Room Type',
                width: 100,
            },
            {
                field: 'availableTime',
                headerName: 'Available Time',
                width: 150,
            },
            {
                field: 'notes',
                headerName: 'Notes',
                width: 250,
                sortable: false,
                valueGetter: (value, row) => `${row.notes || ''}`,
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
                        onClick={editRoom(params.id, params.row)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: '#fe4066' }} />}
                        label="Delete"
                        onClick={deleteRoom(params.id, params.row.roomName)}
                    />,
                    <GridActionsCellItem
                        icon={<AddHomeIcon sx={{ color: '#1976d2' }} />}
                        label="Meeting room booking"
                        onClick={bookingRoom(params.id, params.row)}
                    />
                ],
            }
        ],
        [deleteRoom, editRoom, bookingRoom]
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

export default RoomTable;
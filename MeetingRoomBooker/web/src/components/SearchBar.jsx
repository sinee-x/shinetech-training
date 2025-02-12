import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const User = ({ onChange }) => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, boxShadow: 'none', border: '1px solid #d3d3d3' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search This Table"
                inputProps={{ 'aria-label': 'search this table' }}
                onChange={(e) => { onChange(e) }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default User;
import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
    return (
        <Button variant="contained" startIcon={<AddIcon />} onClick={onClick}> New</Button>
    );
};

export default AddButton;
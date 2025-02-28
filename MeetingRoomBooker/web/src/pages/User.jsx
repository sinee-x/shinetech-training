import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getUsers, deleteUser } from "../services/userService";
import UserTable from "../components/user/UserTable";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import UserForm from "../components/user/UserForm";
import { useConfirm } from "material-ui-confirm"
import Notification from "../components/feedback/Notification";

const initialState = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: 'success',
    message: 'User added successfully'
}

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [userData, setUserData] = useState(null);
    const [state, setState] = useState(initialState);

    const confirm = useConfirm();

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            const formattedUsers = data.map((user) => (
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role === 0 ? 'Admin' : 'User',
                    createdAt: user.createdAt,
                    lastModifiedAt: user.lastModifiedAt,
                }
            ));
            setUsers(formattedUsers);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return users.filter(user => [user.email, user.username, user.role, user.createdAt, user.lastModifiedAt].some(field => field?.toLowerCase().includes(lowerSearchTerm)));
    }, [searchTerm, users]);

    const handleDeleteUser = async (id, email) => {
        const { confirmed, reason } = await confirm({
            title: "Are you sure?",
            description: "This action will delete the user permanently: " + email,
        });

        if (confirmed) {
            await deleteUser(id);
            setState({ ...initialState, open: true, message: "User deleted successfully" });
            fetchUsers();
        } else {
            console.log("Deletion cancelled. Reason:", reason);
        }
    };

    const handleEditUser = (row) => {
        setOpen(true);
        setTitle('Edit User');
        setUserData(row);
    };

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

    const handleNotificationClose = () => {
        setState({ ...state, open: false });
    };

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
            <Notification state={state} handleClose={handleNotificationClose} />
        </>
    );
}

export default User;
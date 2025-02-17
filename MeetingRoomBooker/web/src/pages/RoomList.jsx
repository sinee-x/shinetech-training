import React from "react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { getMeetingRooms, deleteMeetingRoom } from "../services/meetingRoomService";
import { useConfirm } from "material-ui-confirm"
import Notification from "../components/feedback/Notification";
import RoomTable from "../components/meetingroom/RoomTable";
import RoomForm from "../components/meetingroom/RoomForm";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";

const initialState = {
  open: false,
  vertical: 'top',
  horizontal: 'center',
  severity: 'success',
  message: 'Meeting room deleted successfully'
}
const MeetingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Add Room');
  const [roomData, setRoomData] = useState({});
  const [state, setState] = useState(initialState);
  const confirm = useConfirm();

  const fetchRooms = async () => {
    try {
      await getMeetingRooms().then((res) => {
        console.log(res);
        const rooms = res.data.map((room) => {
          return {
            id: room.id,
            roomName: room.roomName,
            capacity: room.capacity,
            status: room.status,
            roomType: room.roomType,
            availableTime: room.availableTime,
            notes: room.notes,
            createdAt: room.createdAt,
            lastModifiedAt: room.lastModifiedAt,
          }
        });
        setRooms(rooms);
      });
    } catch (error) {
      console.log("Error fetching meeting rooms", error);
    }

  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredUsers = useMemo(() => {
    return rooms.filter(user => {
      return user.roomName?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.capacity?.toString()?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.status?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.roomType?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.availableTime?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.notes?.toLowerCase().includes(searchTerm.toLowerCase())
        || user.createdAt?.includes(searchTerm)
        || user.lastModifiedAt?.includes(searchTerm);
    });
  }, [searchTerm, rooms]);

  const handleAddRoom = () => {
    setOpen(true);
    setTitle('Add Room');
    setRoomData(null);
  };

  const handleEditRoom = useCallback(
    (id, room) => () => {
      setOpen(true);
      setTitle('Edit Room');
      setRoomData(room);
    },
    []
  );

  const handleDeleteRoom = useCallback(
    (id, roomName) => async () => {
      const { confirmed, reason } = await confirm({
        title: "Are you sure?",
        description: "This action will delete the meeting room permanently: " + roomName,
      });

      if (confirmed) {
        deleteMeetingRoom(id).then(() => {
          setState({ ...initialState, open: true, message: "Meeting room deleted successfully" });
          fetchRooms();
        });
      } else {
        console.log("Deletion cancelled. Reason:", reason);
      }
    },
    [confirm]
  );

  const handleModalClose = () => {
    setOpen(false);
  }

  const handleNotificationClose = () => {
    setState({ ...state, open: false });
  };

  const onSaveSuccess = () => {
    fetchRooms();
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);

  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '50px' }}>
        <Box>
          <SearchBar onChange={handleOnChange} />
        </Box>
        <Box>
          <AddButton onClick={handleAddRoom} />
        </Box>
      </Box >
      <RoomTable
        rooms={filteredUsers}
        deleteRoom={handleDeleteRoom}
        editRoom={handleEditRoom}
      />

      <RoomForm
        open={open}
        handleClose={handleModalClose}
        title={title}
        roomData={roomData}
        onSaveSuccess={onSaveSuccess}
      />
      <Notification state={state} handleClose={handleNotificationClose} />
    </>
  );
}

export default MeetingRoom;
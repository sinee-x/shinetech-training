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
  const [roomFormOpen, setRoomFormOpen] = useState(false);
  const [roomFormTitle, setRoomFormTitle] = useState('Add Room');
  const [roomFromData, setRoomFromData] = useState({});
  const [notificationState, setNotificationState] = useState(initialState);
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
    setRoomFormOpen(true);
    setRoomFormTitle('Add Room');
    setRoomFromData(null);
  };

  const handleEditRoom = useCallback(
    (id, room) => () => {
      setRoomFormOpen(true);
      setRoomFormTitle('Edit Room');
      setRoomFromData(room);
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
          setNotificationState({ ...initialState, open: true, message: "Meeting room deleted successfully" });
          fetchRooms();
        });
      } else {
        console.log("Deletion cancelled. Reason:", reason);
      }
    },
    [confirm]
  );

  const handleBookingRoom = useCallback(
    (id, roomName) => async () => {
      console.log("Booking room with ID:", id, "and name:", roomName);
    },
    []
  );

  const handleRoomFormModalClose = () => {
    setRoomFormOpen(false);
  }

  const handleNotificationClose = () => {
    setNotificationState({ ...notificationState, open: false });
  };

  const onRoomSaveSuccess = () => {
    fetchRooms();
  }

  const handleSearchBarOnChange = (e) => {
    setSearchTerm(e.target.value);

  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '50px' }}>
        <Box>
          <SearchBar onChange={handleSearchBarOnChange} />
        </Box>
        <Box>
          <AddButton onClick={handleAddRoom} />
        </Box>
      </Box >
      <RoomTable
        rooms={filteredUsers}
        deleteRoom={handleDeleteRoom}
        editRoom={handleEditRoom}
        bookingRoom={handleBookingRoom}
      />

      <RoomForm
        open={roomFormOpen}
        handleClose={handleRoomFormModalClose}
        title={roomFormTitle}
        roomData={roomFromData}
        onSaveSuccess={onRoomSaveSuccess}
      />
      <Notification state={notificationState} handleClose={handleNotificationClose} />
    </>
  );
}

export default MeetingRoom;
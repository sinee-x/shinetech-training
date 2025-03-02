import { Box } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useMemo, useState } from "react";
import AddButton from "../components/AddButton";
import BookingForm from "../components/booking/BookingForm";
import Notification from "../components/feedback/Notification";
import RoomForm from "../components/meetingroom/RoomForm";
import RoomTable from "../components/meetingroom/RoomTable";
import SearchBar from "../components/SearchBar";
import { deleteMeetingRoom, getMeetingRooms } from "../services/meetingRoomService";

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
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  const fetchRooms = async () => {
    try {
      const res = await getMeetingRooms();
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
    } catch (error) {
      console.log("Error fetching meeting rooms", error);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredUsers = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return rooms.filter(user => [user.roomName, user.capacity, user.status, user.roomType, user.availableTime, user.notes, user.createdAt, user.lastModifiedAt].some(field => field?.toString().toLowerCase().includes(lowerSearchTerm)));
  }, [searchTerm, rooms]);

  const handleAddRoom = () => {
    setRoomFormOpen(true);
    setRoomFormTitle('Add Room');
    setRoomFromData(null);
  };

  const handleEditRoom = (room) => {
    setRoomFormOpen(true);
    setRoomFormTitle('Edit Room');
    setRoomFromData(room);
  }

  const handleDeleteRoom = async (id, roomName) => {
    const { confirmed, reason } = await confirm({
      title: "Are you sure?",
      description: "This action will delete the meeting room permanently: " + roomName,
    });

    if (confirmed) {
      await deleteMeetingRoom(id)
      setNotificationState({ ...initialState, open: true, message: "Meeting room deleted successfully" });
      fetchRooms();
    } else {
      console.log("Deletion cancelled. Reason:", reason);
    }
  };

  const handleBookingRoom = (room) => {
    setBookingFormOpen(true);
    setRoomFromData(room);
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
        handleClose={() => setRoomFormOpen(false)}
        title={roomFormTitle}
        roomData={roomFromData}
        onSaveSuccess={onRoomSaveSuccess}
      />

      <BookingForm
        open={bookingFormOpen}
        handleClose={() => setBookingFormOpen(false)}
        roomData={roomFromData}
        isNewBooking={true}
      />

      <Notification state={notificationState} handleClose={handleNotificationClose} />
    </>
  );
}

export default MeetingRoom;
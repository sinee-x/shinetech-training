
import axiosInstance from "../utils/axios";

const getMeetingRooms = async () => {
    const response = await axiosInstance.get("/meetingroom");
    return response.data;
};

const getMeetingRoom = async (id) => {
    const response = await axiosInstance.get(`/meetingroom/${id}`);
    return response.data;
};

const addMeetingRoom = async (meetingRoom) => {
    const response = await axiosInstance.post("/meetingroom", meetingRoom, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

const updateMeetingRoom = async (id, meetingRoom) => {
    const response = await axiosInstance.put(`/meetingroom/${id}`, meetingRoom, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

const deleteMeetingRoom = async (id) => {
    const response = await axiosInstance.delete(`/meetingroom/${id}`);
    return response.data;
};

export { getMeetingRooms, getMeetingRoom, addMeetingRoom, updateMeetingRoom, deleteMeetingRoom };

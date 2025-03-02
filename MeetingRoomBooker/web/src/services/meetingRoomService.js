
import axiosInstance from "../utils/axios";
import rooms from "../mock/rooms";

export const getMeetingRooms = async () => {
    if (process.env.REACT_APP_USE_MOCK_API === "true") {
        return { data: rooms, statusCode: 200 };
    }
    const response = await axiosInstance.get("/meetingroom");
    return response.data;
};

export const getMeetingRoom = async (id) => {
    if (process.env.REACT_APP_USE_MOCK_API === "true") {
        const room = rooms.find(r => r.id === id);
        return { data: room || null, statusCode: 200 };
    }
    const response = await axiosInstance.get(`/meetingroom/${id}`);
    return response.data;
};

export const addMeetingRoom = async (meetingRoom) => {
    if (process.env.REACT_APP_USE_MOCK_API === "true") {
        const newRoom = {
            ...meetingRoom,
            id: rooms.length + 1,
            createdAt: new Date().toISOString(),
            lastModifiedAt: null
        };
        rooms.push(newRoom);
        return { success: true, data: newRoom, statusCode: 200 };
    }
    const response = await axiosInstance.post("/meetingroom", meetingRoom, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export const updateMeetingRoom = async (id, meetingRoom) => {
    if (process.env.REACT_APP_USE_MOCK_API === "true") {
        const index = rooms.findIndex(r => r.id === id);
        if (index !== -1) {
            rooms[index] = {
                ...rooms[index],
                ...meetingRoom,
                lastModifiedAt: new Date().toISOString()
            };
            return { success: true, data: rooms[index], statusCode: 200 };
        }
        return { success: false, message: "会议室不存在", statusCode: 404 };
    }
    const response = await axiosInstance.put(`/meetingroom/${id}`, meetingRoom, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export const deleteMeetingRoom = async (id) => {
    if (process.env.REACT_APP_USE_MOCK_API === "true") {
        const index = rooms.findIndex(r => r.id === id);
        if (index !== -1) {
            rooms.splice(index, 1);
            return { success: true, statusCode: 200 };
        }
        return { success: false, message: "会议室不存在", statusCode: 404 };
    }
    const response = await axiosInstance.delete(`/meetingroom/${id}`);
    return response.data;
};
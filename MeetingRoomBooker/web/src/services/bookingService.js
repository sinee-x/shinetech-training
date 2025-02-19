import axiosInstance from "../utils/axios";

export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/reservation");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBooking = async (id) => {
  try {
    const response = await axiosInstance.get(`/reservation/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const addBooking = async (booking) => {
  try {
    const response = await axiosInstance.post("/reservation", booking, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const updateBooking = async (id, booking) => {
  try {
    const response = await axiosInstance.put(`/reservation/${id}`, booking, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const deleteBooking = async (id) => {
  try {
    const response = await axiosInstance.delete(`/reservation/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getBookingsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/reservation/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBookingsByRoomId = async (roomId) => {
  try {
    const response = await axiosInstance.get(`/reservation/room/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

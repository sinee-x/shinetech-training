import axiosInstance from "../utils/axios";

export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/booking");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBooking = async (id) => {
  try {
    const response = await axiosInstance.get(`/booking/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const addBooking = async (booking) => {
  try {
    const response = await axiosInstance.post("/booking", booking, {
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
    const response = await axiosInstance.put(`/booking/${id}`, booking, {
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
    const response = await axiosInstance.delete(`/booking/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getBookingsByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/booking/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBookingsByRoomId = async (roomId) => {
  try {
    const response = await axiosInstance.get(`/booking/room/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

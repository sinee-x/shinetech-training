import axiosInstance from "../utils/axios";
import bookings from "../mock/booking";

export const getBookings = async () => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return bookings;
  }
  try {
    const response = await axiosInstance.get("/reservation");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBooking = async (id) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const booking = bookings.find(b => b.id === id);
    return booking || null;
  }
  try {
    const response = await axiosInstance.get(`/reservation/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const addBooking = async (booking) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const newBooking = {
      ...booking,
      id: bookings.length + 1,
      createdAt: "0001-01-01T00:00:00",
      lastModifiedAt: null
    };
    bookings.push(newBooking);
    return { success: true, data: newBooking, statusCode: 200 };
  }
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
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = {
        ...bookings[index],
        ...booking,
        lastModifiedAt: new Date().toISOString()
      };
      return { success: true, data: bookings[index], statusCode: 200 };
    }
    return { success: false, message: "预订不存在", statusCode: 404 };
  }
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
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings.splice(index, 1);
      return { success: true, statusCode: 200 };
    }
    return { success: false, message: "预订不存在", statusCode: 404 };
  }
  try {
    const response = await axiosInstance.delete(`/reservation/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getBookingsByUserId = async (userId) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    console.log(userId);
    const b = bookings.filter(b => b.userId === parseInt(userId, 10));
    console.log(b);
    return b;
  }
  try {
    const response = await axiosInstance.get(`/reservation/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBookingsByRoomId = async (roomId) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return bookings.filter(b => b.roomId === roomId);
  }
  try {
    const response = await axiosInstance.get(`/reservation/room/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

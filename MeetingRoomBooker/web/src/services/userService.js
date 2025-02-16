import axiosInstance from "../utils/axios";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const addUser = async (user) => {
  try {
    const response = await axiosInstance.post("/user", user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}
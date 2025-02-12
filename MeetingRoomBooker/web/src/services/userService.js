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
    const response = await axiosInstance.post("/user", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
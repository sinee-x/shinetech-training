import axiosInstance from "../utils/axios";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
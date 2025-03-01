
import axiosInstance from "../utils/axios";

export const login = async (email, password) => {
  if (process.env.USE_MOCK_API){
    return {token: "mockToken"}
  }
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const changePassword = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/change-password", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
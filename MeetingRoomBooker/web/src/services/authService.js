
import axiosInstance from "../utils/axios";

export const login = async (email, password) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true"){
    return {
      "success": true,
      "message": "Success",
      "data": {
        "token": "mock_token",
        "refreshToken": "db8e92fb-fef6-40b5-8322-13030b0267af",
        "expiresIn": "2999-03-08T16:04:16.7918164Z"
      },
      "errors": null,
      "statusCode": 200
    }
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
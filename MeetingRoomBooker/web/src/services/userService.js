import axiosInstance from "../utils/axios";
import users from "../mock/user";

export const getUsers = async () => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    return users;
  }
  try {
    const response = await axiosInstance.get("/user");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const addUser = async (user) => {
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const newUser = {
      ...user,
      id: users.length + 1,
      createdAt: new Date().toISOString(),
      lastModifiedAt: null
    };
    users.push(newUser);
    return { success: true, data: newUser, statusCode: 200 };
  }
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
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...user,
        lastModifiedAt: new Date().toISOString()
      };
      return { success: true, data: users[index], statusCode: 200 };
    }
    return { success: false, message: "用户不存在", statusCode: 404 };
  }
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
  if (process.env.REACT_APP_USE_MOCK_API === "true") {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return { success: true, statusCode: 200 };
    }
    return { success: false, message: "用户不存在", statusCode: 404 };
  }
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}
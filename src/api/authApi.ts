import axiosClient from "./axiosClient";

export const registerUser = async (data: any) => {
  try {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const getMe = async (token: string) => {
  try {
    const response = await axiosClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch user");
  }
};

import axiosClient from "./axiosClient";

export const initiatePayment = async (items: any[]) => {
  try {
    const response = await axiosClient.post("/payment/initiate", { items });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to initiate Razorpay order");
  }
};

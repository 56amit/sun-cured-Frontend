import axiosClient from "./axiosClient";

// Interfaces
export interface OrderItemPayload {
  productId: string | number;
  quantity: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];
  paymentGateway?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface OrderResponse {
  message: string;
  order: {
    id: number;
    totalAmount: number;
    taxAmount: number;
    status: string;
    paymentStatus: string;
  };
}

// Endpoints
const ORDER_ENDPOINT = "/orders/create";

export const createOrder = async (
  orderData: OrderPayload,
): Promise<OrderResponse> => {
  const token = localStorage.getItem("token");
  const { data } = await axiosClient.post<OrderResponse>(
    ORDER_ENDPOINT,
    orderData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axiosClient.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

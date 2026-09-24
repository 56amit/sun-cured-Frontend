import axiosClient from "./axiosClient";

// Interfaces
export interface OrderItemPayload {
  productId: string | number;
  quantity: number;
  price?: number;
  weight?: string;
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

export interface OrderDetailItem {
  id: number;
  productId: number;
  name: string;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  taxAtPurchase: number;
  weight?: string;
  productImage?: string;
}

export interface OrderDetail {
  id: number;
  totalAmount: number;
  taxAmount: number;
  status: string;
  paymentStatus: string;
  paymentGateway: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  createdAt: string;
  items: OrderDetailItem[];
}

// Endpoints
const ORDER_ENDPOINT = "/orders";

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

export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const { data } = await axiosClient.get<OrderDetail>(`/orders/detail/${orderId}`);
  return data;
};

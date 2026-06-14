import axiosClient from './axiosClient';

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
const ORDER_ENDPOINT = '/orders';

export const createOrder = async (orderData: OrderPayload): Promise<OrderResponse> => {
  const { data } = await axiosClient.post<OrderResponse>(ORDER_ENDPOINT, orderData);
  return data;
};

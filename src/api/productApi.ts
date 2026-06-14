import axiosClient from './axiosClient';

// Interfaces
export interface ProductResponse {
  id: number;
  name: string;
  catId: number;
  taxId?: number | null;
  desc?: string | null;
  price: number;
  weight?: string | null;
  img?: string | null;
  status: 'active' | 'inactive';
}

// Mapped interface for Frontend UI
export interface UIProduct {
  id: string | number;
  name: string;
  description: string;
  price: string;
  unit: string;
  categoryId: number;
  badge: string;
  badgeColor: string;
  image: string;
}

// Endpoints
const PRODUCT_ENDPOINT = '/products';

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const { data } = await axiosClient.get<ProductResponse[]>(PRODUCT_ENDPOINT);
  return data;
};

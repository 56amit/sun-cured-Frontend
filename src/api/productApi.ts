import axiosClient from './axiosClient';

// Interfaces
export interface ProductVariant {
  id: number;
  productId: number;
  weight: string;
  price: number;
  status?: string;
}

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
  variants?: ProductVariant[];
}

export interface UIProductVariant {
  id: string | number;
  productId: string | number;
  weight: string;
  price: number;
  formattedPrice: string;
  unit: string;
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
  variants: UIProductVariant[];
}

// Endpoints
const PRODUCT_ENDPOINT = '/products';

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const { data } = await axiosClient.get<ProductResponse[]>(PRODUCT_ENDPOINT);
  return data;
};

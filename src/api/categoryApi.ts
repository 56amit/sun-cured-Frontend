import axiosClient from './axiosClient';

// Interfaces
export interface CategoryResponse {
  id: number;
  name: string;
  taxId: number;
  desc?: string | null;
  status: 'active' | 'inactive';
}

// Mapped interface for Frontend UI
export interface UICategory {
  id: string | number;
  name: string;
  icon: string;
}

// Endpoints
const CATEGORY_ENDPOINT = '/categories';

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const { data } = await axiosClient.get<CategoryResponse[]>(CATEGORY_ENDPOINT);
  return data;
};

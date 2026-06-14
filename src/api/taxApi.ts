import axiosClient from './axiosClient';

// Interfaces
export interface Tax {
  id: number;
  name: string;
  rate: number;
  desc?: string | null;
  status: 'active' | 'inactive';
}

// Endpoints
const TAX_ENDPOINT = '/taxes';

export const fetchTaxes = async (): Promise<Tax[]> => {
  const { data } = await axiosClient.get<Tax[]>(TAX_ENDPOINT);
  return data;
};

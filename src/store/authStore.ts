import { create } from 'zustand';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface AuthStore {
  user: User | null;
  orders: Order[];
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  isProfileOpen: boolean;
  setProfileOpen: (isOpen: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  orders: [],
  isAuthModalOpen: false,
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  isProfileOpen: false,
  setProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
  login: (user) => set({ user, isAuthModalOpen: false }),
  logout: () => set({ user: null, orders: [] }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] }))
}));

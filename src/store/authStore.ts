import { create } from 'zustand';
import { getMe } from '../api/authApi';

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
  checkAuth: () => Promise<void>;
  isReviewModalOpen: boolean;
  setReviewModalOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  orders: [],
  isAuthModalOpen: false,
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  isProfileOpen: false,
  setProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
  isReviewModalOpen: false,
  setReviewModalOpen: (isOpen) => set({ isReviewModalOpen: isOpen }),
  login: (user) => set({ user, isAuthModalOpen: false }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, orders: [] });
  },
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const data = await getMe(token);
      set({ user: data.user });
      
      try {
        const { getMyOrders } = await import('../api/orderApi');
        const dbOrders = await getMyOrders();
        const formattedOrders = dbOrders.map((o: any) => ({
          id: `ORD-${o.id}`,
          date: new Date(o.createdAt).toLocaleDateString(),
          total: o.totalAmount,
          status: o.status
        }));
        set({ orders: formattedOrders });
      } catch (e) {
        console.error("Failed to fetch orders", e);
      }
      
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, orders: [] });
    }
  }
}));

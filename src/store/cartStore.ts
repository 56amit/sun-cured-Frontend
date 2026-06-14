import { create } from 'zustand';
import type { UIProduct } from '../api/productApi';

export interface CartItem extends UIProduct {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  addToCart: (product: UIProduct, quantity: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isCheckoutOpen: false,
  setIsCheckoutOpen: (isCheckoutOpen) => set({ isCheckoutOpen }),
  
  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          isOpen: true // Automatically open cart when adding
        };
      }
      return { 
        items: [...state.items, { ...product, quantity }],
        isOpen: true
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  },

  clearCart: () => set({ items: [] }),

  getCartTotal: () => {
    return get().items.reduce((total, item) => {
      const priceStr = item.price.replace(/[^\d]/g, '');
      const price = parseInt(priceStr, 10) || 0;
      return total + (price * item.quantity);
    }, 0);
  },

  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));

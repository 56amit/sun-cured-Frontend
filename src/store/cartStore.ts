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
          // Cart will no longer open automatically
        };
      }
      return { 
        items: [...state.items, { ...product, quantity }],
        // Cart will no longer open automatically
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
    const total = get().items.reduce((sum, item) => {
      const priceStr = item.price.replace(/[^\d.]/g, '');
      const price = parseFloat(priceStr) || 0;
      return sum + (price * item.quantity);
    }, 0);
    return Math.round(total * 100) / 100;
  },

  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));

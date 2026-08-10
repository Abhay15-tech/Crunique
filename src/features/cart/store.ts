import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType, CartItemType } from '@/types';

interface CartState {
  cart: CartItemType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addToCart: (product: ProductType, quantity?: number, packSize?: '25g' | '50g' | '100g' | '250g') => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addToCart: (product, quantity = 1, packSize = '50g') => {
        set((state) => {
          const itemId = `${product.id}-${packSize}`;
          const existingIndex = state.cart.findIndex((item) => item.id === itemId);
          
          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated, isOpen: true };
          }
          
          return {
            cart: [
              ...state.cart,
              { id: itemId, productId: product.id, product, quantity, packSize }
            ],
            isOpen: true
          };
        });
      },
      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId)
        }));
      },
      updateQuantity: (cartItemId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === cartItemId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItemType[]
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'crunique-cart-storage'
    }
  )
);

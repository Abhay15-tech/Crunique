import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlist: string[]; // Product IDs
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: ['apple-chips', 'kiwi-chips'],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId]
          };
        });
      },
      isInWishlist: (productId) => get().wishlist.includes(productId)
    }),
    {
      name: 'crunique-wishlist-storage'
    }
  )
);

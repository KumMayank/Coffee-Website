import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: ['signature-espresso', 'velvet-flat-white', 'nitro-cold-brew'],

      toggleFavorite: (id: string) => {
        set((state) => {
          const exists = state.favoriteIds.includes(id);
          return {
            favoriteIds: exists
              ? state.favoriteIds.filter((favId) => favId !== id)
              : [...state.favoriteIds, id],
          };
        });
      },

      isFavorite: (id: string) => {
        return get().favoriteIds.includes(id);
      },
    }),
    {
      name: 'cwg-favorites-storage',
    }
  )
);

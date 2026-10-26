import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DrinkItem } from '../data/drinks';

export type CupSize = 'S' | 'M' | 'L';

export interface CartCustomization {
  size: CupSize;
  milk: string;
  sweetness: string;
  temperature: 'hot' | 'iced';
  extraShot: boolean;
}

export interface CartItem {
  id: string; // unique item key combining drink id + customizations
  drink: DrinkItem;
  customization: CartCustomization;
  quantity: number;
  unitPrice: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  promoDiscountPct: number;
  promoMessage: string | null;
  lastAddedPosition: { x: number; y: number } | null;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (drink: DrinkItem, custom?: Partial<CartCustomization>, originPos?: { x: number; y: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  setLastAddedPosition: (pos: { x: number; y: number } | null) => void;

  // Calculated values
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const SIZE_PRICE_MODIFIERS: Record<CupSize, number> = {
  S: 0,
  M: 0.60,
  L: 1.20,
};

export const DEFAULT_CUSTOMIZATION: CartCustomization = {
  size: 'M',
  milk: 'Oat Milk (Artisan)',
  sweetness: 'Regular (100%)',
  temperature: 'hot',
  extraShot: false,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      promoDiscountPct: 0,
      promoMessage: null,
      lastAddedPosition: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (drink, customOverrides = {}, originPos) => {
        const custom: CartCustomization = {
          ...DEFAULT_CUSTOMIZATION,
          ...customOverrides,
        };

        const sizeModifier = SIZE_PRICE_MODIFIERS[custom.size] || 0;
        const extraShotModifier = custom.extraShot ? 0.90 : 0;
        const milkModifier = custom.milk.includes('Oat') || custom.milk.includes('Almond') ? 0.50 : 0;
        const unitPrice = Number((drink.price + sizeModifier + extraShotModifier + milkModifier).toFixed(2));

        const itemKey = `${drink.id}-${custom.size}-${custom.milk}-${custom.sweetness}-${custom.temperature}-${custom.extraShot}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemKey);
          let newItems: CartItem[];

          if (existingIndex > -1) {
            newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            };
          } else {
            newItems = [
              ...state.items,
              {
                id: itemKey,
                drink,
                customization: custom,
                quantity: 1,
                unitPrice,
              },
            ];
          }

          return {
            items: newItems,
            lastAddedPosition: originPos || null,
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, qty) => {
        if (qty <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: qty } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null, promoDiscountPct: 0, promoMessage: null });
      },

      applyPromo: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'BREW10') {
          set({ promoCode: 'BREW10', promoDiscountPct: 0.10, promoMessage: '10% Welcome Discount Applied' });
          return true;
        } else if (clean === 'GANDHI20') {
          set({ promoCode: 'GANDHI20', promoDiscountPct: 0.20, promoMessage: '20% Master Roaster Pass Applied' });
          return true;
        } else if (clean === 'GOLDVIP') {
          set({ promoCode: 'GOLDVIP', promoDiscountPct: 0.25, promoMessage: '25% Gold Member Perk Applied' });
          return true;
        } else {
          set({ promoMessage: 'Invalid or expired promo code' });
          return false;
        }
      },

      removePromo: () => {
        set({ promoCode: null, promoDiscountPct: 0, promoMessage: null });
      },

      setLastAddedPosition: (pos) => set({ lastAddedPosition: pos }),

      getSubtotal: () => {
        const state = get();
        return Number(
          state.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)
        );
      },

      getDiscount: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        return Number((subtotal * state.promoDiscountPct).toFixed(2));
      },

      getTax: () => {
        const state = get();
        const taxable = state.getSubtotal() - state.getDiscount();
        return Number((Math.max(0, taxable) * 0.0825).toFixed(2));
      },

      getTotal: () => {
        const state = get();
        const sub = state.getSubtotal();
        const disc = state.getDiscount();
        const tax = state.getTax();
        return Number((sub - disc + tax).toFixed(2));
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cwg-cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscountPct: state.promoDiscountPct,
      }),
    }
  )
);

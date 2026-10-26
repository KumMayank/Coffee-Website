import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './useCartStore';

export interface UserOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Preparing' | 'Ready for Pickup' | 'Out for Delivery' | 'Delivered';
  type: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pointsEarned: number;
}

export interface TableBooking {
  id: string;
  date: string;
  time: string;
  guests: number;
  area: 'Main Bar' | 'Garden Patio' | 'Velvet Lounge' | 'Private Roastery Booth';
  specialRequests?: string;
  name: string;
  phone: string;
  email: string;
  status: 'Confirmed' | 'Pending';
}

interface UserStore {
  user: {
    name: string;
    email: string;
    phone: string;
    memberId: string;
    tier: 'Bronze' | 'Silver' | 'Gold';
    points: number;
    joinedDate: string;
    avatarUrl: string;
  };
  orders: UserOrder[];
  reservations: TableBooking[];

  // Actions
  updateProfile: (profile: Partial<UserStore['user']>) => void;
  addOrder: (order: Omit<UserOrder, 'id' | 'date' | 'status' | 'pointsEarned'>) => UserOrder;
  addReservation: (booking: Omit<TableBooking, 'id' | 'status'>) => TableBooking;
  redeemPoints: (amount: number) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {
        name: 'Dev Gandhi',
        email: 'dev@codewithgandhi.com',
        phone: '+1 (555) 789-2345',
        memberId: 'CWG-8829-GOLD',
        tier: 'Gold',
        points: 480,
        joinedDate: 'October 2024',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      },
      orders: [
        {
          id: 'CWG-ORD-9821',
          date: 'Oct 22, 2026',
          items: [
            {
              id: 'initial-1',
              drink: {
                id: 'signature-espresso',
                name: 'Gandhi Reserve Espresso',
                category: 'espresso',
                price: 4.80,
                rating: 4.95,
                reviewCount: 342,
                description: 'Flagship espresso',
                shortDesc: 'Double shot reserve',
                tastingNotes: ['Cacao', 'Orange'],
                tags: ['Intense'],
                roastLevel: 'Medium-Dark',
                caffeine: '150mg',
                origin: 'Huila, Colombia',
                accentColor: '#C08A55',
                bgWord: 'ESPRESSO',
                modelType: 'cup',
                image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
                calories: 5,
                inStock: true
              },
              customization: {
                size: 'M',
                milk: 'Oat Milk (Artisan)',
                sweetness: 'Regular (100%)',
                temperature: 'hot',
                extraShot: true,
              },
              quantity: 2,
              unitPrice: 6.30,
            }
          ],
          subtotal: 12.60,
          discount: 1.26,
          tax: 0.94,
          total: 12.28,
          status: 'Delivered',
          type: 'pickup',
          pointsEarned: 120,
        }
      ],
      reservations: [
        {
          id: 'RES-4491',
          date: '2026-10-30',
          time: '18:30',
          guests: 2,
          area: 'Velvet Lounge',
          specialRequests: 'Window view if available',
          name: 'Dev Gandhi',
          phone: '+1 (555) 789-2345',
          email: 'dev@codewithgandhi.com',
          status: 'Confirmed',
        }
      ],

      updateProfile: (profile) => {
        set((state) => ({ user: { ...state.user, ...profile } }));
      },

      addOrder: (orderData) => {
        const newId = `CWG-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const dateStr = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        const pointsEarned = Math.floor(orderData.total * 10);

        const newOrder: UserOrder = {
          ...orderData,
          id: newId,
          date: dateStr,
          status: 'Preparing',
          pointsEarned,
        };

        set((state) => {
          const nextPoints = state.user.points + pointsEarned;
          let tier = state.user.tier;
          if (nextPoints >= 500) tier = 'Gold';
          else if (nextPoints >= 200) tier = 'Silver';

          return {
            orders: [newOrder, ...state.orders],
            user: {
              ...state.user,
              points: nextPoints,
              tier,
            },
          };
        });

        return newOrder;
      },

      addReservation: (bookingData) => {
        const newBooking: TableBooking = {
          ...bookingData,
          id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'Confirmed',
        };

        set((state) => ({
          reservations: [newBooking, ...state.reservations],
        }));

        return newBooking;
      },

      redeemPoints: (amount: number) => {
        const current = get().user.points;
        if (current >= amount) {
          set((state) => ({
            user: { ...state.user, points: state.user.points - amount },
          }));
          return true;
        }
        return false;
      },
    }),
    {
      name: 'cwg-user-storage',
    }
  )
);

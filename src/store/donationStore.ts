import { create } from 'zustand';
import { DonationItem } from '../types/donation';

interface DonationStore {
  items: DonationItem[];
  addItem: (item: Omit<DonationItem, 'id' | 'createdAt' | 'available'>) => void;
}

export const useDonationStore = create<DonationStore>((set) => ({
  items: [],
  addItem: (newItem) => set((state) => ({
    items: [...state.items, {
      ...newItem,
      id: state.items.length + 1,
      createdAt: new Date().toISOString(),
      available: true,
    }],
  })),
}));
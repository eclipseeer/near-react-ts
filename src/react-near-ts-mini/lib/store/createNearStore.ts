import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NearState = {
  connectedAccountId: string | null;
  setConnectedAccountId: (id: string | null) => void;
};

export const useNearStore = create<NearState>()(
  persist(
    (set) => ({
      connectedAccountId: null,
      setConnectedAccountId: (id) => set({ connectedAccountId: id }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ connectedAccountId: state.connectedAccountId }),
    },
  ),
);

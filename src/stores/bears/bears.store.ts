import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  bears: Bear[];
  blackBears: number;
  pandaBears: number;
  polarBears: number;
  addBear: () => void;
  clearBears: () => void;
  doNothing: () => void;
  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  totalBears: () => number;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      bears: [{ id: 1, name: 'Oso #1' }],
      blackBears: 10,
      pandaBears: 5,
      polarBears: 1,
      addBear: () => set((state) => ({ bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }] })),
      clearBears: () => set({ bears: [] }),
      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
      increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
      totalBears: () => {
        return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
      },
    }), { name: 'bearStore' }
  )
)
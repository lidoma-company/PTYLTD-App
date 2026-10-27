import { create } from 'zustand';

type PruchaseStore = {
    target: number | null;
    setTargetId: (target: number | null) => void;
};

export const usePruchaseStore = create<PruchaseStore>((set) => ({
    target: null,
    setTargetId: (target) => set({ target }),
}));

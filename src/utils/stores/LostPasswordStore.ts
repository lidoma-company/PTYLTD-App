import { create } from 'zustand';

type LostPasswordStore = {
    isOtpSent: boolean;
    setIsOtpSent: (value: boolean) => void;
    isOtpVerify: boolean;
    setIsOtpVerify: (value: boolean) => void;
    email: string;
    setEmail: (value: string) => void;
    tempToken: string;
    setTempToken: (tempToken: string) => void;
};

export const useLostPassword = create<LostPasswordStore>((set) => ({
    isOtpSent: false,
    setIsOtpSent: (value) => set({ isOtpSent: value }),
    isOtpVerify: false,
    setIsOtpVerify: (value) => set({ isOtpVerify: value }),
    email: '',
    setEmail: (value) => set({ email: value }),
    tempToken: '',
    setTempToken: (value) => set({ tempToken: value }),
}));

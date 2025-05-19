import { create } from "zustand";

type AuthState = {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentTab: 0,
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));

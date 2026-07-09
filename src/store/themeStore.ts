// src/store/themeStore.ts
import { create } from "zustand";
import type { ColorScheme } from "@/core/theme/tokens";

interface ThemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colorScheme: "light",
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  toggleColorScheme: () =>
    set((state) => ({
      colorScheme: state.colorScheme === "light" ? "dark" : "light",
    })),
}));
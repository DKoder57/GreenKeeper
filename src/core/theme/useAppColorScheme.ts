// src/core/theme/useAppColorScheme.ts
import { useThemeStore } from "../../store/themeStore";
import { lightTheme, darkTheme } from "./tokens";

/**
 * Hook de tema com override manual (ignora o esquema do sistema).
 * O usuário controla o modo via toggleColorScheme / setColorScheme.
 */
export function useAppColorScheme() {
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const setColorScheme = useThemeStore((state) => state.setColorScheme);
  const toggleColorScheme = useThemeStore((state) => state.toggleColorScheme);

  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return {
    colorScheme,
    theme,
    isDark: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}